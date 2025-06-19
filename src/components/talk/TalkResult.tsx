import { useEffect } from 'react';
import { useTalkResultData } from '@/api/useTalk';

const TalkResult = ({
  conversationId,
}: {
  conversationId: string | number;
}) => {
  const { data: talkResultData } = useTalkResultData(conversationId);

  useEffect(() => {
    console.log(talkResultData);
  }, [talkResultData]);

  return (
    <div>
      <h2>결과보기</h2>
    </div>
  );
};

export default TalkResult;
