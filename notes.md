# Web3 Airdrop工具箱 - 设计方案

## 整体架构设计

### 技术栈
- **前端框架**: Electron + React + TypeScript
- **样式**: TailwindCSS + shadcn/ui
- **状态管理**: Zustand
- **数据库**: SQLite (本地存储)
- **API**: REST API + GraphQL (区块链数据查询)
- **加密**: crypto-js (敏感数据加密)
- **网络**: Puppeteer/Playwright (浏览器自动化)

### 核心设计原则
1. **模块化设计**: 每个功能模块独立，便于维护和扩展
2. **数据安全**: 所有敏感数据本地加密存储
3. **批量操作**: 支持大规模账号批量管理和操作
4. **插件化**: 支持自定义插件扩展功能
5. **配置化**: 所有操作参数可配置，适应不同需求

---

## 核心模块设计

### 1. 账号管理模块 (Account Management)

#### 1.1 统一账号体系设计
```typescript
interface AccountGroup {
  id: string;
  name: string;
  sequenceNumber: number; // 序号，用于关联
  accounts: {
    telegram?: TelegramAccount;
    twitter?: TwitterAccount;
    discord?: DiscordAccount;
    email?: EmailAccount;
    wallet?: WalletAccount;
  };
  proxy?: ProxyConfig;
  status: 'active' | 'disabled' | 'error';
  createdAt: Date;
  updatedAt: Date;
}
```

#### 1.2 各平台账号结构
- **Telegram账号**
  ```typescript
  interface TelegramAccount {
    phone: string;
    session: string; // 加密存储
    userId: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    twoFA?: boolean;
    apiId?: string;
    apiHash?: string; // 加密存储
  }
  ```

- **Twitter账号**
  ```typescript
  interface TwitterAccount {
    username: string;
    email: string;
    password: string; // 加密存储
    cookies: string; // 加密存储
    authToken?: string; // 加密存储
    csrfToken?: string;
    twoFA?: boolean;
    recoveryCode?: string; // 加密存储
  }
  ```

- **Discord账号**
  ```typescript
  interface DiscordAccount {
    username: string;
    email: string;
    password: string; // 加密存储
    token: string; // 加密存储
    userId: string;
    verified: boolean;
    phone?: string;
  }
  ```

- **邮箱账号**
  ```typescript
  interface EmailAccount {
    email: string;
    password: string; // 加密存储
    provider: 'gmail' | 'outlook' | 'yahoo' | 'proton' | 'custom';
    imapConfig?: IMAPConfig;
    smtpConfig?: SMTPConfig;
    recoveryEmail?: string;
  }
  ```

- **钱包账号**
  ```typescript
  interface WalletAccount {
    address: string;
    privateKey?: string; // 加密存储
    mnemonic?: string; // 加密存储
    walletType: 'metamask' | 'phantom' | 'okx' | 'hardware';
    networks: string[]; // 支持的网络
    balance?: Record<string, string>; // 余额缓存
  }
  ```

#### 1.3 批量导入功能
- **CSV/Excel导入**: 支持批量导入账号信息
- **格式验证**: 自动验证导入数据格式
- **冲突处理**: 处理重复账号和数据冲突
- **批量验证**: 自动验证账号有效性

#### 1.4 账号分组管理
- **自动分组**: 根据序号自动关联账号
- **手动分组**: 支持手动调整账号关联
- **批量操作**: 批量启用/禁用/删除账号组
- **状态监控**: 实时监控账号状态

### 2. 代理管理模块 (Proxy Management)

#### 2.1 代理配置
```typescript
interface ProxyConfig {
  id: string;
  type: 'http' | 'https' | 'socks4' | 'socks5';
  host: string;
  port: number;
  username?: string;
  password?: string; // 加密存储
  country?: string;
  city?: string;
  provider?: string;
  speed?: number; // 测试速度
  status: 'active' | 'error' | 'testing';
}
```

#### 2.2 代理功能
- **批量导入**: 支持从文件导入代理列表
- **自动测试**: 定期测试代理可用性和速度
- **智能分配**: 自动为账号分配合适的代理
- **地理位置**: 根据项目需求匹配代理地理位置
- **负载均衡**: 避免同一代理被过度使用

