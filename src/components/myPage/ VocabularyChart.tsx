import { Pie, PieChart } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useAtom } from 'jotai';
import { periodAtom } from '@/hook/atom/eduAtom';

const VocabularyChart = ({ data }: { data: any }) => {
  const [period] = useAtom(periodAtom);
  const rate = 10;
  const chartData = [
    {
      name: 'expert(심화)',
      score: Number(data?.[0]?.avgvocabadvancedratio) * 100,
      fill: '#6366F1',
    },
    {
      name: 'advanced(중급)',
      score: Number(data?.[0]?.avgvocabintermediateratio) * 100,
      fill: '#AEB0F6',
    },
    {
      name: 'basic(초급)',
      score: Number(data?.[0]?.avgvocabbeginnerratio) * 100,
      fill: '#D8D8D8',
    },
  ];
  const chartConfig = {
    score: {
      label: 'Vocabulary',
    },
    advanced: {
      label: 'Advanced',
      color: '#AEB0F6',
    },
    basic: {
      label: 'Basic',
      color: '#D8D8D8',
    },
    expert: {
      label: 'Expert',
      color: '#6366F1',
    },
  } satisfies ChartConfig;

  return (
    <div className='w-full flex flex-col justify-start items-start bg-[#FFFFFF] border-[1px] border-[#EBEBEB] rounded-[16px] p-[26px] mt-[26px] '>
      <div className='w-full flex justify-between items-center'>
        <h2 className='text-[12px] font-medium'>어휘 난이도 분석</h2>
        <span
          className={`text-[12px] ${
            rate > 0 ? 'text-[#6366F1]' : 'text-[#FEB200]'
          } font-extrabold`}
        >
          {period === 'week' ? '전주 대비' : '전월 대비'} {rate}%{' '}
          {rate > 0 ? '성장' : '감소'}
        </span>
      </div>
      <div className='w-[260px] flex justify-between items-center'>
        <Card className='w-[140px] h-[140px] border-none shadow-none flex flex-col items-center justify-center'>
          <CardContent className='pb-0'>
            <ChartContainer
              config={chartConfig}
              className='w-[140px] h-[140px]'
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey='score'
                  nameKey='name'
                  innerRadius={25}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <div className='flex flex-col justify-start items-start gap-[6px]'>
          {chartData.map((item) => (
            <div key={item.name} className='flex items-center gap-[6px]'>
              <div
                className='w-[12px] h-[12px] rounded-full'
                style={{ backgroundColor: item.fill }}
              />
              <p className='text-[10px]'>{item.name}:</p>
              <p className='text-[10px]'>{item.score}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VocabularyChart;
