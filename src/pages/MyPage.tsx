import { useState } from 'react';
import UserLevelSection from '../components/user/UserLevelSection';
import MenuButtonBar from '../common/MenuButtonBar';
import TotalEvaluation from '../components/myPage/TotalEvaluation';
import CamillePissarro from '../assets/art/boulevardMontmatre_spring.png';
import CompletedTalk from '../components/myPage/CompletedTalk';

const MyPage = () => {
  const [activeMenu, setActiveMenu] = useState<string>('종합평가');
  const menu = [
    { title: '종합평가', val: 'totalEvaluation' },
    { title: '완료한 대화', val: 'completedTalk' },
  ];
  const completedTalkData = [
    {
      items: [
        {
          id: 1234,
          no: 0,
          title: '몽마르트 대로, 봄',
          name: '프란시스코 피사로',
          img: CamillePissarro,
          desc: 'Oil on canvas, 65cm *81cm',
          content:
            '몽마르트 대로, 봄은 프란시스코 피사로가 1897년에 그린 작품입니다. 피사로는 이 작품에서 봄의 아름다움을 표현했습니다.',
          year: '1897',
          level: '1',
          isCompleted: true,
          score: 4,
          date: '2025-05-21',
        },
        {
          no: 0,
          title: '몽마르트 대로, 봄',
          name: '프란시스코 피사로',
          img: CamillePissarro,
          desc: 'Oil on canvas, 65cm *81cm',
          content:
            '몽마르트 대로, 봄은 프란시스코 피사로가 1897년에 그린 작품입니다. 피사로는 이 작품에서 봄의 아름다움을 표현했습니다.',
          year: '1897',
          level: '1',
          isCompleted: true,
          score: 4,
          date: '2025-05-21',
        },
        {
          no: 0,
          title: '몽마르트 대로, 봄',
          name: '프란시스코 피사로',
          img: CamillePissarro,
          desc: 'Oil on canvas, 65cm *81cm',
          content:
            '몽마르트 대로, 봄은 프란시스코 피사로가 1897년에 그린 작품입니다. 피사로는 이 작품에서 봄의 아름다움을 표현했습니다.',
          year: '1897',
          level: '1',
          isCompleted: false,
          score: 4,
          date: '2025-05-21',
        },
      ],
      meta: {
        total: 10,
        page: '1',
        limit: '20',
        totalPages: 1,
        search: '',
      },
    },
  ];
  return (
    <div className='w-full h-root flex flex-col justify-start items-center bg-[#F9FAFB]'>
      <UserLevelSection />
      <MenuButtonBar
        menu={menu}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
      {activeMenu === '종합평가' ? (
        <TotalEvaluation />
      ) : (
        <CompletedTalk data={completedTalkData} />
      )}
    </div>
  );
};

export default MyPage;
