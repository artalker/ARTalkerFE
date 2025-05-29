import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#6366F1',
  },
} satisfies ChartConfig;

const LearningCompletionGraph = () => {
  const chartData = [
    { date: '2025.05.26', completed: 10 },
    { date: '2025.05.27', completed: 20 },
    { date: '2025.05.28', completed: 30 },
    { date: '2025.05.29', completed: 40 },
    { date: '2025.05.30', completed: 50 },
    { date: '2025.05.31', completed: 60 },
    { date: '2025.05.26', completed: 6 },
    { date: '2025.05.27', completed: 1 },
    { date: '2025.05.28', completed: 7 },
    { date: '2025.05.29', completed: 73 },
    { date: '2025.05.30', completed: 15 },
    { date: '2025.05.31', completed: 14 },
  ];
  const chartWidth = Math.max(chartData.length * 60, 300);
  return (
    <div className='w-full flex flex-col justify-start items-start bg-[#FFFFFF] border-[1px] border-[#EBEBEB] rounded-[16px] p-[26px] mt-[26px] '>
      <h2 className='text-[12px] font-medium'>학습 성과 그래프</h2>
      <div className='w-full overflow-x-auto overflow-y-hidden h-[280px] max-h-[280px] scrollbar-thin scrollbar-track-[#EBEBEB]'>
        <div
          style={{
            minWidth: '100%',
            width: `${chartWidth}px`,
            height: '280px',
          }}
        >
          <Card className='border-none shadow-none w-full h-[280px] overflow-visible'>
            <CardContent className='max-h-[280px] p-0 mb-[50px]'>
              <ChartContainer config={chartConfig}>
                <div style={{ width: '100%', height: 280 }}>
                  <LineChart
                    width={chartWidth}
                    height={250}
                    data={chartData}
                    margin={{
                      top: 10,
                      right: 20,
                      left: -20,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey='date'
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      padding={{ left: 20, right: 20 }}
                      tickFormatter={(value) => value.slice(5)}
                      tick={{ fill: '#ABABAB' }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickCount={6}
                      tickFormatter={(value) => value}
                      tick={{ fill: '#ABABAB' }}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Line
                      dataKey='completed'
                      type='natural'
                      stroke='#6366F1'
                      strokeWidth={2}
                      dot={{ fill: '#6366F1' }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </div>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LearningCompletionGraph;
