import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { type ChartConfig, ChartContainer } from '@/components/ui/chart';
const EduBarChart = ({
  data,
  title,
}: {
  data: { name: string; score: number }[];
  title: string;
}) => {
  const chartConfig = {
    score: {
      label: title,
    },
    low: {
      label: '낮음',
      color: '#D8D8D8',
    },
    middle: {
      label: '보통',
      color: '#AEB0F6',
    },
    high: {
      label: '높음',
      color: '#6366F1',
    },
  } satisfies ChartConfig;
  return (
    <div className='w-full flex flex-col justify-start items-start bg-[#FFFFFF] border-[1px] border-[#EBEBEB] rounded-[16px] p-[26px] mt-[26px] '>
      <div className='w-full flex justify-between items-center mb-[17px]'>
        <h2 className='text-[12px] font-medium'>{title} 분석</h2>
        <span className='text-[12px] text-[#6366F1] font-extrabold'>
          + 15% 성장
        </span>
      </div>
      <Card className='w-full h-[140px] border-none shadow-none flex flex-col items-center justify-center'>
        <CardContent className='w-full flex justify-between items-center'>
          <ChartContainer config={chartConfig} className='w-[276px] h-[140px]'>
            <BarChart
              accessibilityLayer
              data={data}
              margin={{
                top: 10,
                right: 20,
                left: -20,
                bottom: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='name'
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
                width={37}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickCount={6}
                domain={[0, 100]}
                tickFormatter={(value) => value}
                tick={{ fill: '#ABABAB' }}
              />
              <Bar dataKey='score' fill='#6366F1' radius={4} barSize={37} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default EduBarChart;
