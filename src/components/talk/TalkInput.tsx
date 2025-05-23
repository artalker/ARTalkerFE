import { useState, useEffect } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { MicrophoneIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import Loading from '../../assets/Loading.gif';

interface TalkInputProps {
  isStart: boolean;
  setIsStart: (isStart: boolean) => void;
  setTalkUserData: React.Dispatch<React.SetStateAction<any[]>>;
  isEnd: boolean;
  isAiLoading: boolean;
  setIsAiLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const TalkInput = ({
  isStart,
  setIsStart,
  setTalkUserData,
  isEnd,
  isAiLoading,
  setIsAiLoading,
}: TalkInputProps) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [permissionError, setPermissionError] = useState<string | null>(null);

  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  const handleMicClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());

      if (!isRecording) {
        SpeechRecognition.startListening({
          continuous: true,
          language: 'en-US',
        });
        setIsRecording(true);
      } else {
        SpeechRecognition.stopListening();
        setIsRecording(false);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '마이크 권한이 거부되었습니다.';
      setPermissionError(errorMessage);
    }
  };

  const handleSend = () => {
    if (input.trim()) {
      setIsAiLoading(true);
      setTalkUserData((prev) => [...prev, { message: input }]);
      setInput('');
      resetTranscript();
      setIsRecording(false);
    }
  };

  const handleEnterKey = (e: any) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      setPermissionError('이 브라우저는 음성 인식을 지원하지 않습니다.');
    }
  }, []);

  useEffect(() => {
    if (listening) {
      setInput(transcript);
    }
  }, [transcript]);

  return (
    <div className='fixed bottom-[0px] left-1/2 transform -translate-x-1/2 max-w-[667px] w-full h-[60px] bg-[#FFFFFF] border-[1px] border-[#E5E5E5]'>
      {!isStart && !isEnd ? (
        <div className='w-full h-full flex justify-center items-center'>
          <button
            onClick={() => {
              setIsStart(true);
              setIsAiLoading(false);
            }}
            className='w-[321px] h-[47px] flex flex-col justify-center items-center bg-[#6366F1] text-[#FFFFFF] rounded-[8px]'
          >
            <p className='text-[14px] font-semibold'>START</p>
            <p className='text-[10px]'>
              대화 준비 완료 시 START 버튼을 눌러주세요.
            </p>
          </button>
        </div>
      ) : isEnd ? (
        <div className='w-full h-full flex justify-center items-center'>
          <div className='w-[321px] h-[47px] flex flex-col justify-center items-center bg-[#AAAAAA] text-[#FFFFFF] rounded-[8px]'>
            <p className='text-[14px] font-semibold'>END</p>
            <p className='text-[10px]'>대화가 종료되었습니다</p>
          </div>
        </div>
      ) : (
        <div className='relative w-full h-full flex justify-center items-center p-[10px] gap-[12px]'>
          <div className='w-full h-[47px] flex items-center p-[4px] bg-[#F5F5F6] rounded-[50px] px-[12px]'>
            <button
              onClick={handleMicClick}
              className={`${isRecording ? 'text-[#6366F1]' : 'text-[#ABABAB]'}`}
            >
              <MicrophoneIcon className='w-[24px] h-[24px]' />
            </button>
            {permissionError && (
              <div className='ml-2 text-[#FF4444] text-[12px]'>
                {permissionError}
              </div>
            )}
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleEnterKey}
              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                const value = e.currentTarget.value;
                // 한글이 포함되어 있지 않은 경우만 입력 허용
                if (!/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(value)) {
                  setInput(value);
                } else {
                  // 한글이 포함된 경우 이전 상태로 복구
                  e.currentTarget.value = input;
                }
              }}
              placeholder='마이크를 눌러 영어로 대화해보세요'
              type='text'
              className='w-full border-[none] focus:outline-none text-[16px] placeholder:text-[#817E7E] placeholder:text-[16px]'
            />
          </div>
          <button
            onClick={handleSend}
            className='min-w-[47px] min-h-[47px] bg-[#6366F1] rounded-[50%] flex justify-center items-center'
          >
            <PaperAirplaneIcon className='w-[24px] h-[24px] text-[#ffffff]' />
          </button>
          {isAiLoading && (
            <>
              <div className='absolute top-[0px] right-[0px] w-full h-full bg-[#AAAAAA] opacity-[0.6] flex justify-center items-center z-[1]'></div>
              <img
                src={Loading}
                alt='loading'
                className='absolute bottom-[50%] right-[50%] transform translate-x-1/2 translate-y-1/2 w-[50px] h-[50px] z-[2]'
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TalkInput;
