import { useEffect } from 'react';
import loginBg from '@/assets/loginBg.png';
import artTalkLogo from '@/assets/ARTalker.svg';
import Loading from '@/assets/Loading.gif';
import { useNavigate } from 'react-router-dom';
import { useUserKakaoLoginData } from '@/api/useUser';

const RedirectLogin = () => {
  const navigate = useNavigate();
  const urlParams = new URL(document.location.toString()).searchParams.get(
    'code'
  );
  const { mutate } = useUserKakaoLoginData();
  const onKakaoLogin = () => {
    mutate(
      { code: urlParams },
      {
        onSuccess: (data) => {
          sessionStorage.setItem('id', data?.user?.id);
          sessionStorage.setItem('name', data?.user?.name);
          sessionStorage.setItem('profileImage', data?.user?.thumbnailImageUrl);
          sessionStorage.setItem('level', data?.user?.level);
          sessionStorage.setItem('experience', data?.user?.experience);
          sessionStorage.setItem('accessToken', data?.accessToken);
          navigate('/');
        },
        onError: () => {
          alert('로그인에 실패했습니다. 잠시후 다시 시도해주세요.');
          navigate('/login');
        },
      }
    );
  };
  useEffect(() => {
    if (urlParams) {
      onKakaoLogin();
    }
  }, [urlParams]);
  return (
    <div className='w-full flex flex-col justify-start items-center bg-[#4B6FBF] h-screen'>
      <div className='w-full max-w-[667px] min-w-[355px] bg-white h-screen'>
        <div
          className='relative w-full h-full flex flex-col justify-start items-center bg-cover bg-center'
          style={{ backgroundImage: `url(${loginBg})` }}
        >
          <img
            src={artTalkLogo}
            alt='artTalkLogo'
            className='w-[243px] mt-[120px]'
          />
          <div className='mt-[254px] text-center text-[#FFFFFF]'>
            <h2 className='text-[18px] font-semibold'>
              예술을 느끼고, 영어로 말하다.
            </h2>
            <p className='text-[12px] mt-[9px]'>
              작품에 대한 감상을 하며 특별하게 영어를 배워보세요.
              <br />
              AI가 보다 빠르게 대화 분석을 해드려요.
            </p>
          </div>
          <div className='absolute bottom-[84px] w-full flex flex-col justify-start items-center px-[24px]'>
            <button className='w-full flex flex-col justify-center items-center bg-[#FEE500] h-[48px] rounded-[8px]'>
              <img src={Loading} alt='loading' className='w-[50px] h-[50px]' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedirectLogin;
