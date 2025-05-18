import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import logo from '../../assets/ARTalker.svg';

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pageName } = location.state || {};

  return (
    <div>
      {pageName === '홈' || pageName === undefined ? (
        <div className='flex justify-between items-center p-3 h-16'>
          <img src={logo} alt='logo' />
          <div className='flex items-center'>
            <span className='text-[#082E57]'>아트토커</span>
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
            {pageName}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
