import { useState } from 'react';
import CamillePissarro from '../../assets/art/boulevardMontmatre_spring.png';
import SandroBoticelli from '../../assets/art/the_spring.png';
import MarcelDuchamp from '../../assets/art/Fountain.jpeg';
import ShinYoonBok from '../../assets/art/private_spa.jpg';
import { PlayIcon } from '@heroicons/react/24/solid';

const ArtCategory = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const categoryList = [
    {
      no: 0,
      title: '인상주의',
      name: '프란시스코 피사로',
      img: CamillePissarro,
      desc: '몽마르트 대로, 봄 풍경 - 1897, Oil on canvas, 65cm *81cm',
    },
    {
      no: 1,
      title: '르네상스',
      name: '산드로 보티첼리',
      img: SandroBoticelli,
      desc: '봄 - 1480, Tempera on panel, 314cm *203cm',
    },
    {
      no: 2,
      title: '현대미술',
      name: '마르셀 뒤샹',
      img: MarcelDuchamp,
      desc: '1917, Ready-made, 36cm *48cm *61cm',
    },
    {
      no: 3,
      title: '동양화',
      name: '신윤복',
      img: ShinYoonBok,
      desc: '18세기 말 ~ 19세기 초, Ink on paper, 28.2cm *35.6cm',
    },
  ];

  return (
    <div>
      <section className='max-w-[667px] w-[100vw] h-[46px] flex justify-center items-center bg-[#F1F2F3]'>
        <div className='flex justify-between items-center gap-2'>
          {categoryList.map((category, index) => (
            <div
              key={index}
              className={`flex justify-center items-center 
                text-[14px] font-semibold px-[16px] py-[6px] 
                rounded-[50px] cursor-pointer ${
                  activeCategory === index
                    ? 'text-[#4B6FBF] bg-[#fff]'
                    : 'text-[#999999]'
                }`}
              onClick={() => setActiveCategory(index)}
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
              <div key={index}>
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
