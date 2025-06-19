import { useEffect } from 'react';
import AIMessage from './AiMessage';
import UserMessage from './UserMessage';
import { usePatchEndConversation } from '@/api/useTalk';

interface TalkDataInfoProps {
  isExpanded: boolean;
  isStart: boolean;
  isEnd: boolean;
  setIsAiLoading: React.Dispatch<React.SetStateAction<boolean>>;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  handleStartAIMessageData: () => void;
  setIsResultModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  talkMessageData: any[];
  conversationId: string | number;
}

const TalkDataInfo = ({
  isExpanded,
  isStart,
  isEnd,
  setIsAiLoading,
  scrollContainerRef,
  handleStartAIMessageData,
  setIsResultModalOpen,
  talkMessageData,
  conversationId,
}: TalkDataInfoProps) => {
  //* 대화 종료 시 conversatioId post요청
  const { mutate: userTalkEndMutate } = usePatchEndConversation();

  const handleEndConversation = () => {
    if (!conversationId) return;
    userTalkEndMutate(conversationId, {
      onSuccess: () => {
        setIsResultModalOpen(true);
      },
      onError: () => {
        alert('대화 종료에 실패했습니다.');
      },
    });
  };

  //* 대화창 스크롤 항상 마지막으로 설정
  useEffect(() => {
    if (scrollContainerRef.current || isEnd) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [talkMessageData, isEnd]);

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
            talkMessageData?.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === 'assistant'
                    ? 'justify-start'
                    : 'justify-end'
                } mb-4`}
              >
                {message.sender === 'assistant' ? (
                  <AIMessage
                    message={message}
                    setIsAiLoading={setIsAiLoading}
                  />
                ) : (
                  <UserMessage message={message} />
                )}
              </div>
            ))}
          {/*대화종료 시*/}
          {isEnd && (
            <div className='flex justify-center items-center w-full h-[36px] p-[8px] bg-[#FFFFFF] border-[1px] border-[#ABAFBA] rounded-[4px]'>
              {talkMessageData?.length < 6 ? (
                <div className='w-full flex justify-between items-center '>
                  <p className='text-[10px]'>
                    대화양이 부족하여 대화분석이 불가합니다. 다시 시도해주세요.
                  </p>
                  <button
                    onClick={() => {
                      handleStartAIMessageData();
                      setIsAiLoading(true);
                    }}
                    className='bg-[#A855F7] text-[#FFFFFF] text-[10px] leading-[10px] font-semibold p-[8px] rounded-[4px]'
                  >
                    다시하기
                  </button>
                </div>
              ) : (
                <div className='w-full flex justify-between items-center '>
                  <p className='text-[10px]'>
                    대화가 종료되었습니다. AI가 분석한 대화 분석결과가
                    나왔습니다.
                  </p>
                  <button
                    onClick={() => handleEndConversation()}
                    className='bg-[#A855F7] text-[#FFFFFF] text-[10px] leading-[10px] font-semibold p-[8px] rounded-[4px]'
                  >
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
