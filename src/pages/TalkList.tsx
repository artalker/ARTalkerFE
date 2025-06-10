import { useEffect, useState } from 'react';
import UserLevelSection from '../components/user/UserLevelSection';
import SearchBar from '../components/talk/SearchBar';
import SearchFilter from '../components/talk/SearchFilter';
import TalkListItems from '../components/talk/TalkListItems';
import { useTalkListData } from '../api/useTalk';
import CustomPagination from '@/common/CustomPagination';
import Loading from '@/assets/Loading.gif';

const TalkList = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<{
    categories: string[];
  }>({
    categories: [''],
  });
  const [talkLv, setTalkLv] = useState<number>(1);

  const {
    data: talkListData,
    isLoading,
    refetch,
  } = useTalkListData({
    search: search,
    page: page,
    limit: 10,
  });

  useEffect(() => {
    if (filter.categories.length === 4) {
      setFilter({
        ...filter,
        categories: [''],
      });
    }
  }, [filter.categories]);

  useEffect(() => {
    refetch();
  }, [search]);

  return (
    <div className='w-full h-root flex flex-col justify-start items-center bg-[#F9FAFB]'>
      <UserLevelSection />
      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
      <SearchFilter
        categories={filter.categories}
        levels={talkLv}
        onCategoryChange={(category) =>
          setFilter({ ...filter, categories: category.split(',') })
        }
        setTalkLv={setTalkLv}
      />
      {talkListData?.items.length > 0 ? (
        <>
          <TalkListItems data={talkListData?.items} talkLv={talkLv} />
          <CustomPagination
            page={page}
            total={Number(talkListData?.meta.total)}
            limit={10}
            onPageChange={(page: number) => setPage(page)}
          />
        </>
      ) : isLoading ? (
        <div className='w-full h-full flex flex-col justify-center items-center'>
          <img src={Loading} alt='loading' className='w-[50px] h-[50px]' />
        </div>
      ) : (
        <div className='w-full h-full flex flex-col justify-center items-center'>
          <p>데이터가 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default TalkList;
