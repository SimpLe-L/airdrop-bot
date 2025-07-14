import CommonTable from '@/components/common/table';
import { Input } from 'antd';

const { TextArea } = Input;

const TwitterPage = () => {
  return (
    <div className="flex flex-col gap-5 h-full">
      <div className="flex">
        <div className="">
          <span className="text-gray-400">导入推特账号，常见格式：</span>
        </div>
        <div className="flex-1">
          <TextArea rows={6} placeholder="maxLength is 6" maxLength={6} />
        </div>
      </div>
      <div className="flex-1">
        <CommonTable />
      </div>
    </div>
  )
};

export default TwitterPage;