import { useEffect, useRef, useState } from 'react';
import { usePostTalkResultData } from '@/api/useTalk';
import ResultBarChart from '@/common/ResultBarChart';
import Loading from '@/assets/Loading.gif';
import { useCapture } from '@/hook/useCapture';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import {
  isCompletedAtom,
  isEndAtom,
  isStartAtom,
  timeAtom,
} from '@/hook/atom/talkAtom';

interface TalkResultProps {
  setIsResultModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleStartAIMessageData: () => void;
  setIsAiLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const TalkResult = ({
  setIsResultModalOpen,
}: // handleStartAIMessageData,
// setIsAiLoading,
TalkResultProps) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(location.search);
  const conversationId = Number(searchParams.get('conversationId'));

  const [, setIsEnd] = useAtom<boolean>(isEndAtom);
  const [, setIsCompleted] = useAtom<boolean>(isCompletedAtom);
  const [, setTime] = useAtom<number>(timeAtom);
  const [, setIsStart] = useAtom<boolean>(isStartAtom);

  const [resultData, setResultData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { mutate: postTalkResultData } = usePostTalkResultData();
  const captureRef = useRef<HTMLDivElement>(null);

  const { captureAndDownload } = useCapture(captureRef);

  const [vocaChartData, setVocaChartData] = useState([
    { name: '초급', score: 0, fill: '#D8D8D8', rate: 0 },
    { name: '중급', score: 0, fill: '#AEB0F6', rate: 0 },
    { name: '고급', score: 0, fill: '#6366F1', rate: 0 },
  ]);

  const [accuracyChartData, setAccuracyChartData] = useState([
    { name: '낮음', score: 15, fill: '#D8D8D8', rate: 15 },
    { name: '보통', score: 40, fill: '#AEB0F6', rate: 40 },
    { name: '높음', score: 30, fill: '#6366F1', rate: 30 },
  ]);

  const [expressionChartData, setExpressionChartData] = useState([
    { name: '단순함', score: 15, fill: '#D8D8D8', rate: 15 },
    { name: '다양함', score: 40, fill: '#AEB0F6', rate: 40 },
    { name: '창의적', score: 30, fill: '#6366F1', rate: 30 },
  ]);

  useEffect(() => {
    if (!conversationId) return;
    postTalkResultData(
      { conversationId },
      {
        onSuccess: (res) => {
          setVocaChartData([
            {
              name: '초급',
              score: (res?.conversationRating?.vocabBeginnerCount || 0) * 100,
              fill: '#D8D8D8',
              rate: res?.conversationRating?.vocabBeginnerRatio || 0,
            },
            {
              name: '중급',
              score:
                (res?.conversationRating?.vocabIntermediateCount || 0) * 100,
              fill: '#AEB0F6',
              rate: res?.conversationRating?.vocabIntermediateRatio || 0,
            },
            {
              name: '고급',
              score: (res?.conversationRating?.vocabAdvancedCount || 0) * 100,
              fill: '#6366F1',
              rate: res?.conversationRating?.vocabAdvancedRatio || 0,
            },
          ]);

          setAccuracyChartData([
            {
              name: '낮음',
              score:
                (res?.conversationRating?.sentenceAccuracyLowCount || 0) * 100,
              fill: '#D8D8D8',
              rate: res?.conversationRating?.sentenceAccuracyLowRatio || 0,
            },
            {
              name: '보통',
              score:
                (res?.conversationRating?.sentenceAccuracyMediumCount || 0) *
                100,
              fill: '#AEB0F6',
              rate: res?.conversationRating?.sentenceAccuracyMediumRatio || 0,
            },
            {
              name: '높음',
              score:
                (res?.conversationRating?.sentenceAccuracyHighCount || 0) * 100,
              fill: '#6366F1',
              rate: res?.conversationRating?.sentenceAccuracyHighRatio || 0,
            },
          ]);
          setExpressionChartData([
            {
              name: '단순함',
              score: (res?.conversationRating?.expressBeginnerCount || 0) * 100,
              fill: '#D8D8D8',
              rate: res?.conversationRating?.expressBeginnerRatio || 0,
            },
            {
              name: '다양함',
              score:
                (res?.conversationRating?.expressIntermediateCount || 0) * 100,
              fill: '#AEB0F6',
              rate: res?.conversationRating?.expressIntermediateRatio || 0,
            },
            {
              name: '창의적',
              score: (res?.conversationRating?.expressAdvancedCount || 0) * 100,
              fill: '#6366F1',
              rate: res?.conversationRating?.expressAdvancedRatio || 0,
            },
          ]);
          setResultData(res?.conversationFeedback);
          setIsLoading(false);
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  }, [conversationId]);

  return (
    <div>
      <h2 className='text-[16px] font-semibold ml-[8px] text-[#4B6FBF] text-left'>
        결과보기
      </h2>

      <div className='w-[320px] mt-[-16px]'>
        {isLoading ? (
          <div className='w-full h-[450px] flex flex-col justify-center items-center'>
            <img src={Loading} alt='loading' className='w-[50px] h-[50px]' />
          </div>
        ) : (
          <>
            <div ref={captureRef}>
              <ResultBarChart data={vocaChartData} title='어휘능력' />
              <ResultBarChart data={accuracyChartData} title='정확도' />
              <ResultBarChart data={expressionChartData} title='표현력' />
              <section className='mt-[25px] mb-[30px]'>
                <div className='w-[320px] min-h-[142px] bg-gradient-to-r from-[#4B6FBF]/10 to-[#A857F7]/10 rounded-lg p-4'>
                  <h2 className='text-[16px] font-semibold mb-2 text-[#4B6FBF]'>
                    다음엔 이렇게 표현해보세요!
                  </h2>
                  <div className='flex flex-col mb-[8px]'>
                    <p className='text-[12px] text-[#3D3D3D]'>수정 전:</p>
                    <p className='text-[12px] text-[#3D3D3D]'>
                      {resultData?.originalText}
                    </p>
                  </div>
                  <div className='flex flex-col mb-[8px]'>
                    <p className='text-[12px] text-[#3D3D3D]'>수정 후:</p>
                    <p
                      className='text-[12px] text-[#3D3D3D]'
                      dangerouslySetInnerHTML={{
                        __html: resultData?.revisedText || '',
                      }}
                    />
                  </div>
                  <div className='flex flex-col'>
                    <p className='text-[12px] text-[#3D3D3D]'>설명:</p>
                    <p className='text-[12px] text-[#3D3D3D]'>
                      {resultData?.explanation}
                    </p>
                  </div>
                </div>
              </section>
            </div>
            <div className='flex w-full justify-center gap-[12px]'>
              <button
                className='w-[149px] h-[53px] bg-[#4B6FBF] text-[#FFFFFF] text-[14px] font-extrabold p-[8px] rounded-[4px] border-[1px] border-[#4B6FBF]'
                onClick={() => {
                  // 쿼리스트링 초기화
                  const newSearchParams = new URLSearchParams(searchParams);
                  newSearchParams.delete('conversationId');
                  setSearchParams(newSearchParams);

                  // 대화 완료 상태 초기화
                  setTime(300);
                  setIsCompleted(false);
                  setIsEnd(false);

                  // 대화 상태 초기화
                  setIsStart(false);

                  // 대화 초기화
                  // handleStartAIMessageData();
                  // setIsAiLoading(true);
                  setIsResultModalOpen(false);
                }}
              >
                다시하기
              </button>
              <button
                className='w-[149px] h-[53px] bg-[#FFFFFF] text-[#4B6FBF] text-[14px] font-extrabold p-[8px] rounded-[4px] border-[1px] border-[#4B6FBF]'
                onClick={() => captureAndDownload()}
              >
                공유하기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TalkResult;
