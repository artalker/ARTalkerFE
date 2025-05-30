import serviceBg from '@/assets/serviceBg.png';
import { useNavigate } from 'react-router-dom';
import {
  PaintBrushIcon,
  PresentationChartLineIcon,
  SparklesIcon,
} from '@heroicons/react/24/solid';
import logo from '@/assets/ARTalker.svg';

const Service = () => {
  const navigate = useNavigate();
  const coreValues = [
    {
      title: '예술작품 기반 대화',
      desc: '명화와 예술작품을 통해 감성적 몰입을 유도하고 자연스러운 영어 표현을 학습합니다.',
      icon: PaintBrushIcon,
      fill: '#4B6FBF',
    },
    {
      title: 'AI 회화 파트너',
      desc: '24시간 언제든지 대화할 수 있는 AI 파트너가 즉각적인 피드백을 제공합니다.',
      icon: SparklesIcon,
      fill: '#6366F1',
    },
    {
      title: '영어 실력 향상',
      desc: '어휘력, 문장력, 표현력을 종합적으로 분석하여 효과적인 영어 실력 향상을 돕습니다.',
      icon: PresentationChartLineIcon,
      fill: '#A855F7',
    },
  ];
  return (
    <div className='w-full h-root flex flex-col justify-start items-center bg-[#F9FAFB]'>
      <section
        className='w-full min-h-[441px] object-cover object-center bg-cover bg-center flex justify-center items-center'
        style={{ backgroundImage: `url(${serviceBg})` }}
      >
        <div className='flex flex-col justify-between items-center w-[287px] h-[210px]'>
          <section className='flex flex-col justify-center items-center text-center text-[#ffffff]'>
            <h2 className='text-[24px] font-extrabold'>
              AI와 영어로 예술을 대화하다
            </h2>
            <p className='text-[14px] mt-[12px]'>
              예술작품을 보고, 듣고, 말하며 영어 표현력을 키우는 새로운 방식의
              회화 연습
            </p>
          </section>
          <button
            onClick={() => navigate('/talkList')}
            className='w-full flex flex-col justify-center items-center bg-[#F9FAFB] h-[48px] rounded-[4px] text-[#4B6FBF] font-semibold text-[14px] cursor-pointer shadow-[0_2px_4px_0_rgba(0,0,0,0.1)]'
          >
            지금 체험해보기
          </button>
        </div>
      </section>
      <section className='w-full flex flex-col justify-center items-center mt-[50px] px-[17px] pb-[50px]'>
        <div className='flex justify-center items-center mb-[34px]'>
          <img src={logo} alt='logo' className='w-[91px]' />
          <h2 className='text-[18px] font-semibold text-[#3D3D3D]'>
            의 핵심가치
          </h2>
        </div>
        <div className='w-full flex flex-col justify-center items-center gap-[20px]'>
          {coreValues.map((value, index) => (
            <div
              key={index}
              className='w-full flex flex-col justify-center items-center bg-[#FFFFFF] p-[20px] rounded-[8px] border-[1px] border-[#E5E5E5] shadow-[0_2px_4px_0_rgba(0,0,0,0.1)]'
            >
              <div
                className='w-[64px] h-[64px] rounded-full overflow-hidden flex items-center justify-center'
                style={{ backgroundColor: `${value.fill}1A` }}
              >
                <value.icon className='size-7' style={{ color: value.fill }} />
              </div>
              <h2 className='text-[#3D3D3D] text-[18px] font-medium mt-[22px] mb-[10px]'>
                {value.title}
              </h2>

              <p className='w-[260px] text-[14px] text-[#817E7E] text-center'>
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Service;
