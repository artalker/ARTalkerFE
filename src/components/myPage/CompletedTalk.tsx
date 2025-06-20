import CustomPagination from '../../common/CustomPagination';
import StarRating from '../../common/StarRating';
import TalkLvLabel from '../../common/TalkLvLabel';
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { converDateNoTime } from '@/utils/dateConvert';
import {
  useDeleteRecentTalkMessageData,
  useRecentTalkMessageData,
} from '@/api/useUserInfo';
import { useEffect, useState } from 'react';
import Loading from '@/assets/Loading.gif';

const CompletedTalk = () => {
  const [page, setPage] = useState<number>(1);
  const userId = sessionStorage.getItem('id');

  const {
    data,
    refetch: refetchCompletedTalkData,
    isLoading,
  } = useRecentTalkMessageData({
    userId: userId,
    search: '',
    page: page,
    limit: 10,
  });

  useEffect(() => {
    refetchCompletedTalkData();
  }, [page]);

  useEffect(() => {
    refetchCompletedTalkData();
  }, []);

  const { mutate: deleteRecentTalkMessageData } =
    useDeleteRecentTalkMessageData();

  const navigate = useNavigate();
  const handleDeleteRecentTalkMessageData = (
    id: number,
    conversationId: number
  ) => {
    deleteRecentTalkMessageData(conversationId, {
      onSuccess: () => {
        navigate(`/talk/${id}`);
      },
      onError: (err) => {
        console.log('에러', err);
      },
    });
  };
  const handleReTalk = (id: number) => {
    navigate(`/talk/${id}`);
  };
  const handleMoveResult = (artworkId: number, conversationId: number) => {
    navigate(`/talk/${artworkId}?conversationId=${conversationId}`);
  };
  return (
    <div className='w-[335px] flex flex-col gap-[10px] mt-[27px]'>
      {isLoading ? (
        <div className='w-full h-[300px] flex flex-col justify-center items-center'>
          <img src={Loading} alt='loading' className='w-[50px] h-[50px]' />
        </div>
      ) : (
        <>
          {data?.items?.map((item: any, index: number) => (
            <div
              key={index}
              onClick={() => {
                if (item?.isComplete) {
                  handleMoveResult(item.artwork.id, item.id);
                }
              }}
              className={`relative w-[335px] h-[150px] flex flex-col justify-start items-start border-[1px] border-[#E5E5E5] bg-[#FFFFFF] rounded-lg mb-[6px] overflow-hidden ${
                item?.isComplete && 'cursor-pointer'
              }`}
            >
              <div
                className={`${
                  !item?.isComplete &&
                  'absolute w-full h-full flex bg-[#3d3d3d] opacity-[0.4] z-[1]'
                }`}
              />
              <div className={`${!item?.isComplete && 'blur-[2px]'}`}>
                <div className='w-full h-[107px] p-[12px] flex justify-start items-start rounded-r-[8px] rounded-l-[8px] rounded-b-none overflow-hidden bg-[#FFFFFF]'>
                  {item.artwork.imageUrl &&
                  !item.artwork.imageUrl.includes('example.com') ? (
                    <img
                      src={item.artwork.imageUrl}
                      alt={item.artwork.title}
                      className='w-[79px] h-[79px] object-cover rounded-[4px]'
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = '';
                        target.parentElement!.innerHTML = `
                      <div class="w-[79px] h-[79px] flex items-center justify-center bg-gray-200">
                        <span class="text-xs text-gray-500">이미지 없음</span>
                      </div>`;
                      }}
                    />
                  ) : (
                    <div className='w-[79px] h-[79px] flex items-center justify-center bg-gray-200'>
                      <span className='text-xs text-gray-500'>이미지 없음</span>
                    </div>
                  )}
                  <div className='w-[226px] ml-[8px] flex flex-col justify-start items-start'>
                    <div className='w-full flex row justify-between items-center'>
                      <h2 className='text-[14px] font-semibold text-[#3D3D3D]'>
                        {item.artwork.title}
                      </h2>
                      <TalkLvLabel talkLv={Number(item.userLevel)} />
                    </div>
                    <p className='text-[10px] text-[#ABABAB] overflow-hidden text-ellipsis line-clamp-1'>
                      {item.artwork.artist}, {item.artwork.year}
                    </p>
                    <StarRating score={Number(item.score)} />
                    <p className='text-[10px] text-[#ABABAB] mt-[3px] leading-[12px] overflow-hidden text-ellipsis line-clamp-2'>
                      {item.artwork.description_ko}
                    </p>
                  </div>
                </div>
                <div className='w-full h-[43px] rounded-t-none overflow-hidden bg-[#ebedfe] flex justify-between items-center px-[12px]'>
                  <p className='text-[10px] text-[#ABABAB] font-semibold'>
                    {converDateNoTime(item.startedAt)}
                  </p>
                  <button
                    onClick={() => handleReTalk(item.no)}
                    className='text-[10px] text-[#ffffff] flex items-center gap-[2px] bg-[#6366F1] rounded-[4px] px-[6px] py-[3px] cursor-pointer'
                  >
                    <ChatBubbleOvalLeftIcon className='w-[14px] h-[14px] text-[#ffffff] scale-x-[-1]' />
                    새로 대화하기
                  </button>
                </div>
              </div>
              {/* 완료되지 않은 대화 */}
              {!item?.isComplete && (
                <div className='absolute top-0 left-0 translate-x-[0%] translate-y-[0%] w-full h-full flex flex-col justify-center items-center z-[2]'>
                  <p className='text-[12px] text-[#ffffff] font-semibold'>
                    잘못된 대화 형식입니다. 새로 대화해주세요.
                  </p>
                  <button
                    onClick={() =>
                      handleDeleteRecentTalkMessageData(
                        item.artwork.id,
                        item.id
                      )
                    }
                    className='text-[14px] text-[#ffffff] font-semibold border-[1px] border-[#ffffff] rounded-[4px] px-[6px] py-[3px] mt-[6px] cursor-pointer'
                  >
                    새로 대화하기
                  </button>
                </div>
              )}
            </div>
          ))}
          <CustomPagination
            page={page}
            total={Number(data?.meta?.total)}
            limit={10}
            onPageChange={(page: number) => setPage(page)}
          />
        </>
      )}
    </div>
  );
};

export default CompletedTalk;
