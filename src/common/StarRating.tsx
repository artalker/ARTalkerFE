import { StarIcon } from '@heroicons/react/24/solid';

const StarRating = ({ score }: { score: number }) => {
  return (
    <div className='flex items-center'>
      <StarIcon
        className={`w-[14px] h-[14px] ${
          score >= 1 ? 'text-yellow-300' : 'text-gray-300'
        }`}
      />
      <StarIcon
        className={`w-[14px] h-[14px] ${
          score >= 2 ? 'text-yellow-300' : 'text-gray-300'
        }`}
      />
      <StarIcon
        className={`w-[14px] h-[14px] ${
          score >= 3 ? 'text-yellow-300' : 'text-gray-300'
        }`}
      />
      <StarIcon
        className={`w-[14px] h-[14px] ${
          score >= 4 ? 'text-yellow-300' : 'text-gray-300'
        }`}
      />
      <StarIcon
        className={`w-[14px] h-[14px] ${
          score >= 5 ? 'text-yellow-300' : 'text-gray-300'
        }`}
      />
    </div>
  );
};

export default StarRating;
