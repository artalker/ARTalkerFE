import React from 'react';

const MenuButtonBar = ({
  menu,
  activeMenu,
  setActiveMenu,
}: {
  menu: any[];
  activeMenu: string;
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  return (
    <div className='w-[335px] h-[37px] flex justify-center items-center border-[1px] border-[#6366F1] rounded-[4px] mt-[28px] overflow-hidden'>
      {menu.map((item, index) => (
        <button
          key={index}
          className={`w-[50%] h-[37px] flex justify-center items-center  ${
            activeMenu === item.title
              ? 'bg-[#6366F1] text-white font-[12px]'
              : 'bg-[#FFFFFF] text-[#6366F1] font-[12px]'
          }`}
          onClick={() => handleMenuClick(item.title)}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
};

export default MenuButtonBar;
