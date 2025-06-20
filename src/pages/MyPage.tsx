import { useState } from 'react';
import UserLevelSection from '../components/user/UserLevelSection';
import MenuButtonBar from '../common/MenuButtonBar';
import TotalEvaluation from '../components/myPage/TotalEvaluation';
import CompletedTalk from '../components/myPage/CompletedTalk';

const MyPage = () => {
  const [activeMenu, setActiveMenu] = useState<string>('종합평가');
  const menu = [
    { title: '종합평가', val: 'totalEvaluation' },
    { title: '완료한 대화', val: 'completedTalk' },
  ];

  return (
    <div className='w-full h-root flex flex-col justify-start items-center bg-[#F9FAFB]'>
      <UserLevelSection />
      <MenuButtonBar
        menu={menu}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
      {activeMenu === '종합평가' ? <TotalEvaluation /> : <CompletedTalk />}
    </div>
  );
};

export default MyPage;
