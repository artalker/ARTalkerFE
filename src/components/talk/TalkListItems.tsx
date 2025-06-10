import TalkLvLabel from '../../common/TalkLvLabel';
import { useNavigate } from 'react-router-dom';

const TalkListItems = ({ data, talkLv }: { data: any; talkLv: number }) => {
  const navigate = useNavigate();

  const handleTalk = (item: any) => {
    navigate(`/talk/${item}`, {
      state: { difficulty: talkLv },
    });
  };

  return (
    <div className='w-[335px] grid grid-cols-2 gap-[6px] mt-[45px] mb-[27px]'>
      {data?.map((item: any, index: number) => (
        <div
          key={index}
          onClick={() => handleTalk(item?.id)}
          className='w-[160px] h-[199px] flex flex-col justify-start items-start border-[1px] border-[#E5E5E5] bg-[#FFFFFF] rounded-lg mb-[6px] overflow-hidden cursor-pointer'
        >
          <div className='w-full h-[93px] min-h-[93px] rounded-r-[8px] rounded-l-[8px] rounded-b-none overflow-hidden bg-gray-100 flex items-center justify-center'>
            {item.imageUrl && !item.imageUrl.includes('example.com') ? (
              <img
                src={item.imageUrl}
                alt={item.title}
                className='w-full h-full object-cover'
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '';
                  target.parentElement!.innerHTML = `
                    <div class="w-full h-full flex items-center justify-center bg-gray-200">
                      <span class="text-xs text-gray-500">이미지 없음</span>
                    </div>`;
                }}
              />
            ) : (
              <div className='w-full h-full flex items-center justify-center bg-gray-200'>
                <span className='text-xs text-gray-500'>이미지 없음</span>
              </div>
            )}
          </div>
          <div className='py-[8px] px-[12px]'>
            <p className='text-[14px] font-semibold text-[#3D3D3D]'>
              {item.title}
            </p>
            <p className='text-[10px] text-[#ABABAB]'>
              {item.artist} - {item.year}
            </p>
            <TalkLvLabel talkLv={Number(talkLv)} />
            <p className='w-[140px] text-[10px] text-[#ABABAB] mt-[3px] leading-[12px] overflow-hidden text-ellipsis line-clamp-3'>
              {item.description_ko}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TalkListItems;
