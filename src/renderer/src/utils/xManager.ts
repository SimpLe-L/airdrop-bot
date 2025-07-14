import * as XLSX from 'xlsx'

export interface AccountData {
  id: string
  username: string
  password: string
  email?: string
  emailPassword?: string
  twoFA?: string
  backupCode?: string
  token?: string
  proxy?: string
  status: 'active' | 'banned' | 'error' | 'pending'
  type: 'twitter' | 'discord' | 'telegram' | 'email' | 'other'
  note?: string
  createdAt: Date
}

export interface ImportResult {
  success: AccountData[]
  errors: Array<{ row: number; error: string; data: any }>
  total: number
}

export class XManager {
  // 支持的分隔符模式
  private static readonly SEPARATORS = [
    '——', // 中文破折号
    '----', // 多个英文横线
    ':::',
    '::',
    ':',
    '\t', // Tab
    '|',
    ',',
    ';'
  ]

  // 字段映射配置
  private static readonly FIELD_PATTERNS = [
    // 完整格式
    ['username', 'password', 'email', 'emailPassword', 'twoFA', 'token'],
    ['username', 'password', 'email', 'emailPassword', 'twoFA', 'backupCode', 'token'],
    // 基础格式
    ['username', 'password'],
    ['username', 'password', 'proxy'],
    ['username', 'password', 'email'],
    ['username', 'password', 'email', 'emailPassword'],
    // 带2FA
    ['username', 'password', 'twoFA'],
    ['username', 'password', 'email', 'twoFA'],
    // 带Token
    ['username', 'password', 'token'],
    ['username', 'password', 'email', 'token']
  ]

  static detectSeparator(line: string): string {
    for (const sep of this.SEPARATORS) {
      if (line.includes(sep)) {
        const parts = line.split(sep)
        if (parts.length >= 2) {
          return sep
        }
      }
    }
    return ':'
  }

  static detectFieldPattern(parts: string[]): string[] {
    const partCount = parts.length
    
    // 根据字段数量选择最合适的模式
    for (const pattern of this.FIELD_PATTERNS) {
      if (pattern.length === partCount) {
        return pattern
      }
    }
    
    // 如果没有完全匹配，使用最接近的模式
    if (partCount >= 6) {
      return this.FIELD_PATTERNS[1] // 7字段完整格式
    } else if (partCount >= 5) {
      return this.FIELD_PATTERNS[0] // 6字段格式
    } else if (partCount >= 2) {
      return this.FIELD_PATTERNS.find(p => p.length <= partCount) || this.FIELD_PATTERNS[2]
    }
    
    return ['username', 'password']
  }

