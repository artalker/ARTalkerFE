import { useEffect } from 'react';
import AIMessage from './AiMessage';
import UserMessage from './UserMessage';
import { usePatchEndConversation } from '@/api/useTalk';
import {
  isCompletedAtom,
  isEndAtom,
  isResultModalOpenAtom,
  isStartAtom,
} from '@/hook/atom/talkAtom';
import { useAtom } from 'jotai';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import TalkResult from './TalkResult';
import Loading from '@/assets/Loading.gif';

interface TalkDataInfoProps {
  isExpanded: boolean;
  setIsAiLoading: React.Dispatch<React.SetStateAction<boolean>>;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  handleStartAIMessageData: () => void;
  talkMessageData: any[];
  talkResultData: any;
  refetchTalkResultData: () => void;
  isLoadingTalkMessageData: boolean;
}

const TalkDataInfo = ({
  isExpanded,
  setIsAiLoading,
  scrollContainerRef,
  handleStartAIMessageData,
  talkMessageData,
  talkResultData,
  refetchTalkResultData,
  isLoadingTalkMessageData,
}: TalkDataInfoProps) => {
  const { mutate: userTalkEndMutate } = usePatchEndConversation();
  const [isResultModalOpen, setIsResultModalOpen] = useAtom<boolean>(
    isResultModalOpenAtom
  );

  const [isEnd] = useAtom<boolean>(isEndAtom);
  const [isCompleted] = useAtom<boolean>(isCompletedAtom);
  const [, setIsStart] = useAtom<boolean>(isStartAtom); //* 대화시작

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(location.search);
  const conversationId = Number(searchParams.get('conversationId'));

  //* 대화종료 시
  const handleEndConversation = () => {
    if (!conversationId) return;
    if (talkResultData?.result?.id) {
      setIsResultModalOpen(true);
    } else if (!talkResultData?.result?.id) {
      userTalkEndMutate(conversationId, {
        onSuccess: () => {
          setIsResultModalOpen(true);
          setIsStart(false);
        },
        onError: () => {
          alert('대화 종료에 실패했습니다.');
        },
      });
    }
  };

  //* 대화창 스크롤 항상 마지막으로 설정
  useEffect(() => {
    if (scrollContainerRef.current || isEnd) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [talkMessageData, isEnd]);

  return (
    <>
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
            {isLoadingTalkMessageData ? (
              <div className='w-full h-[300px] flex flex-col justify-center items-center'>
                <img
                  src={Loading}
                  alt='loading'
                  className='w-[50px] h-[50px]'
                />
              </div>
            ) : talkMessageData?.length > 0 ? (
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
              ))
            ) : (
              <div className='w-full h-full flex justify-center items-center gap-[6px]'>
                <span className='text-[12px] text-[#ffffff] bg-[#4B6FBF] px-[6px] py-[3px] rounded-[4px]'>
                  중요
                </span>
                <p className='text-[12px] text-[#ABABAB]'>
                  대화는{' '}
                  <span className='text-[#A855F7] font-semibold'>3회 이상</span>{' '}
                  되어야 결과 분석 및 저장이 가능합니다.
                </p>
              </div>
            )}
            {/*대화종료 시*/}
            {(isEnd || isCompleted) && (
              <div className='flex justify-center items-center w-full h-[36px] p-[8px] bg-[#FFFFFF] border-[1px] border-[#ABAFBA] rounded-[4px]'>
                {talkMessageData?.length < 6 ? (
                  <div className='w-full flex justify-between items-center '>
                    <p className='text-[10px]'>
                      대화양이 부족하여 대화분석이 불가합니다. 다시
                      시도해주세요.
                    </p>
                    <button
                      onClick={() => {
                        const newSearchParams = new URLSearchParams(
                          searchParams
                        );
                        newSearchParams.delete('conversationId');
                        setSearchParams(newSearchParams);
                        handleStartAIMessageData();
                        setIsAiLoading(true);
                        setIsStart(true);
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
                      onClick={() => {
                        refetchTalkResultData();
                        handleEndConversation();
                      }}
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
      <Dialog open={isResultModalOpen} onOpenChange={setIsResultModalOpen}>
        <DialogContent className='flex justify-center items-start w-[335px] bg-[#F9FAFB] h-[667px] overflow-y-auto scrollbar-hide overflow-x-hidden'>
          <DialogTitle className='sr-only'>대화 분석 결과</DialogTitle>
          <TalkResult
            setIsResultModalOpen={setIsResultModalOpen}
            handleStartAIMessageData={handleStartAIMessageData}
            setIsAiLoading={setIsAiLoading}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TalkDataInfo;
