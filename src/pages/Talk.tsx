import { useState, useEffect } from 'react';
import ContentCard from '../components/talk/ContentCard';
// import CamillePissarro from '../assets/art/boulevardMontmatre_spring.png';
import TalkAi from '../components/talk/TalkAi';
import NavBar from '../components/layout/NavBar';
import TalkEndButton from '../components/talk/TalkEndButton';
import { useLocation, useParams } from 'react-router-dom';
import { useTalkItemData, useTalkCreateData } from '@/api/useTalk';

const Talk = () => {
  const location = useLocation();
  const { id } = useParams();
  const { difficulty } = location.state || { difficulty: 1 }; // 기본값 1로 설정

  const [isStart, setIsStart] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [time, setTime] = useState<number>(300); // 5분 = 300초
  const [isExpanded, setIsExpanded] = useState<boolean>(true); //상세보기 닫기
  const [conversationId, setConversationId] = useState<string | number>();

  const { mutate: talkMutate } = useTalkCreateData();
  const { data: talkItemData } = useTalkItemData(id);
  const userId = sessionStorage.getItem('id');
  const userLevel = sessionStorage.getItem('level');

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isStart) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            setIsStart(false);
            setIsEnd(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isStart]);

  useEffect(() => {
    if (isEnd) {
      setTime(0);
    }
  }, [isEnd]);

  // const content = {
  //   id: 1234,
  //   no: 0,
  //   title: '몽마르트 대로, 봄',
  //   name: '프란시스코 피사로',
  //   img: CamillePissarro,
  //   desc: 'Oil on canvas, 65cm *81cm',
  //   content:
  //     '몽마르트 대로, 봄은 프란시스코 피사로가 1897년에 그린 작품입니다. 피사로는 이 작품에서 봄의 아름다움을 표현했습니다.몽마르트 대로, 봄은 프란시스코 피사로가 1897년에 그린 작품입니다. 피사로는 이 작품에서 봄의 아름다움을 표현했습니다.몽마르트 대로, 봄은 프란시스코 피사로가 1897년에 그린 작품입니다. ',
  //   year: '1897',
  //   level: '1',
  //   isCompleted: true,
  //   score: 4,
  //   date: '2025-05-21',
  // };

  useEffect(() => {
    if (id) {
      talkMutate(
        {
          userId: Number(userId),
          artworkId: Number(id),
          difficulty: difficulty,
          userLevel: Number(userLevel),
        },
        {
          onSuccess: (res) => {
            console.log('대화 생성에 성공했습니다.', res);
            setConversationId(res?.id);
          },
          onError: () => {
            console.error('대화 생성에 실패했습니다.');
          },
        }
      );
    }
  }, [id]);

  return (
    <div className='relative w-full flex flex-col justify-start items-center bg-[#4B6FBF] h-screen'>
      <div className='relative w-full max-w-[667px] min-w-[355px] bg-white h-screen overflow-hidden'>
        <NavBar />
        <div className='relative w-full h-[calc(100vh-64px)] flex flex-col justify-start items-center bg-[#F9FAFB]'>
          <ContentCard
            content={talkItemData}
            time={time}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            difficulty={difficulty}
          />
          <TalkAi
            isStart={isStart}
            isEnd={isEnd}
            isExpanded={isExpanded}
            setIsStart={setIsStart}
            conversationId={conversationId}
          />
          {isStart && (
            <TalkEndButton time={time} isEnd={isEnd} setIsEnd={setIsEnd} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Talk;
