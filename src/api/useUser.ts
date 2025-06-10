import { useMutation } from '@tanstack/react-query';
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
