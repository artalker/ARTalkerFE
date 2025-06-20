import { converDateSimpleYearFullDate } from '@/utils/dateConvert';
import { FaceSmileIcon } from '@heroicons/react/24/outline';
import { PlayPauseIcon } from '@heroicons/react/24/solid';
import { useAtom } from 'jotai';
import { isPlayingAtom } from '@/hook/atom/talkAtom';
import { useState } from 'react';

const AIMessage = ({
  message,
  setIsAiLoading,
}: {
  message: any;
  setIsAiLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  const speakMessage = () => {
    if (!window.speechSynthesis) {
      alert('이 브라우저는 음성 합성 기능을 지원하지 않습니다.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(message.content);
    utterance.lang = 'en-US'; // 영어로 읽기
    utterance.rate = 1; // 속도 (0.1 ~ 10)
    utterance.pitch = 1; // 음높이 (0 ~ 2)
    utterance.volume = 1; // 볼륨 (0 ~ 1)

    // 음성이 끝났을 때 상태 변경
    utterance.onend = () => {
      setIsPlaying(false);
      setIsAiLoading(false);
    };

    // 음성을 재생
    window.speechSynthesis.speak(utterance);
  };

  // 재생/정지 버튼 클릭 핸들러
  const handlePlayPause = () => {
    if (isPlaying) {
      // 재생 중일 때 정지
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsAiLoading(false);
    } else {
      // 정지 중일 때 재생
      speakMessage();
      setIsPlaying(true);
      setIsAiLoading(true);
    }
  };

  return (
    <div className='flex gap-[4px] items-start'>
      {/* 아바타 */}
      <div className='w-7 h-7 flex justify-center items-center rounded-full bg-[#4F46E5]'>
        <FaceSmileIcon className='w-5 h-5 text-white' />
      </div>

      {/* 텍스트 및 하단 컨테이너 */}
      <div className='flex flex-col gap-1'>
        {/* 메시지 말풍선 */}
        <div className='bg-[#4F46E5] rounded-tl-none text-white px-4 py-3 rounded-2xl min-w-[100px] max-w-[300px]'>
          <p className='whitespace-pre-line text-[15px] leading-relaxed font-medium'>
            {isTranslating ? message.ko_content : message?.content}
          </p>
        </div>

        {/* 하단 영역 */}
        <div className='flex flex-col'>
          {/* 왼쪽: 재생 */}
          <div className='flex justify-between items-center gap-1'>
            <div className='flex justify-center items-center gap-1'>
              {isPlaying ? (
                <div className='max-w-4 max-h-4 audio-wave'>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              ) : (
                <div className='max-w-4 max-h-4 wave-pulse'>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
              <button onClick={handlePlayPause}>
                <PlayPauseIcon className='w-4 h-4 text-[#4F46E5] font-bold' />
              </button>
            </div>

            <button
              onClick={() => {
                setIsTranslating(!isTranslating);
              }}
              className='text-[#A855F7] text-[10px] font-medium'
            >
              번역
            </button>
          </div>

          {/* 오른쪽 시간 */}
          <div className='flex items-center gap-3 text-[#999999] text-[13px]'>
            <span className='text-[8px]'>
              {converDateSimpleYearFullDate(message?.timestamp)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMessage;
