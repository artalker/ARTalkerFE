import TalkLvLabel from '../../common/TalkLvLabel';

const TalkListItems = ({ data }: { data: any }) => {
  return (
    <div className='w-[335px] grid grid-cols-2 gap-[6px] mt-[45px]'>
      {data[0]?.items.map((item: any, index: number) => (
        <div
          key={index}
          className='w-[160px] h-[199px] flex flex-col justify-start items-start border-[1px] border-[#E5E5E5] bg-[#FFFFFF] rounded-lg mb-[6px] overflow-hidden'
        >
          <div className='w-full h-[93px] min-h-[93px] rounded-r-[8px] rounded-l-[8px] rounded-b-none overflow-hidden'>
            <img
              src={item.img}
              alt={item.title}
              className='w-[160px] h-[93px] object-cover'
            />
          </div>
          <div className='py-[8px] px-[12px]'>
            <p className='text-[14px] font-semibold text-[#3D3D3D]'>
              {item.title}
            </p>
            <p className='text-[10px] text-[#ABABAB]'>
              {item.name} - {item.year}
            </p>
            <TalkLvLabel talkLv={Number(item.level)} />
            <p className='w-[140px] text-[10px] text-[#ABABAB] mt-[3px] leading-[12px] overflow-hidden text-ellipsis line-clamp-3'>
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TalkListItems;
