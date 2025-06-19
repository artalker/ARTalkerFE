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
  const { id } = useParams(); //* 작품 아이디
  const { difficulty } = location.state || { difficulty: 1 }; //* 난이도

  const [isStart, setIsStart] = useState<boolean>(false); //* 대화시작
  const [isEnd, setIsEnd] = useState<boolean>(false); //* 대화종료
  const [time, setTime] = useState<number>(300); // 5분 = 300초
  const [isExpanded, setIsExpanded] = useState<boolean>(true); //* 상세보기 닫기
  const [conversationId, setConversationId] = useState<string | number>(); //* conversationId(대화생성시 채팅방 고유 아이디)

  const { mutate: talkMutate } = useTalkCreateData(); //* 대화 생성 시 채팅방 고유 아이디 저장
  const { data: talkItemData } = useTalkItemData(id); //* 작품 정보
  const userId = sessionStorage.getItem('id'); //* 사용자 아이디
  const userLevel = sessionStorage.getItem('level'); //* 사용자 레벨

  //* 대화 시작 시 time 카운트
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

  //* 대화 종료 시 time 초기화
  useEffect(() => {
    if (isEnd) {
      setTime(0);
    }
  }, [isEnd]);

  //* 대화 생성 시 conversationId 저장
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
