import { useEffect, useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import { dateAtom, periodAtom } from '@/hook/atom/eduAtom';
import { useAtom } from 'jotai';
import { formatDate } from '@/utils/dateConvert';

const StudyPeriod = () => {
  const today = new Date();
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [period, setPeriod] = useAtom(periodAtom);
  const [, setDate] = useAtom<any>(dateAtom);
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  function getMonday(date: Date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // 월요일
    return new Date(d.setDate(diff));
  }

  // 자동 기간 계산
  let initRangeText = '';
  if (period === 'week') {
    const start = getMonday(today);
    initRangeText = `${formatDate(start)} ~ ${formatDate(today)}`;
  } else if (period === 'month') {
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    initRangeText = `${formatDate(start)} ~ ${formatDate(today)}`;
  }
  const getSelectedRange = () => {
    if (period === 'week') {
      // 선택된 주의 월요일 찾기
      const start = new Date(selectedDate);
      start.setDate(
        selectedDate.getDate() -
          selectedDate.getDay() +
          (selectedDate.getDay() === 0 ? -6 : 1)
      );

      // 일요일 찾기
      const end = new Date(start);
      end.setDate(start.getDate() + 6);

      return { from: start, to: end };
    } else {
      // 선택된 달의 첫 날
      const start = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        1
      );

      // 선택된 달이 현재 달과 같은 경우 오늘 날짜를, 그렇지 않은 경우 말일로 설정
      const isCurrentMonth =
        selectedDate.getFullYear() === today.getFullYear() &&
        selectedDate.getMonth() === today.getMonth();

      const end = isCurrentMonth
        ? new Date(today) // 현재 달인 경우 오늘 날짜
        : new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0); // 그 외의 경우 말일

      return { from: start, to: end };
    }
  };

  // 주간/월간 버튼 클릭 시 customRange 초기화
  const handlePeriodChange = (type: 'week' | 'month') => {
    setPeriod(type);
    // setCustomRange(null);
  };

  // 날짜 선택 핸들러
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };

  // 현재 선택된 범위 텍스트
  const range = getSelectedRange();
  const rangeText = `${formatDate(range.from)} ~ ${formatDate(range.to)}`;

  useEffect(() => {
    if (formatDate(selectedDate) === formatDate(today) && period === 'week') {
      setDate({
        startDate: initRangeText.slice(0, 10).replace(/\./g, '-'),
        endDate: initRangeText.slice(13, 23).replace(/\./g, '-'),
      });
    } else {
      setDate({
        startDate: formatDate(range.from).replace(/\./g, '-'),
        endDate: formatDate(range.to).replace(/\./g, '-'),
      });
    }
  }, [selectedDate, period]);

  return (
    <div className='w-full flex flex-col justify-start items-start bg-[#FFFFFF] border-[1px] border-[#EBEBEB] rounded-[16px] p-[16px] mt-[34px]'>
      <div className='w-full flex justify-between items-center'>
        <h2 className='text-[12px] font-medium'>학습 기간</h2>
        <div className='flex bg-gray-100 rounded-full p-0.5'>
          <button
            onClick={() => handlePeriodChange('week')}
            className={`px-3 py-1 text-[12px] ${
              period === 'week' ? 'bg-[#6366F1] text-white' : 'text-[#AAAAAA]'
            } rounded-full`}
          >
            주간
          </button>
          <button
            onClick={() => handlePeriodChange('month')}
            className={`px-3 py-1 text-[12px] ${
              period === 'month' ? 'bg-[#6366F1] text-white' : 'text-[#AAAAAA]'
            } rounded-full`}
          >
            월간
          </button>
        </div>
      </div>
      <div className='relative w-full flex justify-between items-center mt-[6px]'>
        <p className='text-[12px] text-[#757272]'>
          {formatDate(selectedDate) === formatDate(today)
            ? initRangeText
            : rangeText}
        </p>
        <button onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
          <CalendarDaysIcon className='w-[18px] h-[18px] text-[#757272]' />
        </button>
        {isCalendarOpen && (
          <div className='absolute top-[100%] right-[-10px] w-full z-[100] bg-[#FFFFFF] border-[1px] border-[#EBEBEB] rounded-[16px] p-[16px]'>
            <Calendar
              mode='single'
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date) => date > today}
              showOutsideDays
              className='w-full'
              classNames={{
                day_selected: 'bg-[#6366F1] text-white hover:bg-[#4f46e5]',
                day_today: 'border border-[#6366F1]',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyPeriod;
