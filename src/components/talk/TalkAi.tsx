import { useEffect, useRef, useState } from 'react';
import TalkInput from './TalkInput';
import TalkDataInfo from './TalkDataInfo';
import { usePostAIMessageData } from '@/api/useTalk';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAtom } from 'jotai';
import { isEndAtom, isStartAtom, timeAtom } from '@/hook/atom/talkAtom';
import { useLocation } from 'react-router-dom';

interface TalkAiProps {
  isExpanded: boolean;
  handleCreateConversation: () => void;
  talkResultData: any;
  refetchTalkResultData: () => void;
  talkMessageData: any;
  refetchTalkMessageData: () => void;
  isLoadingTalkMessageData: boolean;
}

const TalkAi = ({
  isExpanded,
  handleCreateConversation,
  talkResultData,
  refetchTalkResultData,
  talkMessageData,
  refetchTalkMessageData,
  isLoadingTalkMessageData,
}: TalkAiProps) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const conversationId = searchParams.get('conversationId') || null;

  const scrollContainerRef = useRef<HTMLDivElement>(null); //* 대화창 스크롤
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false); //* AI 로딩
  const [isErrModalOpen, setIsErrModalOpen] = useState<boolean>(false); //* error 모달
  const [aiMessageData, setAiMessageData] = useState<
    Array<{ aiMessage: string; time?: string }>
  >([]); //* AI 메시지

  const [isEnd, setIsEnd] = useAtom<boolean>(isEndAtom);

  const [isStart, setIsStart] = useAtom<boolean>(isStartAtom); //* 대화시작

  const [, setTime] = useAtom<number>(timeAtom);

  const { mutate: postAIMessageData } = usePostAIMessageData(); //* AI 메시지 시작 시  post

  //* AI 메시지 시작
  const handleStartAIMessageData = () => {
    if (!conversationId) return;
    postAIMessageData(conversationId, {
      onSuccess: (res) => {
        setAiMessageData((prev) => [
          ...prev,
          {
            aiMessage: res?.content || '응답을 받아오지 못했습니다.',
            time: res?.timestamp || new Date().toISOString(),
            responseId: res?.responseId,
          },
        ]);
        setIsAiLoading(false);
        refetchTalkMessageData();
      },
      onError: () => {
        setIsAiLoading(false);
        setIsErrModalOpen(true);
        setIsStart(false);
        setTime(300);
      },
    });
  };

  useEffect(() => {
    if (talkResultData?.result?.id) {
      setIsEnd(true);
    }
  }, [talkResultData]);

  useEffect(() => {
    if (isStart && conversationId) {
      handleStartAIMessageData();
    }
  }, [isStart, conversationId]);

  return (
    <>
      {/* 대화 내용 */}
      <TalkDataInfo
        isExpanded={isExpanded}
        setIsAiLoading={setIsAiLoading}
        scrollContainerRef={scrollContainerRef}
        handleStartAIMessageData={handleStartAIMessageData}
        talkMessageData={talkMessageData}
        // refetchTalkMessageData={refetchTalkMessageData}
        talkResultData={talkResultData}
        refetchTalkResultData={refetchTalkResultData}
        isLoadingTalkMessageData={isLoadingTalkMessageData}
      />

      {/* 대화 입력창 */}
      <TalkInput
        isEnd={isEnd}
        isAiLoading={isAiLoading}
        setIsAiLoading={setIsAiLoading}
        // handleStartAIMessageData={handleStartAIMessageData}
        setAiMessageData={setAiMessageData}
        aiMessageData={aiMessageData}
        refetchTalkMessageData={refetchTalkMessageData}
        handleCreateConversation={handleCreateConversation}
      />
      {/* error 모달 */}
      <Dialog open={isErrModalOpen} onOpenChange={setIsErrModalOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>error</DialogTitle>
            <DialogDescription>잠시 후 다시 시도바랍니다.</DialogDescription>
          </DialogHeader>
          <DialogFooter className='sm:justify-between'>
            <Button
              variant='outline'
              onClick={() => setIsErrModalOpen(false)}
              className='w-full'
            >
              닫기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TalkAi;
