import { useState } from 'react';
import CustomPagination from '../../common/CustomPagination';
import StarRating from '../../common/StarRating';
import TalkLvLabel from '../../common/TalkLvLabel';
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const CompletedTalk = ({ data }: { data: any }) => {
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();
  const handleReTalk = (id: number) => {
    navigate(`/talk/${id}`, {
      state: { pageName: '대화하기' },
    });
  };
  return (
    <div className='w-[335px] flex flex-col gap-[10px] mt-[27px]'>
      {data[0]?.items.map((item: any, index: number) => (
        <div
          key={index}
          className='relative w-[335px] h-[150px] flex flex-col justify-start items-start border-[1px] border-[#E5E5E5] bg-[#FFFFFF] rounded-lg mb-[6px] overflow-hidden'
        >
          <div
            className={`${
              !item.isCompleted &&
              'absolute w-full h-full flex bg-[#3d3d3d] opacity-[0.4] z-[1]'
            }`}
          />
          <div className={`${!item.isCompleted && 'blur-[2px]'}`}>
            <div className='w-full h-[107px] p-[12px] flex justify-start items-start rounded-r-[8px] rounded-l-[8px] rounded-b-none overflow-hidden bg-[#FFFFFF]'>
              <img
                src={item.img}
                alt={item.title}
                className='w-[79px] h-[79px] object-cover rounded-[4px]'
              />
              <div className='w-[226px] ml-[8px] flex flex-col justify-start items-start'>
                <div className='w-full flex row justify-between items-center'>
                  <h2 className='text-[14px] font-semibold text-[#3D3D3D]'>
                    {item.title}
                  </h2>
                  <TalkLvLabel talkLv={Number(item.level)} />
                </div>
                <p className='text-[10px] text-[#ABABAB] overflow-hidden text-ellipsis line-clamp-1'>
                  {item.name}, {item.desc}
                </p>
                <StarRating score={Number(item.score)} />
                <p className='text-[10px] text-[#ABABAB] mt-[3px] leading-[12px] overflow-hidden text-ellipsis line-clamp-2'>
                  {item.content}
                </p>
              </div>
            </div>
            <div className='w-full h-[43px] rounded-t-none overflow-hidden bg-[#ebedfe] flex justify-between items-center px-[12px]'>
              <p className='text-[10px] text-[#ABABAB] font-semibold'>
                {item.date}
              </p>
              <button
                onClick={() => handleReTalk(item.no)}
                className='text-[10px] text-[#ffffff] flex items-center gap-[2px] bg-[#6366F1] rounded-[4px] px-[6px] py-[3px]'
              >
                <ChatBubbleOvalLeftIcon className='w-[14px] h-[14px] text-[#ffffff] scale-x-[-1]' />
                새로 대화하기
              </button>
            </div>
          </div>
          {/* 완료되지 않은 대화 */}
          {!item.isCompleted && (
            <div className='absolute top-0 left-0 translate-x-[0%] translate-y-[0%] w-full h-full flex flex-col justify-center items-center z-[2]'>
              <p className='text-[12px] text-[#ffffff] font-semibold'>
                잘못된 대화 형식입니다. 새로 대화해주세요.
              </p>
              <button
                onClick={() =>
                  navigate(`/talk/${item.no}`, {
                    state: { pageName: '대화하기' },
                  })
                }
                className='text-[14px] text-[#ffffff] font-semibold border-[1px] border-[#ffffff] rounded-[4px] px-[6px] py-[3px] mt-[6px]'
              >
                새로 대화하기
              </button>
            </div>
          )}
        </div>
      ))}
      <CustomPagination
        page={page}
        total={Number(data[0].meta.total)}
        limit={10}
        onPageChange={(page: number) => setPage(page)}
      />
    </div>
  );
};

export default CompletedTalk;
