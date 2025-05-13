import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import logo from '../../assets/ARTalker.svg';

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const menuName = location.pathname.split('/')[1];

  return (
    <div>
      {menuName === '' ? (
        <div className='flex justify-between items-center p-3 h-16'>
          <img src={logo} alt='logo' />
          <div className='flex items-center'>
            <span className='text-[#082E57]'>아트토커</span>
            <span className='text-[#999999] ml-1'>님</span>
          </div>
        </div>
      ) : (
        <div
          onClick={() => navigate(-1)}
          className='flex justify-center items-center'
        >
          <ArrowLeftIcon className='size-6' />
        </div>
      )}
      <div className='flex justify-center items-center'>{menuName}</div>
    </div>
  );
};

export default NavBar;
