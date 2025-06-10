import { useState } from 'react';
import TalkInput from './TalkInput';
import TalkDataInfo from './TalkDataInfo';

interface TalkAiProps {
  isStart: boolean;
  setIsStart: (isStart: boolean) => void;
  isExpanded: boolean;
  isEnd: boolean;
  // conversationId: string | number;
}

interface TalkUserData {
  message: string;
}

const TalkAi = ({
  isStart,
  setIsStart,
  isExpanded,
  isEnd,
}: // conversationId,
TalkAiProps) => {
  const [talkUserData, setTalkUserData] = useState<TalkUserData[]>([]);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  return (
    <>
      {/* 대화 내용 */}
      <TalkDataInfo
        isExpanded={isExpanded}
        talkUserData={talkUserData}
        isStart={isStart}
        isEnd={isEnd}
        isResultLoading={true}
      />
      {/* 대화 입력창 */}
      <TalkInput
        isStart={isStart}
        setIsStart={setIsStart}
        setTalkUserData={setTalkUserData}
        isEnd={isEnd}
        isAiLoading={isAiLoading}
        setIsAiLoading={setIsAiLoading}
      />
    </>
  );
};

export default TalkAi;
