import React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '../lib/utils';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    standardValue: number;
  }
>(({ className, value, standardValue, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-2 w-full overflow-hidden rounded-full bg-[#D8D8D8]',
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className='h-full w-full flex-1 bg-[#6366F1] transition-all rounded-full '
      style={{ transform: `translateX(-${standardValue - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

interface CustomProgressProps {
  value?: number;
  className?: string;
  userLevel?: number;
}

const TalkProgress: React.FC<CustomProgressProps> = ({
  value = 80,
  className = 'h-[6px] w-[335px]',
  userLevel,
}) => {
  const levelTotalPoints = () => {
    switch (userLevel) {
      case 1:
        return 30;
      case 2:
        return 50;
      case 3:
        return 60;
      case 4:
        return 80;
      case 5:
        return 100;
      case 6:
        return 120;
      case 7:
        return 150;
      default:
        return 0;
    }
  };
  return (
    <div>
      <div className='flex justify-between items-center w-full'>
        <p className='text-[10px] text-[#3D3D3D]'>진행도</p>
        <p className='text-[10px] text-[#6366F1]'>{levelTotalPoints()}p</p>
      </div>
      <Progress
        value={value}
        className={className}
        standardValue={levelTotalPoints()}
      />
    </div>
  );
};
export default TalkProgress;
