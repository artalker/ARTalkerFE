import { useMutation, useQuery } from '@tanstack/react-query';
import Axios from 'axios';

//* 대화 검색 조회
export const useTalkListData = (params: any) => {
  return useQuery({
    queryKey: ['talkListData', params],
    queryFn: async () => {
      const response = await Axios.get(
        `${import.meta.env.VITE_APP_API_URL}/artworks`,
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

interface ConversationData {
  userId: number;
  artworkId: string | number;
  difficulty: number;
  userLevel: number;
}

//* 대화생성 요청
export const useTalkCreateData = () => {
  return useMutation({
    mutationFn: async (params: ConversationData) => {
      const response = await Axios.post(
        `${import.meta.env.VITE_APP_API_URL}/conversations`,
        params
      );
      return response.data;
    },
  });
};

//* 대화 생성 시 해당작품 상세설명
export const useTalkItemData = (id: string | number) => {
  const fetchData = async () => {
    const response = await Axios.get(
      `${import.meta.env.VITE_APP_API_URL}/artworks/${id}`
    );
    return response?.data;
  };
  return useQuery({
    queryKey: ['talkItemData', id],
    queryFn: () => fetchData(),
    enabled: true,
  });
};

//* 대화생성 후 ai 대화 요청하기
export const usePostAIMessageData = () => {
  return useMutation({
    mutationFn: async (id: string | number) => {
      const response = await Axios.post(
        `${import.meta.env.VITE_APP_API_URL}/messages/initial/${id}`
      );
      return response.data;
    },
  });
};

//* 사용자 대화 전송
export const usePostUserMessageData = () => {
  return useMutation({
    mutationFn: async (params: any) => {
      const response = await Axios.post(
        `${import.meta.env.VITE_APP_API_URL}/messages`,
        params
      );
      return response.data;
    },
  });
};
