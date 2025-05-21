import React from 'react';
import { cn } from '../lib/utils';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const CustomInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
>(({ className, type, value, onChange, ...props }, ref) => {
  return (
    <div className='relative mt-[24px] transform-gpu'>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={cn(
          'flex h-9 w-[335px] rounded-[10px] border border-[#EBEBEB] bg-[#ffffff] px-[12px] py-[12px] text-[14px] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[#B3B3B3] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:border-[#6366F1] focus:ring-[#6366F1] [touch-action:manipulation]',
          className
        )}
        ref={ref}
        {...props}
        placeholder='작품명 또는 작가명 검색'
      />
      <MagnifyingGlassIcon className='size-5 text-[#000000] absolute right-3 top-1/2 transform -translate-y-1/2' />
    </div>
  );
});
CustomInput.displayName = 'CustomInput';

export { CustomInput };
