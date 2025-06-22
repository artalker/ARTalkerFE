import { useNavigate } from 'react-router-dom';
import { PlayIcon } from '@heroicons/react/24/solid';
import { useTodayRecommendData } from '@/api/useHome';
import Loading from '@/assets/Loading.gif';

const TodayRecommendedTalk = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useTodayRecommendData();

  return (
    <section className='w-[335px] pt-[43px]'>
      <div className='flex justify-between items-center mb-2'>
        <span className='text-[#4B6FBF] text-[16px] font-semibold'>
          오늘의 추천 작품
        </span>
        <button
          className='text-[#999999] text-[14px] font-normal'
          onClick={() => {
            navigate('/talkList');
          }}
        >
          더보기
        </button>
      </div>
      <div className='overflow-x-scroll pb-2 scrollbar-hide'>
        {isLoading ? (
          <div className='w-full h-[300px] flex flex-col justify-center items-center'>
            <img src={Loading} alt='loading' className='w-[50px] h-[50px]' />
          </div>
        ) : (
          <div className='flex space-x-3' style={{ width: 'max-content' }}>
            {data?.map((talk, index) => (
              <div
                key={index}
                onClick={() => {
                  navigate(`/talk/${talk.id}`);
                }}
                className='art-card w-[192px] h-[173px] bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer'
              >
                {talk.imageUrl && !talk.imageUrl.includes('example.com') ? (
                  <img
                    src={talk.imageUrl}
                    alt={talk.title}
                    className='w-[192px] h-[128px] object-cover object-center rounded-t-[12px] rounded-b-none'
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '';
                      target.parentElement!.innerHTML = `
                      <div class="w-[192px] h-[128px] flex items-center justify-center bg-gray-200">
                        <span class="text-xs text-gray-500">이미지 없음</span>
                      </div>`;
                    }}
                  />
                ) : (
                  <div className='w-[192px] h-[128px] flex items-center justify-center bg-gray-200'>
                    <span className='text-xs text-gray-500'>이미지 없음</span>
                  </div>
                )}
                <div className='w-[192px] h-[45px] flex justify-center items-center'>
                  <div className='w-[171px] flex justify-between items-center'>
                    <div className='h-[30px] flex flex-col'>
                      <div className='font-semibold text-[14px] text-[#3D3D3D] w-[152px] overflow-hidden whitespace-nowrap text-ellipsis'>
                        {talk.artist}
                      </div>
                      <span className='font-normal text-[10px] text-[#999999] w-[152px] overflow-hidden whitespace-nowrap text-ellipsis'>
                        {talk.title} - {talk?.year}
                      </span>
                    </div>
                    <button>
                      <PlayIcon className='size-6 text-[#4B6FBF] cursor-pointer mr-1' />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TodayRecommendedTalk;
