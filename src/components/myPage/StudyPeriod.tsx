import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';

function getMonday(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // 월요일
  return new Date(d.setDate(diff));
}

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

const StudyPeriod = () => {
  const today = new Date();
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly');
  const [customRange, setCustomRange] = useState<{
    start: Date;
    end: Date;
  } | null>(null);

  // 자동 기간 계산
  let rangeText = '';
  if (customRange) {
    rangeText = `${formatDate(customRange.start)} ~ ${formatDate(
      customRange.end
    )}`;
  } else if (period === 'weekly') {
    const start = getMonday(today);
    rangeText = `${formatDate(start)} ~ ${formatDate(today)}`;
  } else if (period === 'monthly') {
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    rangeText = `${formatDate(start)} ~ ${formatDate(today)}`;
  }

  // 달력에서 날짜 선택 시(단일 날짜 or range)
  const handleSelect = (selected: any) => {
    if (selected && selected.from && selected.to) {
      setCustomRange({ start: selected.from, end: selected.to });
    } else if (selected instanceof Date) {
      setCustomRange({ start: selected, end: selected });
    }
  };

  // 주간/월간 버튼 클릭 시 customRange 초기화
  const handlePeriodChange = (type: 'weekly' | 'monthly') => {
    setPeriod(type);
    setCustomRange(null);
  };
  const getSelectedRange = () => {
    if (customRange) {
      return { from: customRange.start, to: customRange.end };
    } else if (period === 'weekly') {
      const start = getMonday(today);
      return { from: start, to: today };
    } else if (period === 'monthly') {
      const start = new Date(today.getFullYear(), today.getMonth(), 1);
      return { from: start, to: today };
    }
    return undefined;
  };
  return (
    <div className='w-full flex flex-col justify-start items-start bg-[#FFFFFF] border-[1px] border-[#EBEBEB] rounded-[16px] p-[16px] mt-[34px]'>
      <div className='w-full flex justify-between items-center'>
        <h2 className='text-[12px] font-medium'>학습 기간</h2>
        <div className='flex bg-gray-100 rounded-full p-0.5'>
          <button
            onClick={() => handlePeriodChange('weekly')}
            className={`px-3 py-1 text-[12px] ${
              period === 'weekly' ? 'bg-[#6366F1] text-white' : 'text-[#AAAAAA]'
            } rounded-full`}
          >
            주간
          </button>
          <button
            onClick={() => handlePeriodChange('monthly')}
            className={`px-3 py-1 text-[12px] ${
              period === 'monthly'
                ? 'bg-[#6366F1] text-white'
                : 'text-[#AAAAAA]'
            } rounded-full`}
          >
            월간
          </button>
        </div>
      </div>
      <div className='relative w-full flex justify-between items-center mt-[6px]'>
        <p className='text-[12px] text-[#757272]'>{rangeText}</p>
        <button onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
          <CalendarDaysIcon className='w-[18px] h-[18px] text-[#757272]' />
        </button>
        {isCalendarOpen && (
          <div className='absolute top-[100%] right-[-10px] w-full z-[100] bg-[#FFFFFF] border-[1px] border-[#EBEBEB] rounded-[16px] p-[16px]'>
            <Calendar
              mode='range'
              selected={getSelectedRange()}
              onSelect={handleSelect}
              disabled={(date: Date) => date > today}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyPeriod;
