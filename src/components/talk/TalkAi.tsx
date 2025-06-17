import { useRef, useState } from 'react';
import TalkInput from './TalkInput';
import TalkDataInfo from './TalkDataInfo';
import { usePostAIMessageData, useTalkMessageData } from '@/api/useTalk';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import TalkResult from './TalkResult';

interface TalkAiProps {
  isStart: boolean;
  setIsStart: (isStart: boolean) => void;
  isExpanded: boolean;
  isEnd: boolean;
  conversationId: string | number;
}

const TalkAi = ({
  isStart,
  setIsStart,
  isExpanded,
  isEnd,
  conversationId,
}: TalkAiProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [isErrModalOpen, setIsErrModalOpen] = useState<boolean>(false);
  const [aiMessageData, setAiMessageData] = useState<
    Array<{ aiMessage: string; time?: string }>
  >([]);

  const [isResultModalOpen, setIsResultModalOpen] = useState<boolean>(false);

  const { mutate: postAIMessageData } = usePostAIMessageData();
  const { data: talkMessageData, refetch: refetchTalkMessageData } =
    useTalkMessageData(conversationId);

  const handleStartAIMessageData = () => {
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
      onError: (err) => {
        console.error('AI 메시지 로딩 중 오류 발생:', err);
        setIsAiLoading(false);
        setIsErrModalOpen(true);
        setIsStart(false);
      },
    });
  };

  return (
    <>
      {/* 대화 내용 */}
      <TalkDataInfo
        isExpanded={isExpanded}
        isStart={isStart}
        isEnd={isEnd}
        setIsAiLoading={setIsAiLoading}
        scrollContainerRef={scrollContainerRef}
        handleStartAIMessageData={handleStartAIMessageData}
        setIsResultModalOpen={setIsResultModalOpen}
        talkMessageData={talkMessageData}
      />

      {/* 대화 입력창 */}
      <TalkInput
        isStart={isStart}
        isEnd={isEnd}
        isAiLoading={isAiLoading}
        setIsAiLoading={setIsAiLoading}
        handleStartAIMessageData={handleStartAIMessageData}
        conversationId={conversationId}
        setAiMessageData={setAiMessageData}
        aiMessageData={aiMessageData}
        refetchTalkMessageData={refetchTalkMessageData}
        setIsStart={setIsStart}
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
      {/* 결과 모달 */}
      <Dialog open={isResultModalOpen} onOpenChange={setIsResultModalOpen}>
        <DialogContent className='sm:max-w-[552px] max-h-[667px] bg-[#F9FAFB]'>
          <TalkResult />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TalkAi;
