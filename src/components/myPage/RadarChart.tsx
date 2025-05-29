import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart as RechartsRadarChart,
} from 'recharts';
import { CardContent } from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface RadarChartProps {
  chartData: any[];
}

const TotalRadarChart = ({ chartData }: RadarChartProps) => {
  const chartConfig = {
    desktop: {
      label: 'Desktop',
      color: '#6366F1',
    },
  } satisfies ChartConfig;
  return (
    <div className='w-full flex flex-col justify-start items-center mt-[-26px]'>
      <CardContent className='pb-0'>
        <div className='h-[250px] w-full mt-[26px]'>
          <ChartContainer config={chartConfig} className='w-[250px] h-[250px]'>
            <div style={{ width: '250px', height: '250px' }}>
              <RechartsRadarChart
                width={250}
                height={250}
                data={chartData}
                outerRadius={100}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              >
                {/* <RadarChart
                data={chartData}
                dataKey={{ score: 'score', average: 'average' }}
                colors={['#6366F1', '#10B981']}
                outerRadius={100}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              > */}
                <defs>
                  <linearGradient
                    id='radarGradientScore'
                    x1='0'
                    y1='0'
                    x2='0'
                    y2='1'
                  >
                    <stop offset='0%' stopColor='rgba(99, 102, 241, 0.8)' />
                    <stop offset='100%' stopColor='rgba(168, 85, 247, 0.5)' />
                  </linearGradient>
                  <linearGradient
                    id='radarGradientAverage'
                    x1='0'
                    y1='0'
                    x2='0'
                    y2='1'
                  >
                    <stop offset='0%' stopColor='rgba(105, 105, 105, 0.8)' />
                    <stop offset='100%' stopColor='rgba(177, 181, 180, 0.3)' />
                  </linearGradient>
                </defs>
                <ChartTooltip content={<ChartTooltipContent />} />
                <PolarAngleAxis
                  dataKey='name'
                  tick={{ fill: ' #817E7E', fontSize: 10 }}
                />
                <PolarGrid stroke='#D8D8D8' />
                <Radar
                  name='점수'
                  dataKey='score'
                  stroke='#6366F1'
                  fill='url(#radarGradientScore)'
                  fillOpacity={1}
                  strokeWidth={0}
                  dot={{
                    fill: '#6366F1',
                    stroke: '#fff',
                    strokeWidth: 1.5,
                    r: 2.5,
                  }}
                />
                <Radar
                  name='평균'
                  dataKey='average'
                  stroke='#6a6a6a'
                  // fill='#6ee6fb'
                  fill='#D8D8D8'
                  fillOpacity={0.7}
                  strokeWidth={0}
                  dot={{
                    fill: '#6a6a6a',
                    stroke: '#fff',
                    strokeWidth: 1.5,
                    r: 2.5,
                  }}
                />
              </RechartsRadarChart>
            </div>
          </ChartContainer>
        </div>
      </CardContent>
    </div>
  );
};

export default TotalRadarChart;
