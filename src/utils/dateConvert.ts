import { format, getDay } from 'date-fns';

export const converDateNoTime = (val: Date | number) => {
  const newDate = format(val, 'yyyy.MM.dd');
  return newDate;
};

export const converDate = (val: Date | number) => {
  const newDate = format(val, 'yyyy.MM.dd HH:mm');
  return newDate;
};

export const converFullDate = (val: Date | number) => {
  const newDate = format(val, 'yyyy.MM.dd HH:mm:ss');
  return newDate;
};

export const converDateToString = (val: Date | number) => {
  const newDate = format(val, 'yyyy년 M월 d일');
  return newDate;
};

export const convertDayToKorean = (val: number, type?: boolean) => {
  let newDay: string = '일';
  switch (val) {
    case 0:
      newDay = '일';
      break;
    case 1:
      newDay = '월';
      break;
    case 2:
      newDay = '화';
      break;
    case 3:
      newDay = '수';
      break;
    case 4:
      newDay = '목';
      break;
    case 5:
      newDay = '금';
      break;
    case 6:
      newDay = '토';
      break;
    default:
      newDay = '일';
  }
  const resultDay = type ? `${newDay}요일` : newDay;
  return resultDay;
};

export const converDateWithDay = (val: Date | number) => {
  const newDate = format(val, 'yy.MM.dd');
  const newDay = convertDayToKorean(getDay(new Date(val)));
  return `${newDate}(${newDay})`;
};

export const converDateSimpleYear = (val: Date | number) => {
  const newDate = format(val, 'yy.MM.dd');
  return newDate;
};

export const converDateSimpleYearFullDate = (val: Date | number) => {
  const newDate = format(val, 'yy.MM.dd HH:mm');
  return newDate;
};

export const converDateSimpleMonthFullDate = (val: Date | number) => {
  const newDate = format(val, 'MM.dd HH:mm');
  return newDate;
};

export const converTime = (val: number): string => {
  if (typeof val !== 'number' || isNaN(val) || val < 0) {
    return '0분';
  }

  const hours = Math.floor(val / 60);
  const minutes = val % 60;

  if (hours === 0) {
    return `${minutes}분`;
  } else if (minutes === 0) {
    return `${hours}시간`;
  } else {
    return `${hours}시간 ${minutes}분`;
  }
};

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};
