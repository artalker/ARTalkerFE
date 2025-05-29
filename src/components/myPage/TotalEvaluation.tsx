import EduBarChart from './EduBarChart';
import LearningCompletionGraph from './ LearningCompletionGraph';
import VocabularyChart from './ VocabularyChart';
import StudyPeriod from './StudyPeriod';
import SummaryInfo from './SummaryInfo';
import TotalEvaluationChart from './TotalEvaluationChart';

const TotalEvaluation = () => {
  const chartData = [
    { name: '낮음', score: 15, fill: '#D8D8D8' },
    { name: '보통', score: 40, fill: '#AEB0F6' },
    { name: '높음', score: 30, fill: '#6366F1' },
  ];
  return (
    <div className='w-[335px] flex flex-col justify-start items-center mt-[18px] mb-[70px]'>
      <SummaryInfo />
      <StudyPeriod />
      <TotalEvaluationChart />
      <LearningCompletionGraph />
      <VocabularyChart />
      <EduBarChart data={chartData} title='정확도' />
      <EduBarChart data={chartData} title='표현력' />
    </div>
  );
};

export default TotalEvaluation;
