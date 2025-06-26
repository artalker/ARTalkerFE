import { Progress } from '@/common/CustomProgress';

const CompareAaverages = ({ data }: { data: any }) => {
  const userLevel = sessionStorage.getItem('level');
  return (
    <div>
      <p className='font-bold text-[10px] text-[#1F2024] mb-[3px] mt-[-20px]'>
        본인 평균 / 다른 Lv.{userLevel} 사용자 평균
      </p>
      {data?.map((item: any, index: number) => (
        <div
          key={index}
          className='flex justify-between items-center gap-[12px]'
        >
          <p className='text-[10px] text-[#1F2024]'>{item?.name}</p>
          <Progress
            value={item?.score}
            className='h-[6px] w-[182px]'
            standardValue={item?.average}
          />
          <p className='text-[10px] text-[#817E7E]'>
            <span className='text-[10px] font-bold text-[#6366F1]'>
              {item?.score}
            </span>
            / {item?.average}점
          </p>
        </div>
      ))}
    </div>
  );
};

export default CompareAaverages;
