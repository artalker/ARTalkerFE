import { useState } from 'react';
import CustomPagination from '../common/CustomPagination';
import { useSearchTipData, useTodayTipData } from '@/api/useTips';
import { converDateNoTime } from '@/utils/dateConvert';
import Loading from '@/assets/Loading.gif';

const Tip = () => {
  const [page, setPage] = useState<number>(1);
  const { data: todayTipData, isLoading: isLoadingTodayTipData } =
    useTodayTipData();
  const { data: searchTipData, isLoading: isLoadingSearchTipData } =
    useSearchTipData({
      page: page,
      limit: 20,
      search: '',
    });

  return (
    <div className='w-full h-root flex flex-col justify-start items-center bg-[#F9FAFB]'>
      <section className='mt-[25px] mb-[60px]'>
        <div className='w-[335px] min-h-[142px] bg-gradient-to-r from-[#4B6FBF]/10 to-[#A857F7]/10 rounded-lg p-4'>
          <h2 className='text-[16px] font-semibold mb-2 text-[#4B6FBF]'>
            오늘의 학습 TIP!
          </h2>
          {isLoadingTodayTipData ? (
            <div className='flex flex-col justify-center items-center'>
              <img src={Loading} alt='loading' className='w-[50px] h-[50px]' />
            </div>
          ) : (
            <p className='text-[12px] text-[#3D3D3D]'>
              {todayTipData?.[0]?.content}
            </p>
          )}
        </div>
      </section>
      <section className='w-[335px]  flex flex-col mb-[60px]'>
        <h2 className='ttext-[14px] font-semibold mb-[12px] text-[#3D3D3D]'>
          지난 학습 TIP
        </h2>
        <div className='flex flex-col gap-[6px]'>
          {isLoadingSearchTipData ? (
            <div className='w-full h-[300px] flex flex-col justify-center items-center'>
              <img src={Loading} alt='loading' className='w-[50px] h-[50px]' />
            </div>
          ) : (
            searchTipData?.items?.map((tip, index) => (
              <div
                key={index}
                className='w-[335px] flex flex-col justify-between items-start border-[1px] border-[#E5E5E5] px-[16px] py-[13px] bg-[#FFFFFF] rounded-lg'
              >
                <p className='mb-[4px] text-[12px] font-semibold text-[#3D3D3D]'>
                  {converDateNoTime(tip?.createdAt)}
                </p>
                <p className='text-[12px] text-[#817E7E]'>{tip?.content}</p>
              </div>
            ))
          )}
        </div>
      </section>
      <CustomPagination
        page={page}
        total={Number(searchTipData?.meta.total)}
        limit={20}
        onPageChange={(page: number) => setPage(page)}
      />
    </div>
  );
};

export default Tip;
