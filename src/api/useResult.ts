import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';

//* 사용자 학습통계
export const useUserLearningStatisticsData = (userId: string | number) => {
  return useQuery({
    queryKey: ['userLearningStatisticsData', userId],
    queryFn: async () => {
      const response = await Axios.get(
        `${
          import.meta.env.VITE_APP_API_URL
        }/results/statistics?userId=${userId}`
      );
      return response.data;
    },
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: false,
  });
};
