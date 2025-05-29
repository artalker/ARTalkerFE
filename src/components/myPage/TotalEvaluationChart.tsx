import CompareAaverages from './CompareAaverages';
import TotalRadarChart from './RadarChart';

const TotalEvaluationChart = () => {
  const chartData = [
    { name: '어휘력', score: 90, average: 70 },
    { name: '문장력', score: 85, average: 50 },
    { name: '표현력', score: 70, average: 20 },
  ];
  return (
    <div className='w-full flex flex-col justify-start items-start bg-[#FFFFFF] border-[1px] border-[#EBEBEB] rounded-[16px] p-[26px] mt-[26px]'>
      <h2 className='text-[12px] font-medium'>종합평가</h2>
      <TotalRadarChart chartData={chartData} />
      <CompareAaverages chartData={chartData} />
    </div>
  );
};

export default TotalEvaluationChart;