  static parseAccountLine(line: string, accountType: AccountData['type'] = 'other'): AccountData | null {
    const trimmedLine = line.trim()
    if (!trimmedLine) return null

    try {
      const separator = this.detectSeparator(trimmedLine)
      const parts = trimmedLine.split(separator).map(part => part.trim())
      
      if (parts.length < 2) return null

      const fieldPattern = this.detectFieldPattern(parts)
      const accountData: Partial<AccountData> = {
        id: `${accountType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: accountType,
        status: 'pending',
        createdAt: new Date()
      }

      // 根据字段模式映射数据
      fieldPattern.forEach((fieldName, index) => {
        if (index < parts.length && parts[index]) {
          (accountData as any)[fieldName] = parts[index]
        }
      })

      // 验证必需字段
      if (!accountData.username || !accountData.password) {
        return null
      }

      return accountData as AccountData
    } catch (error) {
      return null
    }
  }

  static async importFromText(
    text: string, 
    accountType: AccountData['type'] = 'other'
  ): Promise<ImportResult> {
    const result: ImportResult = {
      success: [],
      errors: [],
      total: 0
    }

    const lines = text.trim().split('\n').filter(line => line.trim())
    result.total = lines.length

    lines.forEach((line, index) => {
      const accountData = this.parseAccountLine(line, accountType)
      
      if (accountData) {
        result.success.push(accountData)
      } else {
        result.errors.push({
          row: index + 1,
          error: '无法解析此行数据',
          data: line
        })
      }
    })

    return result
  }

  static async importFromFile(file: File, accountType: AccountData['type'] = 'other'): Promise<ImportResult> {
    const extension = file.name.split('.').pop()?.toLowerCase()

    try {
      if (extension === 'txt') {
        const text = await file.text()
        return this.importFromText(text, accountType)
      } else if (extension === 'xlsx' || extension === 'xls') {
        return this.importFromExcel(file, accountType)
      } else {
        throw new Error(`不支持的文件格式: ${extension}`)
      }
    } catch (error) {
      return {
        success: [],
        errors: [{ row: 0, error: error instanceof Error ? error.message : '文件读取失败', data: file.name }],
        total: 0
      }
    }
  }

  private static async importFromExcel(file: File, accountType: AccountData['type']): Promise<ImportResult> {
    const result: ImportResult = {
      success: [],
      errors: [],
      total: 0
    }

    try {
      const arrayBuffer = await file.arrayBuffer()
      const workbook = XLSX.read(arrayBuffer, { type: 'array' })
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as string[][]

      result.total = jsonData.length

      jsonData.forEach((row, index) => {
        if (row.length === 0) return

        try {
          const accountData: AccountData = {
            id: `${accountType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: accountType,
            status: 'pending',
            createdAt: new Date(),
            username: row[0] || '',
            password: row[1] || '',
            email: row[2] || undefined,
            emailPassword: row[3] || undefined,
            twoFA: row[4] || undefined,
            backupCode: row[5] || undefined,
            token: row[6] || undefined,
            note: row.slice(7).join(', ') || undefined
          }

          if (accountData.username && accountData.password) {
            result.success.push(accountData)
          } else {
            result.errors.push({
              row: index + 1,
              error: '缺少用户名或密码',
              data: row
            })
          }
        } catch (error) {
          result.errors.push({
            row: index + 1,
            error: error instanceof Error ? error.message : '解析行数据失败',
            data: row
          })
        }
      })
    } catch (error) {
      result.errors.push({
        row: 0,
        error: error instanceof Error ? error.message : 'Excel文件解析失败',
        data: file.name
      })
    }

    return result
  }

  // 导出为表格数据
  static toTableData(accounts: AccountData[]) {
    return accounts.map(account => ({
      id: account.id,
      username: account.username,
      password: account.password,
      email: account.email || '-',
      emailPassword: account.emailPassword || '-',
      twoFA: account.twoFA || '-',
      backupCode: account.backupCode || '-',
      token: account.token || '-',
      proxy: account.proxy || '-',
      status: account.status,
      type: account.type,
      note: account.note || '-',
      createdAt: account.createdAt.toLocaleString()
    }))
  }

  // 导出为文本
  static exportToText(accounts: AccountData[], separator: string = ':'): string {
    return accounts.map(account => {
      const parts = [
        account.username,
        account.password,
        account.email || '',
        account.emailPassword || '',
        account.twoFA || '',
        account.backupCode || '',
        account.token || ''
      ].filter(part => part !== '')
      
      return parts.join(separator)
    }).join('\n')
  }

  // 导出为Excel
  static exportToExcel(accounts: AccountData[]): Uint8Array {
    const tableData = this.toTableData(accounts)
    const worksheet = XLSX.utils.json_to_sheet(tableData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, '账号数据')
    
    return XLSX.write(workbook, { type: 'array', bookType: 'xlsx' })
  }

  // 格式预览
  static previewFormat(text: string, maxLines: number = 5): Array<{line: string, parsed: any, success: boolean}> {
    const lines = text.trim().split('\n').slice(0, maxLines)
    
    return lines.map(line => {
      const parsed = this.parseAccountLine(line)
      return {
        line,
        parsed,
        success: !!parsed
      }
    })
  }
}

export default XManager