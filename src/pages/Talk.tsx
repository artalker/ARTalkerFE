import { useState, useEffect } from 'react';
import ContentCard from '../components/talk/ContentCard';
import TalkAi from '../components/talk/TalkAi';
import NavBar from '../components/layout/NavBar';
import TalkEndButton from '../components/talk/TalkEndButton';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import {
  useTalkItemData,
  useTalkCreateData,
  useGetTalkResultData,
  useTalkMessageData,
} from '@/api/useTalk';
import { useAtom } from 'jotai';
import {
  conversationIdAtom,
  isCompletedAtom,
  isEndAtom,
  isStartAtom,
  timeAtom,
} from '@/hook/atom/talkAtom';

const Talk = () => {
  const location = useLocation();
  const { id } = useParams(); //* 작품 아이디
  const { difficulty } = location.state || { difficulty: 1 }; //* 난이도
  const [searchParams, setSearchParams] = useSearchParams(); //* URL 파라미터 관리
  const conversationId = searchParams.get('conversationId') || null;

  const [isStart, setIsStart] = useAtom<boolean>(isStartAtom); //* 대화시작
  const [isEnd, setIsEnd] = useAtom<boolean>(isEndAtom); //* 대화종료
  const [time, setTime] = useAtom<number>(timeAtom); // 5분 = 300초
  const [isExpanded, setIsExpanded] = useState<boolean>(true); //* 상세보기 닫기
  const [, setIsCompleted] = useAtom<boolean>(isCompletedAtom); //* 대화 완료
  const [, setConversationVal] = useAtom(conversationIdAtom);

  const { mutate: talkMutate } = useTalkCreateData(); //* 대화 생성 시 채팅방 고유 아이디 저장
  const { data: talkItemData } = useTalkItemData(id); //* 작품 정보
  const userId = sessionStorage.getItem('id'); //* 사용자 아이디
  const userLevel = sessionStorage.getItem('level'); //* 사용자 레벨

  const { data: talkResultData, refetch: refetchTalkResultData } =
    useGetTalkResultData(conversationId); //* 대화 결과
  const {
    data: talkMessageData,
    refetch: refetchTalkMessageData,
    isLoading: isLoadingTalkMessageData,
  } = useTalkMessageData(conversationId); //* 대화 내역

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

  //* 대화 생성 시 conversationId 주소 쿼리스트링 추가
  const handleCreateConversation = () => {
    if (!conversationId) {
      talkMutate(
        {
          userId: Number(userId),
          artworkId: Number(id),
          difficulty: difficulty,
          userLevel: Number(userLevel),
        },
        {
          onSuccess: (res) => {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set('conversationId', res?.id.toString());
            setSearchParams(newSearchParams);
            setConversationVal(res?.id);
            setTime(300);
          },
          onError: () => {
            console.error('대화 생성에 실패했습니다.');
          },
        }
      );
    }
  };

  useEffect(() => {
    if (conversationId !== null) {
      refetchTalkMessageData();
      refetchTalkResultData();
    }
  }, [conversationId]);

  useEffect(() => {
    if (conversationId === null) {
      setIsEnd(false);
      setIsStart(false);
    }
  }, [conversationId]);

  useEffect(() => {
    if (talkMessageData?.result?.id) {
      setIsCompleted(true);
    }
  }, [talkMessageData?.result?.id]);

  useEffect(() => {
    setTime(300);
    setConversationVal(null);
  }, []);

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
            isExpanded={isExpanded}
            handleCreateConversation={handleCreateConversation}
            talkResultData={talkResultData}
            refetchTalkResultData={refetchTalkResultData}
            talkMessageData={talkMessageData}
            refetchTalkMessageData={refetchTalkMessageData}
            isLoadingTalkMessageData={isLoadingTalkMessageData}
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