### 3. 项目中心模块 (Project Center)

#### 3.1 项目类型设计
```typescript
interface AirdropProject {
  id: string;
  name: string;
  type: 'testnet' | 'mainnet' | 'social' | 'defi' | 'nft' | 'gaming';
  description: string;
  requirements: ProjectRequirement[];
  rewards: ProjectReward;
  timeline: ProjectTimeline;
  status: 'upcoming' | 'active' | 'ended' | 'completed';
  participants: string[]; // 参与的账号组ID
}

interface ProjectRequirement {
  type: 'transaction' | 'social' | 'hold' | 'interact' | 'bridge';
  description: string;
  parameters: Record<string, any>;
  completed: boolean;
}
```

#### 3.2 自动化任务
- **交易自动化**: 自动执行swap、bridge、mint等操作
- **社交任务**: 自动关注、点赞、转发、评论
- **质押操作**: 自动质押、解质押操作
- **批量执行**: 支持大规模批量任务执行
- **进度追踪**: 实时追踪任务执行进度

#### 3.3 风险控制
- **行为模拟**: 模拟真实用户行为，避免被检测
- **时间间隔**: 合理控制操作时间间隔
- **错误处理**: 完善的错误处理和重试机制
- **限频控制**: 避免触发平台限制

### 4. 钱包管理模块 (Wallet Management)

#### 4.1 多链钱包支持
- **EVM链**: Ethereum, BSC, Polygon, Arbitrum, Optimism等
- **非EVM链**: Solana, Cosmos, Near, Aptos等
- **Layer2**: StarkNet, zkSync, Polygon zkEVM等

#### 4.2 钱包功能
- **批量创建**: 批量生成钱包地址和私钥
- **助记词管理**: 安全管理助记词和私钥
- **余额查询**: 实时查询多链代币余额
- **交易记录**: 追踪所有交易记录
- **Gas优化**: 智能Gas费估算和优化

#### 4.3 DeFi操作
- **DEX交易**: 支持Uniswap, PancakeSwap等DEX
- **流动性管理**: 添加/移除流动性
- **收益farming**: 自动化收益farming
- **跨链桥**: 支持主流跨链桥操作

### 5. 插件市场模块 (Plugin Market)

#### 5.1 插件架构
```typescript
interface Plugin {
  id: string;
  name: string;
  version: string;
  author: string;
  description: string;
  type: 'automation' | 'analysis' | 'utility' | 'social';
  entry: string; // 插件入口文件
  config: PluginConfig;
  permissions: string[];
}
```

#### 5.2 插件功能
- **热门插件**: 社区热门插件推荐
- **自定义插件**: 支持用户开发自定义插件
- **插件商店**: 插件下载和安装管理
- **版本管理**: 插件版本控制和更新

### 6. 安全模块 (Security)

#### 6.1 数据加密
- **本地加密**: 使用AES-256加密敏感数据
- **密钥管理**: 安全的密钥派生和存储
- **数据库加密**: SQLite数据库整体加密
- **内存保护**: 防止内存数据泄露

#### 6.2 安全策略
- **访问控制**: 基于角色的访问控制
- **审计日志**: 记录所有敏感操作
- **备份恢复**: 安全的数据备份和恢复
- **更新机制**: 安全的软件更新机制

---

## 实现方案

### 第一阶段：基础架构 (4-6周)
1. **数据库设计**: 设计和实现SQLite数据库schema
2. **加密模块**: 实现数据加密和解密功能
3. **基础UI**: 完善基础UI组件和布局
4. **状态管理**: 完善Zustand状态管理架构
5. **路由系统**: 完善React Router路由配置

### 第二阶段：账号管理 (6-8周)
1. **账号模型**: 实现统一账号体系数据模型
2. **批量导入**: 实现CSV/Excel批量导入功能
3. **账号验证**: 实现各平台账号有效性验证
4. **数据加密**: 集成加密存储敏感信息
5. **UI界面**: 完成账号管理界面开发

### 第三阶段：代理和网络 (4-6周)
1. **代理管理**: 实现代理配置和管理功能
2. **网络测试**: 实现代理速度和可用性测试
3. **智能分配**: 实现代理智能分配算法
4. **网络监控**: 实现网络状态监控

