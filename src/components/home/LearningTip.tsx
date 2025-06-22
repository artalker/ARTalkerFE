import { useTodayTipData } from '@/api/useTips';
import { useNavigate } from 'react-router-dom';

const LearningTip = () => {
  const navigate = useNavigate();
  const { data } = useTodayTipData();
  return (
    <section className='mt-[25px] mb-[30px]'>
      <div className='w-[335px] min-h-[142px] bg-gradient-to-r from-[#4B6FBF]/10 to-[#A857F7]/10 rounded-lg p-4 '>
        <h2 className='text-[16px] font-semibold mb-2 text-[#4B6FBF]'>
          오늘의 학습 TIP!
        </h2>
        <p className='text-[12px] text-[#3D3D3D] min-h-[48px]'>
          {data?.[0].content}
        </p>
        <div className='mt-3 flex justify-end'>
          <button
            onClick={() => {
              navigate('/tip');
            }}
            className='text-[12px] text-[#6366F1] font-medium flex items-center cursor-pointer'
          >
            <span>더 많은 TIP보러가기 {'>'}</span>
            <i className='ri-arrow-right-s-line ml-1'></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LearningTip;
