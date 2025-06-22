import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';

//* 오늘의 추천작품
export const useTodayRecommendData = () => {
  return useQuery({
    queryKey: ['todayRecommendData'],
    queryFn: async () => {
      const response = await Axios.get(
        `${import.meta.env.VITE_APP_API_URL}/artworks/today`
      );
      return response.data;
    },
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: false,
  });
};
