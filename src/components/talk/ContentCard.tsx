import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from '@heroicons/react/24/solid';
import TalkLvLabel from '../../common/TalkLvLabel';
import { useState } from 'react';
import { FormattedTime } from '../../common/FormattedTime';

interface ContentCardProps {
  content: any;
  time: number;
  isExpanded: boolean;
  difficulty: number;
  setIsExpanded: (isExpanded: boolean) => void;
}

const ContentCard = ({
  content,
  time,
  isExpanded,
  difficulty,
  setIsExpanded,
}: ContentCardProps) => {
  const [isEnglish, setIsEnglish] = useState<boolean>(false); //* 번역

  return (
    <div
      className={`${
        isExpanded ? 'h-[356px]' : 'h-[120px]'
      } w-full absolute top-0 left-1/2 transform -translate-x-1/2 w-[374px] flex flex-col justify-center items-center border-[1px] border-[transparent] border-b-[#E5E5E5] bg-[#FFFFFF] mb-[6px] overflow-hidden`}
    >
      <div className='w-[374px] h-full'>
        {isExpanded ? (
          <div className='w-full h-full relative'>
            {content?.imageUrl && !content?.imageUrl.includes('example.com') ? (
              <img
                src={content?.imageUrl}
                alt={content?.title}
                className='w-full h-[200px] object-cover'
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '';
                  target.parentElement!.innerHTML = `
                  <div class="w-full h-full flex items-center justify-center bg-gray-200">
                    <span class="text-xs text-gray-500">이미지 없음</span>
                  </div>`;
                }}
              />
            ) : (
              <div className='w-full h-[200px] object-cover flex items-center justify-center bg-gray-200'>
                <span className='text-xs text-gray-500'>이미지 없음</span>
              </div>
            )}
            <div className='w-full p-4 flex flex-col'>
              <div className='flex justify-between'>
                <div>
                  <p className='text-[14px] font-semibold text-[#3D3D3D] line-clamp-1'>
                    {isEnglish ? content?.title_en : content?.title_ko}
                  </p>
                  <p className='text-[12px] text-[#ABABAB]'>
                    {content?.artist} - {content?.year}
                  </p>
                  <TalkLvLabel talkLv={difficulty} />
                </div>
                <p className='text-[#A855F7] font-semibold'>
                  {FormattedTime(time)}
                </p>
              </div>
              <p className='text-[10px] text-[#ABABAB] mt-[5px]'>
                {isEnglish ? content?.description_en : content?.description_ko}
              </p>
            </div>
            <div className='absolute bottom-[-13px] left-0 w-full h-[50px] flex justify-center items-center'>
              <button onClick={() => setIsExpanded(!isExpanded)}>
                <ChevronDoubleUpIcon className='w-[16px] h-[16px] font-Extrabold text-[#A855F7]' />
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
                {content?.imageUrl &&
                !content?.imageUrl.includes('example.com') ? (
                  <img
                    src={content?.imageUrl}
                    alt={content?.title}
                    className='w-[79px] h-[79px] object-cover rounded-[4px]'
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '';
                      target.parentElement!.innerHTML = `
                  <div class="w-[79px] h-[79px] flex items-center justify-center bg-gray-200">
                    <span class="text-xs text-gray-500">이미지 없음</span>
                  </div>`;
                    }}
                  />
                ) : (
                  <div className='w-[79px] h-[79px] object-cover flex items-center justify-center bg-gray-200'>
                    <span className='text-xs text-gray-500'>이미지 없음</span>
                  </div>
                )}
                <div className='flex h-[79px] justify-between items-start flex-col'>
                  <div>
                    <p className='text-[14px] font-semibold text-[#3D3D3D] line-clamp-1'>
                      {isEnglish ? content.title_en : content.title_ko}
                    </p>
                    <p className='text-[12px] text-[#ABABAB]'>{content.name}</p>
                    <TalkLvLabel talkLv={Number(content.level)} />
                    <p className='w-[280px] text-[10px] text-[#ABABAB] overflow-hidden whitespace-nowrap text-ellipsis'>
                      {isEnglish
                        ? content.description_en
                        : content.description_ko}
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
                {FormattedTime(time)}
              </p>
            </div>
            <button onClick={() => setIsExpanded(!isExpanded)}>
              <ChevronDoubleDownIcon className='w-[16px] h-[16px] font-Extrabold text-[#A855F7] absolute bottom-[0px] left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentCard;
