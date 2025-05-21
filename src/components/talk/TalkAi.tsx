import { useState, useEffect } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { MicrophoneIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';

interface TalkAiProps {
  isStart: boolean;
  setIsStart: (isStart: boolean) => void;
  isExpanded: boolean;
}

interface TalkUserData {
  message: string;
}

const TalkAi = ({ isStart, setIsStart, isExpanded }: TalkAiProps) => {
  const [talkUserData, setTalkUserData] = useState<TalkUserData[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [input, setInput] = useState('');

  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  //   const handleSend = () => {
  //     if (transcript.trim()) {
  //       setTalkUserData((prev) => [...prev, { message: transcript }]);
  //       resetTranscript();
  //     }
  //   };
  const handleSend = () => {
    if (input.trim()) {
      setTalkUserData((prev) => [...prev, { message: input }]);
      setInput('');
      resetTranscript();
    }
  };

  //   const handleMicClick = () => {
  //     if (!isRecording) {
  //       SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
  //       setIsRecording(true);
  //     } else {
  //       SpeechRecognition.stopListening();
  //       setIsRecording(false);
  //     }
  //   };
  const handleMicClick = () => {
    if (!isRecording) {
      SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
      setIsRecording(true);
    } else {
      SpeechRecognition.stopListening();
      setIsRecording(false);
    }
  };

  useEffect(() => {
    if (listening) {
      setInput(transcript);
    }
  }, [transcript]);

  return (
    <div
      className={`absolute left-0 w-[374px] overflow-hidden ${
        isExpanded ? 'top-[356px]' : 'top-[120px]'
      }`}
    >
      <div
        className={`relative w-full ${
          isExpanded ? 'h-[calc(100vh - 356px)]' : 'h-[calc(100vh - 120px)]'
        }`}
      >
        <div className='p-4 space-y-2 overflow-y-auto h-full'>
          {talkUserData.map((item, index) => (
            <p key={index}>{item.message}</p>
          ))}
        </div>

        {/* 대화 입력창 */}
        <div className='fixed bottom-[60px] left-1/2 transform -translate-x-1/2 max-w-[667px] w-full h-[60px] bg-[#FFFFFF] border-[1px] border-[#E5E5E5]'>
          {!isStart ? (
            <div className='w-full h-full flex justify-center items-center'>
              <button
                onClick={() => setIsStart(true)}
                className='w-[321px] h-[47px] flex flex-col justify-center items-center bg-[#6366F1] text-[#FFFFFF] rounded-[8px]'
              >
                <p className='text-[14px] font-semibold'>START</p>
                <p className='text-[10px]'>
                  대화 준비 완료 시 START 버튼을 눌러주세요.
                </p>
              </button>
            </div>
          ) : (
            <div className='w-full h-full flex justify-center items-center p-[10px] gap-[12px]'>
              <div className='w-full h-[47px] flex items-center p-[4px] bg-[#F5F5F6] rounded-[50px] px-[12px]'>
                <button
                  onClick={handleMicClick}
                  className={`${
                    isRecording ? 'text-[#6366F1]' : 'text-[#ABABAB]'
                  }`}
                >
                  <MicrophoneIcon className='w-[24px] h-[24px]' />
                </button>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='마이크를 눌러 영어로 대화해보세요'
                  type='text'
                  className='w-full border-[none] focus:outline-none text-[16px] placeholder:text-[#817E7E] placeholder:text-[16px]'
                />
              </div>
              <button
                onClick={handleSend}
                className='w-[47px] h-[47px] bg-[#6366F1] rounded-[50%] flex justify-center items-center'
              >
                <PaperAirplaneIcon className='w-[24px] h-[24px] text-[#ffffff]' />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TalkAi;
