import React, { useRef, useEffect } from 'react';

const userMessageStyle =
  'bg-[#E5E5E5] text-[#000000] rounded-[12px] px-[16px] py-[8px] max-w-[70%]';
const aiMessageStyle =
  'bg-[#6366F1] text-[#FFFFFF] rounded-[12px] px-[16px] py-[8px] max-w-[70%]';

interface TalkDataInfoProps {
  isExpanded: boolean;
  talkUserData: any[];
  isStart: boolean;
}

const TalkDataInfo = ({
  isExpanded,
  talkUserData,
  isStart,
}: TalkDataInfoProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 메시지가 변경될 때마다 스크롤을 마지막으로 이동
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [talkUserData]);

  const aiMessageData = [{ aiMessage: 'hello' }];

  // AI와 사용자 메시지를 번갈아가며 합치기
  const combinedMessages = [];
  const maxLength = Math.max(talkUserData.length, aiMessageData.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < aiMessageData.length) {
      combinedMessages.push({
        type: 'ai',
        message: aiMessageData[i].aiMessage,
        index: i,
      });
    }
    if (i < talkUserData.length) {
      combinedMessages.push({
        type: 'user',
        message: talkUserData[i].message,
        index: i,
      });
    }
  }

  return (
    <div
      className={`absolute left-0 max-w-[667px] w-full bottom-[58px]  ${
        isExpanded
          ? 'top-[356px] h-[calc(100vh - 414px)]'
          : 'top-[120px] h-[calc(100% - 178px)]'
      }`}
    >
      <div className='relative w-full h-full'>
        <div
          className='overflow-y-auto h-full px-4 py-2 scrollbar-hide'
          ref={scrollContainerRef}
        >
          {isStart &&
            combinedMessages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === 'ai' ? 'justify-start' : 'justify-end'
                } mb-4`}
              >
                <div
                  className={`${
                    message.type === 'ai' ? aiMessageStyle : userMessageStyle
                  } ${index === 0 ? 'mt-4' : ''}`}
                >
                  {message.message}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TalkDataInfo;
