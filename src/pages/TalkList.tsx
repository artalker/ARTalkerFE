import { useState } from 'react';
import UserLevelSection from '../components/user/UserLevelSection';
import SearchBar from '../components/talk/SearchBar';
import SearchFilter from '../components/talk/SearchFilter';
import TalkListItems from '../components/talk/TalkListItems';
import CamillePissarro from '../assets/art/boulevardMontmatre_spring.png';
import SandroBoticelli from '../assets/art/the_spring.png';
import MarcelDuchamp from '../assets/art/Fountain.jpeg';
import ShinYoonBok from '../assets/art/private_spa.jpg';

const TalkList = () => {
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<{
    categories: string[];
    levels: string[];
  }>({
    categories: [''],
    levels: [''],
  });
  const categoryList = [
    {
      items: [
        {
          no: 0,
          title: '몽마르트 대로, 봄',
          name: '프란시스코 피사로',
          img: CamillePissarro,
          desc: 'Oil on canvas, 65cm *81cm',
          year: '1897',
          level: '1',
        },
        {
          no: 1,
          title: '봄',
          name: '산드로 보티첼리',
          img: SandroBoticelli,
          desc: 'Tempera on panel, 314cm *203cm',
          year: '1480',
          level: '2',
        },
        {
          no: 2,
          title: '샘',
          name: '마르셀 뒤샹',
          img: MarcelDuchamp,
          desc: 'Ready-made, 36cm *48cm *61cm',
          year: '1917',
          level: '3',
        },
        {
          no: 3,
          title: '단오풍정',
          name: '신윤복',
          img: ShinYoonBok,
          desc: 'Ink on paper, 28.2cm *35.6cm Ink on paper, 28.2cm *35.6cm Ink on paper, 28.2cm *35.6cm test test',
          year: '18세기 말 ~ 19세기 초',
          level: '4',
        },
        {
          no: 0,
          title: '몽마르트 대로, 봄',
          name: '프란시스코 피사로',
          img: CamillePissarro,
          desc: 'Oil on canvas, 65cm *81cm',
          year: '1897',
          level: '1',
        },
        {
          no: 1,
          title: '봄',
          name: '산드로 보티첼리',
          img: SandroBoticelli,
          desc: 'Tempera on panel, 314cm *203cm',
          year: '1480',
          level: '2',
        },
        {
          no: 2,
          title: '샘',
          name: '마르셀 뒤샹',
          img: MarcelDuchamp,
          desc: 'Ready-made, 36cm *48cm *61cm',
          year: '1917',
          level: '3',
        },
        {
          no: 3,
          title: '단오풍정',
          name: '신윤복',
          img: ShinYoonBok,
          desc: 'Ink on paper, 28.2cm *35.6cm Ink on paper, 28.2cm *35.6cm Ink on paper, 28.2cm *35.6cm test test',
          year: '18세기 말 ~ 19세기 초',
          level: '4',
        },
      ],
      meta: {
        total: 10,
        page: '1',
        limit: '20',
        totalPages: 1,
        search: '',
      },
    },
  ];

  return (
    <div className='w-full h-root flex flex-col justify-start items-center bg-[#F9FAFB]'>
      <UserLevelSection />
      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
      <SearchFilter
        categories={filter.categories}
        levels={filter.levels}
        onCategoryChange={(category) =>
          setFilter({ ...filter, categories: category.split(',') })
        }
        onLevelChange={(level) =>
          setFilter({ ...filter, levels: level.split(',') })
        }
      />
      <TalkListItems data={categoryList} />
    </div>
  );
};

export default TalkList;
