import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from '@heroicons/react/24/solid';
import TalkLvLabel from '../../common/TalkLvLabel';
import { useState } from 'react';

interface ContentCardProps {
  content: any;
  time: number;
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
}

const ContentCard = ({
  content,
  time,
  isExpanded,
  setIsExpanded,
}: ContentCardProps) => {
  const [isEnglish, setIsEnglish] = useState<boolean>(false);
  // 시간을 분:초 형식으로 변환
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div
      className={`${
        isExpanded ? 'h-[356px]' : 'h-[120px]'
      } w-full absolute top-0 left-1/2 transform -translate-x-1/2 w-[374px] flex flex-col justify-center items-center border-[1px] border-[transparent] border-b-[#E5E5E5] bg-[#FFFFFF] mb-[6px] overflow-hidden`}
    >
      <div className='w-[374px] h-full'>
        {isExpanded ? (
          <div className='w-full h-full relative'>
            <img
              src={content.img}
              alt={content.title}
              className='w-full h-[200px] object-cover'
            />
            <div className='w-full p-4 flex flex-col'>
              <div className='flex justify-between'>
                <div>
                  <p className='text-[14px] font-semibold text-[#3D3D3D] line-clamp-1'>
                    {content.title}
                  </p>
                  <p className='text-[12px] text-[#ABABAB]'>{content.name}</p>
                  <TalkLvLabel talkLv={Number(content.level)} />
                </div>
                <p className='text-[#A855F7] font-semibold'> {formattedTime}</p>
              </div>
              <p className='text-[10px] text-[#ABABAB] mt-[5px]'>
                {content.content}
              </p>
            </div>
            <div className='absolute bottom-[-13px] left-0 w-full h-[50px] flex justify-center items-center'>
              <button onClick={() => setIsExpanded(!isExpanded)}>
                <ChevronDoubleUpIcon className='w-[14px] h-[14px] font-bold text-[#ABABAB]' />
              </button>
            </div>
            <span
              onClick={() => setIsEnglish(!isEnglish)}
              className='absolute bottom-[10px] right-[10px] text-[10px] text-[#759FFA] cursor-pointer'
            >
              번역
            </span>
          </div>
        ) : (
          <div className='w-full h-full relative'>
            <div className='w-[374px] h-full p-[6px] flex justify-between items-start gap-[12px]'>
              <div className='flex items-start gap-[12px]'>
                <img
                  src={content.img}
                  alt={content.title}
                  className='w-[79px] h-[79px] object-cover rounded-[4px]'
                />
                <div className='flex h-[79px] justify-between items-start flex-col'>
                  <div>
                    <p className='text-[14px] font-semibold text-[#3D3D3D] line-clamp-1'>
                      {content.title}
                    </p>
                    <p className='text-[12px] text-[#ABABAB]'>{content.name}</p>
                    <TalkLvLabel talkLv={Number(content.level)} />
                    <p className='w-[280px] text-[10px] text-[#ABABAB] overflow-hidden whitespace-nowrap text-ellipsis'>
                      {isEnglish ? content.desc : content.content}
                    </p>
                  </div>
                  <span
                    onClick={() => setIsEnglish(!isEnglish)}
                    className='text-[10px] text-[#759FFA] cursor-pointer'
                  >
                    번역
                  </span>
                </div>
              </div>
              <p className='text-[#A855F7] font-semibold cursor-pointer'>
                {formattedTime}
              </p>
            </div>
            <button onClick={() => setIsExpanded(!isExpanded)}>
              <ChevronDoubleDownIcon className='w-[14px] h-[14px] font-bold text-[#ABABAB] absolute bottom-[0px] left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentCard;
