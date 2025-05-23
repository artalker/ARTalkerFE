import { FormattedTime } from '../../common/FormattedTime';

interface TalkEndButtonProps {
  time: number;
  isEnd: boolean;
  setIsEnd: React.Dispatch<React.SetStateAction<boolean>>;
}

const TalkEndButton = ({ time, isEnd, setIsEnd }: TalkEndButtonProps) => {
  return (
    <div className='absolute bottom-[70px] right-[10px] flex flex-col items-center text-[#817E7E] text-[12px]'>
      <p>{FormattedTime(time)}</p>
      <button
        className={`w-[32px] h-[32px] rounded-[50%]  text-[#FFFFFF] text-[10px] leading-[10px] font-semibold hover:bg-[#6366F1] ${
          isEnd ? 'bg-[#6366F1]' : 'bg-[#D8D8D8]'
        }`}
        onClick={() => setIsEnd(true)}
      >
        대화
        <br />
        종료
      </button>
    </div>
  );
};

export default TalkEndButton;