### 第四阶段：自动化引擎 (8-10周)
1. **浏览器引擎**: 集成Puppeteer/Playwright
2. **Web3集成**: 集成ethers.js/web3.js
3. **任务调度**: 实现任务调度和执行引擎
4. **错误处理**: 完善错误处理和重试机制
5. **行为模拟**: 实现人类行为模拟算法

### 第五阶段：项目和插件 (6-8周)
1. **项目管理**: 实现airdrop项目管理功能
2. **任务模板**: 创建常见任务模板
3. **插件架构**: 实现插件系统架构
4. **插件开发**: 开发基础插件
5. **插件商店**: 实现插件商店功能

### 第六阶段：优化和发布 (4-6周)
1. **性能优化**: 优化应用性能和内存使用
2. **安全加固**: 安全审计和加固
3. **测试**: 完整的功能测试和压力测试
4. **文档**: 编写用户文档和开发文档
5. **打包发布**: 准备各平台安装包

---

## 技术难点和注意事项

### 1. 反检测技术
- **指纹伪造**: 浏览器指纹随机化
- **行为模拟**: 模拟真实用户行为模式
- **时间控制**: 合理的操作时间间隔
- **IP轮换**: 智能IP地址轮换策略

### 2. 大规模并发
- **连接池**: 合理的连接池管理
- **限流控制**: 避免触发平台限制
- **资源管理**: 合理的CPU和内存使用
- **错误恢复**: 完善的错误恢复机制

### 3. 数据安全
- **加密算法**: 使用强加密算法保护数据
- **密钥管理**: 安全的密钥生成和存储
- **访问控制**: 严格的数据访问控制
- **审计追踪**: 完整的操作审计日志

### 4. 跨平台兼容
- **系统差异**: 处理不同操作系统差异
- **依赖管理**: 合理的依赖版本管理
- **性能优化**: 针对不同平台优化性能
- **用户体验**: 保证跨平台一致的用户体验

### 5. 法律合规
- **使用条款**: 遵守各平台使用条款
- **数据保护**: 符合数据保护法规
- **免责声明**: 明确软件使用责任
- **合规监控**: 持续监控合规性要求

---

## 数据库Schema设计

### 核心表结构
```sql
-- 账号组表
CREATE TABLE account_groups (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  sequence_number INTEGER UNIQUE,
  status TEXT DEFAULT 'active',
  proxy_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 各平台账号表
CREATE TABLE telegram_accounts (
  id TEXT PRIMARY KEY,
  group_id TEXT,
  phone TEXT,
  session TEXT, -- 加密
  user_id TEXT,
  username TEXT,
  FOREIGN KEY (group_id) REFERENCES account_groups(id)
);

CREATE TABLE twitter_accounts (
  id TEXT PRIMARY KEY,
  group_id TEXT,
  username TEXT,
  email TEXT,
  password TEXT, -- 加密
  cookies TEXT, -- 加密
  FOREIGN KEY (group_id) REFERENCES account_groups(id)
);

-- 项目表
CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT,
  description TEXT,
  config TEXT, -- JSON配置
  status TEXT DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 任务执行记录表
CREATE TABLE task_executions (
  id TEXT PRIMARY KEY,
  project_id TEXT,
  group_id TEXT,
  task_type TEXT,
  status TEXT,
  result TEXT,
  error_message TEXT,
  executed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (group_id) REFERENCES account_groups(id)
);
```

---

## 开发优先级建议

### 高优先级
1. 账号管理基础功能
2. 数据加密和安全
3. 代理管理和网络
4. 基础自动化引擎

### 中优先级
1. 项目管理功能
2. 钱包集成
3. 高级自动化功能
4. 用户界面优化

### 低优先级
1. 插件系统
2. 高级分析功能
3. 社区功能
4. 第三方集成

这个设计方案提供了一个完整的Web3 airdrop工具箱架构，涵盖了从基础账号管理到高级自动化功能的所有核心模块。实施时应该按阶段进行，首先建立稳固的基础架构，再逐步添加高级功能。