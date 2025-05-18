import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import BottomNavigation from './BottomNavigation';

const MainLayout = () => {
  return (
    <div className='relative w-full flex flex-col justify-start items-center bg-[#4B6FBF] h-screen'>
      <div className='relative w-full max-w-[667px] min-w-[355px] bg-white h-screen'>
        <NavBar />
        <Outlet />
        <BottomNavigation />
      </div>
    </div>
  );
};

export default MainLayout;
