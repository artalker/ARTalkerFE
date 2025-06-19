import { useEffect, useState } from 'react';
import { usePostTalkResultData } from '@/api/useTalk';

const TalkResult = ({
  conversationId,
}: {
  conversationId: string | number;
}) => {
  const [resultData, setResultData] = useState<any>(null);
  const { mutate: postTalkResultData } = usePostTalkResultData();

  const chartData = [
    { name: '낮음', score: 15, fill: '#D8D8D8', rate: 15 },
    { name: '보통', score: 40, fill: '#AEB0F6', rate: 40 },
    { name: '높음', score: 30, fill: '#6366F1', rate: 30 },
  ];

  useEffect(() => {
    postTalkResultData(
      { conversationId },
      {
        onSuccess: (res) => {
          setResultData(res);
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  }, [conversationId]);

  return (
    <div>
      <h2>결과보기</h2>
      <p>{resultData?.score}</p>
    </div>
  );
};

export default TalkResult;
