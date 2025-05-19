const TalkLvLabel = ({ talkLv }: { talkLv: number }) => {
  return (
    <div
      className={`w-[30px] h-[12px] rounded-[10px] flex justify-center items-center text-[8px] leading-[100%] font-normal text-[#ffffff]
${
  talkLv === 1
    ? 'bg-[#FEB0B3]'
    : talkLv === 2
    ? 'bg-[#F3A4BA]'
    : talkLv === 3
    ? 'bg-[#E292C8]'
    : talkLv === 4
    ? 'bg-[#C372E2]'
    : talkLv === 5
    ? 'bg-[#AB58F5]'
    : null
}
`}
    >
      Lv.{talkLv}
    </div>
  );
};

export default TalkLvLabel;
