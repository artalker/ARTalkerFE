import { useNavigate } from 'react-router-dom';
import Estaque from '../../assets/art/Estaque.png';
import Chatou from '../../assets/art/Chatou.png';
import Dance from '../../assets/art/Galette.png';
import Pont from '../../assets/art/Pont.png';
import { PlayIcon } from '@heroicons/react/24/solid';

const TodayRecommendedTalk = () => {
  const navigate = useNavigate();
  const todayRecommendedTalkList = [
    {
      no: 1,
      name: '피에르 오귀스트 르누아르',
      img: Chatou,
      desc: 'La Seine à Chatou - 1874',
    },
    {
      no: 2,
      name: '피에르 오귀스트 르누아르',
      img: Dance,
      desc: '물랭 드 라 갈레트의 춤 - 1894',
    },
    {
      no: 0,
      name: '피에르 오귀스트 르누아르',
      img: Estaque,
      desc: 'L Estaqu - 1882',
    },
    {
      no: 3,
      name: '피에르 오귀스트 르누아르',
      img: Pont,
      desc: 'Pont Neuf, Paris',
    },
  ];
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
        <div className='flex space-x-3' style={{ width: 'max-content' }}>
          {todayRecommendedTalkList.map((talk, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/talk/${talk.no}`);
              }}
              className='art-card w-[192px] h-[173px] bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer'
            >
              <div className='h-[128px] overflow-hidden'>
                <img
                  src={talk.img}
                  alt={talk.name}
                  className='w-[192px] h-[128px] object-cover object-center rounded-t-[12px] rounded-b-none'
                />
              </div>
              <div className='w-[192px] h-[45px] flex justify-center items-center'>
                <div className='w-[171px] flex justify-between items-center'>
                  <div className='h-[30px] flex flex-col'>
                    <div className='font-semibold text-[14px] text-[#3D3D3D] w-[152px] overflow-hidden whitespace-nowrap text-ellipsis'>
                      {talk.name}
                    </div>
                    <span className='font-normal text-[10px] text-[#999999] w-[152px] overflow-hidden whitespace-nowrap text-ellipsis'>
                      {talk.desc}
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
      </div>
    </section>
  );
};

export default TodayRecommendedTalk;
