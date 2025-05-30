import { useNavigate } from 'react-router-dom';

const LearningTip = () => {
  const navigate = useNavigate();

  return (
    <section className='mt-[25px] mb-[30px]'>
      <div
        onClick={() => {
          navigate('/tip');
        }}
        className='w-[335px] min-h-[142px] bg-gradient-to-r from-[#4B6FBF]/10 to-[#A857F7]/10 rounded-lg p-4'
      >
        <h2 className='text-[16px] font-semibold mb-2 text-[#4B6FBF]'>
          오늘의 학습 TIP!
        </h2>
        <p className='text-[12px] text-[#3D3D3D]'>
          작품을 설명할 때는 단순히 보이는 것을 묘사하는 것보다 작품에서
          느껴지는 감정과 분위기를 표현해보세요. 'I think', 'In my opinion' 대신
          'This artwork evokes...' 또는 'The artist conveys...'와 같은 표현을
          사용해보세요.
        </p>
        <div className='mt-3 flex justify-end'>
          <button className='text-[12px] text-[#6366F1] font-medium flex items-center'>
            <span>더 많은 TIP보러가기 {'>'}</span>
            <i className='ri-arrow-right-s-line ml-1'></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LearningTip;
