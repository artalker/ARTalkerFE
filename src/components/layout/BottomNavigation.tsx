import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const menuName = location.pathname;

  const menuList = [
    // {
    //   no: 0,
    //   name: "홈",
    //   path: "/",
    //   icon: (isClicked) => (
    //     <HomeRoundedIcon
    //       sx={{ width: "24px", color: isClicked ? "#082E57" : "#999999" }}
    //     />
    //   ),
    // },
    // {
    //   no: 1,
    //   name: "산책하기",
    //   path: "/walk",
    //   icon: (isClicked) => (
    //     <PetsRoundedIcon
    //       sx={{ width: "24px", color: isClicked ? "#082E57" : "#999999" }}
    //     />
    //   ),
    // },
    // {
    //   no: 2,
    //   name: "마이페이지",
    //   path: "/mypage",
    //   icon: (isClicked) => (
    //     <AccountBoxRoundedIcon
    //       sx={{ width: "24px", color: isClicked ? "#082E57" : "#999999" }}
    //     />
    //   ),
    // },
    {
      no: 3,
      name: '뒤로가기',
      path: null,
      icon: <ArrowUturnLeftIcon className='size-6' />,
      action: () => {
        navigate(-1);
      },
    },
  ];

  return (
    <div className='w-full flex justify-between items-center p-2'>
      {menuList.map((menu) => (
        <div
          key={menu.no}
          onClick={() => menu.action()}
          className='flex justify-center items-center'
        >
          {menu.icon}
        </div>
      ))}
    </div>
  );
};

export default BottomNavigation;
