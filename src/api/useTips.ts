import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';

//* 오늘의 학습 tip 조회
export const useTodayTipData = () => {
  return useQuery({
    queryKey: ['todayTipData'],
    queryFn: async () => {
      const response = await Axios.get(
        `${import.meta.env.VITE_APP_API_URL}/tips/today`
      );
      return response.data;
    },
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: false,
  });
};

//* search tip 조회
export const useSearchTipData = (params: any) => {
  return useQuery({
    queryKey: ['searchTipData', params],
    queryFn: async () => {
      const response = await Axios.get(
        `${import.meta.env.VITE_APP_API_URL}/tips/search`,
        {
          params,
        }
      );
      return response.data;
    },
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: false,
  });
};
