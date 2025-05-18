import Pagination from 'react-js-pagination';

const CustomPagination = ({
  page,
  total,
  limit,
  onPageChange,
}: {
  page: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={limit}
      totalItemsCount={total}
      onChange={onPageChange}
      pageRangeDisplayed={5}
      prevPageText={'‹'}
      nextPageText={'›'}
      innerClass='flex justify-center mb-4'
      itemClass='w-[30px] h-[30px]  mx-[5px] text-center rounded-[50%] text-[16px] flex items-center justify-center font-medium'
      linkClass='text-[#333333]'
      activeLinkClass='text-white'
      activeClass='bg-[#6366F1] text-white !important'
      disabledClass='opacity-50 cursor-not-allowed'
    />
  );
};

export default CustomPagination;
