export const FormattedTime = (time: number | undefined | null) => {
  if (time === undefined || time === null) {
    return '0:00';
  }

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return formattedTime;
};
