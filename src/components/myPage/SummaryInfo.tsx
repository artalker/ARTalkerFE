const SummaryInfo = () => {
  return (
    <div className='w-full flex flex-col justify-start items-start bg-[#FFFFFF] border-[1px] border-[#EBEBEB] rounded-[16px] p-[26px] '>
      <h2 className='text-[12px] font-medium mb-[15px]'>총 학습통계</h2>
      <div className='w-full grid grid-cols-2 gap-[12px]'>
        <div className='total-evaluation-box'>
          <p className='text-[12px] text-[#817E7E] font-medium'>총 학습시간</p>
          <p className='text-[18px] font-extrabold text-right w-full'>
            12 시간
          </p>
        </div>
        <div className='total-evaluation-box'>
          <p className='text-[12px] text-[#817E7E] font-medium'>완료된 토론</p>
          <p className='text-[18px] font-extrabold text-right w-full'>12 회</p>
        </div>
        <div className='total-evaluation-box'>
          <p className='text-[12px] text-[#817E7E] font-medium text-left w-full'>
            학습한 주제
          </p>
          <p className='text-[18px] font-extrabold text-right w-full'>12 개</p>
        </div>
        <div className='total-evaluation-box w-full'>
          <p className='text-[12px] text-[#817E7E] font-medium text-left w-full'>
            연속 학습일
          </p>
          <p className='text-[18px] font-extrabold text-right w-full'>21 일</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryInfo;
