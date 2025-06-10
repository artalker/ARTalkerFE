import loginBg from '@/assets/loginBg.png';
import artTalkLogo from '@/assets/ARTalker.svg';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/');
    sessionStorage.setItem('id', '8');
    sessionStorage.setItem('name', 'seo jiwoon');
    sessionStorage.setItem('profileImage', 'examdfsafasdsaple');
    sessionStorage.setItem('level', '1');
    sessionStorage.setItem('experience', '0');
  };

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
            <button
              onClick={handleLogin}
              className='w-full flex flex-col justify-center items-center bg-[#FEE500] h-[48px] rounded-[8px]'
            >
              <p className='text-[16px] font-semibold text-[#333333]'>
                카카오 로그인
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
