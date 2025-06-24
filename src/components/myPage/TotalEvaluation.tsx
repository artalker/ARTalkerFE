import EduBarChart from './EduBarChart';
import LearningCompletionGraph from './ LearningCompletionGraph';
import VocabularyChart from './ VocabularyChart';
import StudyPeriod from './StudyPeriod';
import SummaryInfo from './SummaryInfo';
import TotalEvaluationChart from './TotalEvaluationChart';
import { useUserLearningEvaluationData } from '@/api/useResult';
import { useAtom } from 'jotai';
import { dateAtom, periodAtom } from '@/hook/atom/eduAtom';
import Loading from '@/assets/Loading.gif';
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const TotalEvaluation = () => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('id');
  const [period] = useAtom(periodAtom);
  const [date] = useAtom(dateAtom);
  const { data, isLoading } = useUserLearningEvaluationData({
    userId: Number(userId),
    startDate: date?.startDate,
    endDate: date?.endDate,
    type: period,
  });

  const sentenceChartData = [
    {
      name: '낮음',
      score: Number(data?.[0]?.avgsentenceaccuracylowratio) * 100,
      fill: '#D8D8D8',
    },
    {
      name: '보통',
      score: Number(data?.[0]?.avgsentenceaccuracymediumratio) * 100,
      fill: '#AEB0F6',
    },
    {
      name: '높음',
      score: Number(data?.[0]?.avgsentenceaccuracyhighratio) * 100,
      fill: '#6366F1',
    },
  ];

  const expressionChartData = [
    {
      name: '낮음',
      score: Number(data?.[0]?.avgexpressbeginnerratio) * 100,
      fill: '#D8D8D8',
    },
    {
      name: '보통',
      score: Number(data?.[0]?.avgexpressintermediateratio) * 100,
      fill: '#AEB0F6',
    },
    {
      name: '높음',
      score: Number(data?.[0]?.avgexpressadvancedratio) * 100,
      fill: '#6366F1',
    },
  ];

  return (
    <div className='w-[335px] flex flex-col justify-start items-center mt-[18px] mb-[70px]'>
      <SummaryInfo />
      <StudyPeriod />
      {isLoading ? (
        <div className='w-full h-[300px] flex flex-col justify-center items-center'>
          <img src={Loading} alt='loading' className='w-[50px] h-[50px]' />
        </div>
      ) : data?.length === 0 ? (
        <div className='w-full h-[300px] flex flex-col justify-center items-center gap-[10px] bg-[#FFFFFF] border-[1px] border-[#EBEBEB] rounded-[16px] p-[26px] mt-[15px]'>
          <p className='text-[12px] text-[#ABABAB]'>
            해당 기간에는 대화량이 부족하여 분석이 불가합니다.
          </p>
          <button
            onClick={() => navigate('/talkList')}
            className='text-[10px] text-[#ffffff] flex items-center gap-[2px] bg-[#6366F1] rounded-[4px] px-[6px] py-[3px] cursor-pointer z-[1]'
          >
            <ChatBubbleOvalLeftIcon className='w-[14px] h-[14px] text-[#ffffff] scale-x-[-1]' />
            대화하기
          </button>
        </div>
      ) : (
        <>
          <TotalEvaluationChart data={data} />
          <LearningCompletionGraph />
          <VocabularyChart data={data} />
          <EduBarChart data={sentenceChartData} title='정확도' />
          <EduBarChart data={expressionChartData} title='표현력' />
        </>
      )}
    </div>
  );
};

export default TotalEvaluation;
