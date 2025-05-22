import { useState } from 'react';
import TalkInput from './TalkInput';
import TalkDataInfo from './TalkDataInfo';

interface TalkAiProps {
  isStart: boolean;
  setIsStart: (isStart: boolean) => void;
  isExpanded: boolean;
}

interface TalkUserData {
  message: string;
}

const TalkAi = ({ isStart, setIsStart, isExpanded }: TalkAiProps) => {
  const [talkUserData, setTalkUserData] = useState<TalkUserData[]>([]);

  return (
    <>
      {/* 대화 내용 */}
      <TalkDataInfo
        isExpanded={isExpanded}
        talkUserData={talkUserData}
        isStart={isStart}
      />
      {/* 대화 입력창 */}
      <TalkInput
        isStart={isStart}
        setIsStart={setIsStart}
        setTalkUserData={setTalkUserData}
      />
    </>
  );
};

export default TalkAi;
