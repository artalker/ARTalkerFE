import { useState } from 'react';
import UserLevelSection from '../components/user/UserLevelSection';
import SearchBar from '../components/talk/SearchBar';
import SearchFilter from '../components/talk/SearchFilter';
import TalkListItems from '../components/talk/TalkListItems';

const TalkList = () => {
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<{
    categories: string[];
    levels: string[];
  }>({
    categories: [''],
    levels: [''],
  });

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
      <TalkListItems data={[]} />
    </div>
  );
};

export default TalkList;
