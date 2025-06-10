import { useRef, useEffect } from 'react';
import Loading from '../../assets/Loading.gif';
import AIMessage from './AiMessage';
import UserMessage from './UserMessage';
// import { usePostAIMessageData } from '@/api/useTalk';

interface TalkDataInfoProps {
  isExpanded: boolean;
  talkUserData: any[];
  isStart: boolean;
  isEnd: boolean;
  isResultLoading: boolean;
}

const TalkDataInfo = ({
  isExpanded,
  talkUserData,
  isStart,
  isEnd,
  isResultLoading,
}: TalkDataInfoProps) => {
  // const { mutate: postAIMessageData } = usePostAIMessageData();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const aiMessageData = [
    { aiMessage: 'How many people can you see in this painting?' },
  ];

  // AI와 사용자 메시지를 번갈아가며 합치기, 데이터작업 완료 후 제거
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

  // 메시지가 변경될 때마다 스크롤을 마지막으로 이동
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [talkUserData]);

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
          className='overflow-y-auto h-full px-[21px] py-[18px] scrollbar-hide'
          ref={scrollContainerRef}
        >
          {(isStart || isEnd) &&
            combinedMessages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === 'ai' ? 'justify-start' : 'justify-end'
                } mb-4`}
              >
                {message.type === 'ai' ? (
                  <AIMessage message={message.message} />
                ) : (
                  <UserMessage message={message.message} />
                )}
              </div>
            ))}
          {/*대화종료 시*/}
          {isEnd && (
            <div className='flex justify-center items-center w-full h-[36px] p-[8px] bg-[#FFFFFF] border-[1px] border-[#ABAFBA] rounded-[4px]'>
              {combinedMessages.length < 6 ? (
                <div className='w-full flex justify-between items-center '>
                  <p className='text-[10px]'>
                    대화양이 부족하여 대화분석이 불가합니다. 다시 시도해주세요.
                  </p>
                  <button className='bg-[#A855F7] text-[#FFFFFF] text-[10px] leading-[10px] font-semibold p-[8px] rounded-[4px]'>
                    다시하기
                  </button>
                </div>
              ) : isResultLoading && combinedMessages.length > 6 ? (
                <div className='w-full flex justify-between items-center '>
                  <p className='text-[10px]'>
                    대화가 종료되었습니다. AI가 결과를 분석 중입니다.
                  </p>
                  <img
                    src={Loading}
                    alt='loading'
                    className='w-[30px] h-[30px]'
                  />
                </div>
              ) : (
                <div className='w-full flex justify-between items-center '>
                  <p className='text-[10px]'>
                    대화가 종료되었습니다. AI가 분석한 대화 분석결과가
                    나왔습니다.
                  </p>
                  <button className='bg-[#A855F7] text-[#FFFFFF] text-[10px] leading-[10px] font-semibold p-[8px] rounded-[4px]'>
                    결과보기
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TalkDataInfo;
