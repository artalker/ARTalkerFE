import StudyPeriod from './StudyPeriod';
import SummaryInfo from './SummaryInfo';
import TotalEvaluationChart from './TotalEvaluationChart';

const TotalEvaluation = () => {
  return (
    <div className='w-[335px] flex flex-col justify-start items-center mt-[18px]'>
      <SummaryInfo />
      <StudyPeriod />
      <TotalEvaluationChart />
    </div>
  );
};

export default TotalEvaluation;
