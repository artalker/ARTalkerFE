import { FaceSmileIcon } from '@heroicons/react/24/outline';

const UserMessage = ({ message }: { message: string }) => {
  return (
    <div className='flex gap-[4px] items-start'>
      {/* 텍스트 및 하단 컨테이너 */}
      <div className='flex flex-col gap-1'>
        {/* 메시지 말풍선 */}
        <div className='bg-[#ffffff] border-[1px] border-[#ABAFBA] rounded-tr-none px-4 py-3 rounded-2xl min-w-[100px] max-w-[300px]'>
          <p className='whitespace-pre-line text-[15px] leading-relaxed font-medium'>
            {message}
          </p>
        </div>
        {/* 오른쪽 시간 */}
        <div className='flex items-center gap-3 text-[#999999] text-[13px]'>
          <span className='text-[8px]'>14:32</span>
        </div>
      </div>
      {/* 아바타 */}
      <div className='w-7 h-7 flex justify-center items-center rounded-full bg-[#ABABAB]'>
        <FaceSmileIcon className='w-5 h-5 text-white' />
      </div>
    </div>
  );
};

export default UserMessage;
