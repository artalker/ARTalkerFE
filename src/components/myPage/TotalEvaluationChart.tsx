import CompareAaverages from './CompareAaverages';
import TotalRadarChart from './RadarChart';

const TotalEvaluationChart = ({ data }: { data: any }) => {
  const totalChartData = [
    {
      name: '어휘력',
      score: Number(data?.[0]?.avgvocabdiversityscore).toFixed(1) || 0,
      average: 70,
    },
    {
      name: '문장력',
      score: Number(data?.[0]?.avgsentenceaccuracyscore).toFixed(1) || 0,
      average: 52,
    },
    {
      name: '표현력',
      score: Number(data?.[0]?.avgexpressscore).toFixed(1) || 0,
      average: 35,
    },
  ];
  return (
    <div className='w-full flex flex-col justify-start items-start bg-[#FFFFFF] border-[1px] border-[#EBEBEB] rounded-[16px] p-[26px] mt-[26px]'>
      <h2 className='text-[12px] font-medium'>종합평가</h2>
      <TotalRadarChart data={totalChartData} />
      <CompareAaverages data={totalChartData} />
    </div>
  );
};

export default TotalEvaluationChart;
