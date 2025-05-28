import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';
import { CardContent } from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const TotalEvaluationChart = () => {
  const chartConfig = {
    desktop: {
      label: 'Desktop',
      color: '#6366F1',
    },
  } satisfies ChartConfig;

  const chartData = [
    { name: '어휘력', score: 186 },
    { name: '문장력', score: 305 },
    { name: '표현력', score: 237 },
  ];
  return (
    <div className='w-full flex flex-col justify-start items-start bg-[#FFFFFF] border-[1px] border-[#EBEBEB] rounded-[16px] p-[26px] mt-[26px] '>
      <h2 className='text-[12px] font-medium'>종합평가</h2>
      <div className='w-full flex flex-col justify-center items-start mt-[-26px]'>
        <CardContent className='pb-0'>
          <div className='h-[250px] w-full mt-[26px]'>
            <ChartContainer
              config={chartConfig}
              className='w-[250px] h-[250px]'
            >
              <ResponsiveContainer width='100%' height='100%'>
                <RadarChart
                  data={chartData}
                  outerRadius={100}
                  margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                >
                  <defs>
                    <linearGradient
                      id='radarGradient'
                      x1='0'
                      y1='0'
                      x2='0'
                      y2='1'
                    >
                      <stop offset='0%' stopColor='rgba(99, 102, 241, 0.8)' />
                      <stop offset='100%' stopColor='rgba(168, 85, 247, 0.5)' />
                    </linearGradient>
                  </defs>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <PolarAngleAxis
                    dataKey='name'
                    tick={{ fill: ' #817E7E', fontSize: 10 }}
                  />
                  <PolarGrid stroke='#E5E7EB' />
                  <Radar
                    name='Score'
                    dataKey='score'
                    stroke='#6366F1'
                    fill='url(#radarGradient)'
                    fillOpacity={0.9}
                    strokeWidth={0}
                    dot={{
                      fill: '#6366F1',
                      stroke: '#fff',
                      strokeWidth: 1.5,
                      r: 2.5,
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default TotalEvaluationChart;
