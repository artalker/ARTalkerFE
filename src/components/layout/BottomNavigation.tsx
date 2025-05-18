import { useNavigate, useLocation } from 'react-router-dom';
import {
  SparklesIcon,
  ChatBubbleLeftRightIcon,
  HomeIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

const BottomNavigation = () => {
  const [isClicked, setIsClicked] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();
  const menuName = location.pathname;

  useEffect(() => {
    setIsClicked(menuName);
  }, [menuName]);

  const menuList = [
    {
      no: 0,
      name: '학습 Tip',
      path: '/tip',
      isActive: (clicked: string) => clicked === '/tip',
      icon: (active: boolean) => (
        <SparklesIcon
          className='size-6'
          color={active ? '#4B6FBF' : '#ababab'}
        />
      ),
    },
    {
      no: 1,
      name: '대화하기',
      path: '/talkList',
      isActive: (clicked: string) => clicked.includes('/talk'),
      icon: (active: boolean) => (
        <ChatBubbleLeftRightIcon
          className='size-6'
          color={active ? '#4B6FBF' : '#ababab'}
        />
      ),
    },
    {
      no: 2,
      name: '홈',
      path: '/',
      isActive: (clicked: string) => clicked === '/',
      icon: (active: boolean) => (
        <HomeIcon className='size-6' color={active ? '#4B6FBF' : '#ababab'} />
      ),
    },
    {
      no: 3,
      name: '마이페이지',
      path: '/mypage',
      isActive: (clicked: string) => clicked === '/mypage',
      icon: (active: boolean) => (
        <UserCircleIcon
          className='size-6'
          color={active ? '#4B6FBF' : '#ababab'}
        />
      ),
    },
  ];

  return (
    <div className='w-full flex justify-between items-center px-[32px] pt-[8px] border-t-[1px] border-[#E5E5E5] overflow-hidden'>
      {menuList.map((menu) => {
        const active = menu.isActive(isClicked);

        return (
          <div
            key={menu.no}
            onClick={() => {
              navigate(menu.path, { state: { pageName: menu.name } });
              setIsClicked(menu.path);
            }}
            className='flex flex-col justify-center items-center cursor-pointer'
          >
            {menu.icon(active)}
            <span
              className={`text-[12px] ${
                active ? 'text-[#4B6FBF]' : 'text-[#ababab]'
              }`}
            >
              {menu.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};
export default BottomNavigation;
