import { useMutation, useQuery } from '@tanstack/react-query';
import Axios from 'axios';

//* 최근 대화 내역
export const useRecentTalkMessageData = (params: any) => {
  return useQuery({
    queryKey: ['recentTalkMessageData', params],
    queryFn: async () => {
      const response = await Axios.get(
        `${import.meta.env.VITE_APP_API_URL}/conversations`,
        {
          params,
        }
      );
      return response.data;
    },
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: false,
    enabled: false,
  });
};

//* 최근 대화 내역 삭제
export const useDeleteRecentTalkMessageData = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await Axios.patch(
        `${import.meta.env.VITE_APP_API_URL}/conversations/${id}/delete`
      );
      return response.data;
    },
  });
};
