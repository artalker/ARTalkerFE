import { useMutation, useQuery } from '@tanstack/react-query';
import Axios from 'axios';

//*유저정보
export const useUserPostData = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await Axios.post(
        `${import.meta.env.VITE_APP_API_URL}/users`
      );
      return response.data;
    },
  });
};

//* 카카오 로그인
export const useUserKakaoLoginData = () => {
  return useQuery({
    queryKey: ['kakaoLogin'],
    queryFn: async () => {
      const response = await Axios.get(
        `https://kauth.kakao.com/oauth/authorize?client_id=${
          import.meta.env.KAKAO_REST_API_KEY
        }&redirect_uri=${import.meta.env.KAKAO_REDIRECT_URI}&response_type=code`
      );
      return response.data;
    },
  });
};
