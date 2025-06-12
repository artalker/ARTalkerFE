import { useState, useEffect, useRef } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { MicrophoneIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import Loading from '../../assets/Loading.gif';
import { usePostUserMessageData } from '@/api/useTalk';

interface TalkInputProps {
  isStart: boolean;
  setIsStart: (isStart: boolean) => void;
  setTalkUserData: React.Dispatch<React.SetStateAction<any[]>>;
  isEnd: boolean;
  isAiLoading: boolean;
  setIsAiLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleStartAIMessageData: () => void;
  conversationId: string | number;
  setAiMessageData: React.Dispatch<React.SetStateAction<any[]>>;
}

const TalkInput = ({
  isStart,
  setIsStart,
  setTalkUserData,
  isEnd,
  isAiLoading,
  setIsAiLoading,
  handleStartAIMessageData,
  conversationId,
  setAiMessageData,
}: TalkInputProps) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [lastTranscript, setLastTranscript] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: postUserMessageMutate } = usePostUserMessageData();

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
    setIsAiLoading(true);
    setTalkUserData((prev) => [...prev, { message: input }]);
    if (input.trim()) {
      postUserMessageMutate(
        {
          conversationId: conversationId,
          sender: 'user',
          content: input,
        },
        {
          onSuccess: (res) => {
            console.log('사용자 응답:', res);
            setAiMessageData((prev) => [
              ...prev,
              {
                aiMessage: res?.content || '응답을 받아오지 못했습니다.',
                time: res?.timestamp || new Date().toISOString(),
              },
            ]);
            setIsAiLoading(false);
            setInput('');
            resetTranscript();
            setLastTranscript('');
            setIsRecording(false);
          },
          onError: (err) => {
            console.error('사용자 응답 중 오류 발생:', err);
            setIsAiLoading(false);
          },
        }
      );
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
    if (listening && transcript && !isAiLoading) {
      if (transcript !== lastTranscript) {
        if (
          transcript.length > lastTranscript.length &&
          transcript.startsWith(lastTranscript)
        ) {
          const newText = transcript.slice(lastTranscript.length);
          setInput((current) => current + newText);
        } else {
          setInput((current) => current + transcript);
        }
        setLastTranscript(transcript);

        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.selectionStart = inputRef.current.value.length;
            inputRef.current.selectionEnd = inputRef.current.value.length;
          }
        }, 0);
      }
    }
  }, [listening, transcript, lastTranscript, isAiLoading]);

  return (
    <div className='fixed bottom-[0px] left-1/2 transform -translate-x-1/2 max-w-[667px] w-full h-[60px] bg-[#FFFFFF] border-[1px] border-[#E5E5E5]'>
      {!isStart && !isEnd ? (
        <div className='w-full h-full flex justify-center items-center'>
          <button
            onClick={() => {
              handleStartAIMessageData();
              setIsAiLoading(true);
            }}
            className='w-[321px] h-[47px] flex flex-col justify-center items-center bg-[#6366F1] text-[#FFFFFF] rounded-[8px] cursor-pointer'
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
              ref={inputRef}
              value={input}
              onChange={(e) => {
                if (!isAiLoading) {
                  const value = e.target.value;
                  if (!/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(value)) {
                    setInput(value);
                    resetTranscript();
                    setLastTranscript('');
                  } else {
                    e.currentTarget.value = input;
                  }
                }
              }}
              onKeyPress={handleEnterKey}
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
