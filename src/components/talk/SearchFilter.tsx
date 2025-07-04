import React from 'react';

interface FilterButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  isSelected,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`px-[10px] py-[8px] rounded-[4px] text-[10px] leading-[100%] transition-colors duration-200 ${
      isSelected
        ? 'bg-[#6366F1] text-white font-semibold'
        : 'bg-[#E9E9EB] text-[#817E7E] hover:bg-[#E5E5E5] font-semibold'
    }`}
  >
    {label}
  </button>
);

interface SearchFilterProps {
  categories: string[];
  levels: number;
  onCategoryChange: (category: string) => void;
  setTalkLv: React.Dispatch<React.SetStateAction<number>>;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  categories,
  levels,
  onCategoryChange,
  setTalkLv,
}) => {
  const categoryOptions = [
    { value: '', label: '전체' },
    { value: '고전미술', label: '고전미술' },
    { value: '조각∙조소', label: '조각∙조소' },
    { value: '현대미술', label: '현대미술' },
    { value: '동양화', label: '동양화' },
  ];

  const levelOptions = [
    { value: 1, label: 'Lv.01' },
    { value: 2, label: 'Lv.02' },
    { value: 3, label: 'Lv.03' },
    { value: 4, label: 'Lv.04' },
    { value: 5, label: 'Lv.05' },
  ];

  // 전체 선택 버튼 고정값
  const hasAllSelected = (values: string[]) => values.includes('');

  return (
    <div className='w-[335px] mt-[16px]'>
      <div className='flex flex-col justify-between items-center '>
        <div className='w-full flex items-start justify-start flex-col mb-[14px]'>
          <p className='text-[12px] text-[#3D3D3D] mb-[2px] font-semibold'>
            미술 종류
          </p>
          <div className='flex flex-wrap gap-[8px]'>
            {categoryOptions.map((option) => (
              <FilterButton
                key={option.value}
                label={option.label}
                isSelected={
                  option.value === ''
                    ? hasAllSelected(categories)
                    : !hasAllSelected(categories) &&
                      categories.includes(option.value)
                }
                onClick={() => {
                  if (option.value === '') {
                    onCategoryChange('');
                  } else {
                    if (hasAllSelected(categories)) {
                      onCategoryChange(option.value);
                    } else {
                      if (categories.includes(option.value)) {
                        onCategoryChange(
                          categories
                            .filter((cat) => cat !== option.value)
                            .join(',')
                        );
                      } else {
                        onCategoryChange(
                          [...categories, option.value].join(',')
                        );
                      }
                    }
                  }
                }}
              />
            ))}
          </div>
        </div>
        <div className='w-full flex flex-col justify-start items-start'>
          <p className='text-[12px] text-[#3D3D3D] mb-[2px] font-semibold'>
            난이도
          </p>
          <div className='flex flex-wrap gap-[8px]'>
            {levelOptions.map((option) => (
              <FilterButton
                key={option.value}
                label={option.label}
                isSelected={levels === option.value}
                onClick={() => {
                  setTalkLv(option.value);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
