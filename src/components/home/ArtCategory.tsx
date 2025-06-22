import { useState } from 'react';
import Davinci from '@/assets/art/davinch.png';
import gogh from '@/assets/art/gogh.png';
import mone from '@/assets/art/mone.png';
import sun from '@/assets/art/jungsun.png';
import { PlayIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const ArtCategory = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<number>(70);
  const categoryList = [
    {
      no: 70,
      title: '종교화',
      name: '레오나르도 다 빈치',
      img: Davinci,
      desc: '최후의 만찬 - 1498',
    },
    {
      no: 63,
      title: '정물화',
      name: '빈센트 반 고흐',
      img: gogh,
      desc: '해바라기 - 1888',
    },
    {
      no: 66,
      title: '풍경화',
      name: '클로드 모네',
      img: mone,
      desc: '수련 연못 - 1919',
    },
    {
      no: 67,
      title: '동양화',
      name: '정선',
      img: sun,
      desc: '산수화 - 1750',
    },
  ];

  return (
    <div className='pt-[45px]'>
      <section className='max-w-[667px] w-[100vw] h-[46px] flex justify-center items-center bg-[#F1F2F3]'>
        <div className='flex justify-between items-center gap-2'>
          {categoryList.map((category, index) => (
            <div
              key={index}
              className={`flex justify-center items-center 
                text-[14px] font-semibold px-[16px] py-[6px] 
                rounded-[50px] cursor-pointer ${
                  activeCategory === category.no
                    ? 'text-[#4B6FBF] bg-[#fff]'
                    : 'text-[#999999]'
                }`}
              onClick={() => setActiveCategory(category.no)}
            >
              {category.title}
            </div>
          ))}
        </div>
      </section>

      <div className='w-full mt-[20px] flex justify-center items-center'>
        {categoryList.map((category, index: number) => {
          return (
            activeCategory === category?.no && (
              <div key={index} onClick={() => navigate(`/talk/${category.no}`)}>
                <img
                  src={category.img}
                  alt={category.name}
                  className='min-w-[335px] w-[335px] h-[152px] object-cover object-center rounded-t-[12px] rounded-b-none'
                />
                <div className='w-[335px] mt-[10px] flex justify-between items-center'>
                  <div className='w-[240px] flex flex-col gap-[2px]'>
                    <div className='text-[14px] font-semibold text-[#3D3D3D]'>
                      {category.name}
                    </div>
                    <div className='text-[10px] text-[#ABABAB] w-[240px] overflow-hidden whitespace-nowrap text-ellipsis'>
                      {category.desc}
                    </div>
                  </div>
                  <div className='w-[36px] h-[36px] rounded-full bg-[#4B6FBF] flex justify-center items-center'>
                    <PlayIcon className='size-6 text-white cursor-pointer ml-1' />
                  </div>
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default ArtCategory;
