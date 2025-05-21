const CompletedTalk = ({ data }: { data: any }) => {
  return (
    <div>
      {data[0]?.items.map((item: any, index: number) => (
        <div
          key={index}
          className='w-[335px] h-[199px] flex flex-col justify-start items-start border-[1px] border-[#E5E5E5] bg-[#FFFFFF] rounded-lg mb-[6px] overflow-hidden'
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default CompletedTalk;
