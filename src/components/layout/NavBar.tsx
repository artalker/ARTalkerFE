import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import logo from '../../assets/ARTalker.svg';

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathName = location.pathname.slice(1);
  const userName = sessionStorage.getItem('name');

  const menuTitle = (pathName: string) => {
    if (pathName.startsWith('talk/')) {
      return '대화하기';
    }
    switch (pathName) {
      case 'tip':
        return '학습 Tip';
      case 'talkList':
      case 'talk':
        return '대화하기';
      case 'mypage':
        return '마이페이지';
      case 'service':
        return '서비스 소개';
      default:
        return 'ARTalker';
    }
  };

  return (
    <div>
      {pathName === '' || pathName === undefined ? (
        <div className='flex justify-between items-center p-3 h-16'>
          <img src={logo} alt='logo' />
          <div
            className='flex items-center cursor-pointer'
            onClick={() => navigate('/mypage')}
          >
            <span className='text-[#082E57]'>{userName}</span>
            <span className='text-[#999999] ml-1'>님</span>
          </div>
        </div>
      ) : (
        <div className='w-full h-16 relative flex items-center'>
          <div
            onClick={() => navigate(-1)}
            className='flex justify-start items-center ml-3 cursor-pointer'
          >
            <ChevronLeftIcon className='size-6' />
          </div>
          <div className='absolute left-1/2 transform -translate-x-1/2 font-semibold text-[16px] text-[#3D3D3D]'>
            {menuTitle(pathName)}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
