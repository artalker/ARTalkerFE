import serviceBg from '@/assets/serviceBg.png';
import { useNavigate } from 'react-router-dom';
import {
  PaintBrushIcon,
  PresentationChartLineIcon,
  SparklesIcon,
  RocketLaunchIcon,
  ClipboardDocumentListIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  TrophyIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/solid';
import logo from '@/assets/ARTalker.svg';
import serviceArt from '@/assets/serviceArt.png';
import serviceAi from '@/assets/serviceAi.png';
import serviceAnalyze from '@/assets/serviceAnalyze.png';
import { useState } from 'react';
import UserLvLabel from '@/common/UserLvLabel';
import StarRating from '@/common/StarRating';

const Service = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };
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
  const serviceList = [
    {
      id: 0,
      title: '예술 대화 주제 선택',
      desc: '미술, 음악, 문학 등 다양한 예술 분야에서 대화 주제를 선택할 수 있습니다',
      img: serviceArt,
      icon: PaintBrushIcon,
    },
    {
      id: 1,
      title: 'AI 맞춤형 질문',
      desc: '사용자의 레벨에 맞춘 질문을 제공하여 최적의 학습 경험을 제공합니다.',
      img: serviceAi,
      icon: RocketLaunchIcon,
    },
    {
      id: 2,
      title: '실시간 대화분석',
      desc: '사용자와 AI의 대화를 통해 결과를 바로 분석하여 살펴볼 수 있습니다.',
      img: serviceAnalyze,
      icon: ClipboardDocumentListIcon,
    },
  ];
  const howItWorks = [
    {
      title: '예술작품 감상',
      description: '다양한 명화와 예술작품을 감상하며 영감을 얻습니다.',
      icon: EyeIcon,
    },
    {
      title: 'AI와 영어 대화',
      description: '작품에 대한 생각과 느낌을 AI와 영어로 대화합니다.',
      icon: ChatBubbleLeftRightIcon,
    },
    {
      title: '실시간 피드백',
      description:
        '대화가 끝나면 어휘력, 문장력, 표현력에 대한 상세한 피드백을 받습니다.',
      icon: ChartBarIcon,
    },
    {
      title: '레벨업 & 표현력 향상',
      description:
        '지속적인 연습으로 영어 실력과 예술 이해도가 함께 성장합니다.',
      icon: TrophyIcon,
    },
  ];
  const levels = [
    {
      name: '관찰자',
      level: '1',
      description: '단어 이해를 중심으로 기초적인 감상을 영어로 표현합니다.',
    },
    {
      name: '탐험가',
      level: '2',
      description: '간단한 문장이 구사가능하며 더 깊이 있는 대화를 나눕니다.',
    },
    {
      name: '해석자',
      level: '3',
      description: '작품의 의미와 의도에 대해 영어로 표현합니다.',
    },
    {
      name: '창작자',
      level: '4',
      description: '작품에 대해 표현의 다양성을 대화로 표현합니다.',
    },
    {
      name: '감상가',
      level: '5',
      description: '의도와 의미를 추상적으로 표현하며 대화할 수 있습니다.',
    },
    {
      name: '큐레이터',
      level: '6',
      description: '여러 작품을 연결하고 예술사적 맥락에서 논의할 수 있습니다.',
    },
    {
      name: '예술가',
      level: '7',
      description: '자신만의 예술적 관점을 유창한 영어로 표현하고 토론합니다',
    },
  ];
  const testimonials = [
    {
      name: '임00',
      age: 29,
      comment:
        '미술 전공생인데 영어로 작품을 설명하는 연습을 할 수 있어서 정말 유용해요. 포트폴리오 인터뷰 준비에도 큰 도움이 됩니다.',
      rating: 5,
    },
    {
      name: '서00',
      age: 31,
      comment:
        '영어 회화에 자신이 없었는데, AI가 친절하게 대화를 이끌어줘서 부담 없이 시작할 수 있었어요. 어휘력이 확실히 늘었습니다.',
      rating: 4,
    },
    {
      name: '장00',
      age: 22,
      comment:
        '처음엔 그냥 영어 연습용으로 시작했는데, 미술과 함께하니 몰입감이 다르네요. 매일 로그인하게 되는 유일한 영어 학습 앱입니다.',
      rating: 5,
    },
    {
      name: '박00',
      age: 18,
      comment:
        '학교에서 배우지 못한 부분들을 아트톡커에서 미술작품을 영어로 대화하며 알게 될 수 있어 도움도 되고, 좋았어요. ',
      rating: 5,
    },
  ];
  const faqs = [
    {
      question: 'AI가 실시간으로 채점하나요?',
      answer:
        '네, ARTalker의 AI는 대화가 끝난 후 즉시 어휘력, 문장력, 표현력을 분석하여 종합 점수와 상세한 피드백을 제공합니다.',
    },
    {
      question: '영어 실력이 부족해도 사용할 수 있나요?',
      answer:
        '물론입니다. 초보자부터 고급 사용자까지 모든 레벨에 맞춤형 콘텐츠를 제공합니다. 처음에는 간단한 묘사부터 시작하여 점차 난이도를 높여갈 수 있습니다.',
    },
    {
      question: '모바일에서도 사용할 수 있나요?',
      answer:
        '네, ARTalker는 모바일 최적화 디자인으로 언제 어디서나 편리하게 사용할 수 있습니다. iOS와 Android 모두 지원합니다.',
    },
    {
      question: '어떤 종류의 예술 작품을 다루나요?',
      answer:
        '르네상스부터 현대 미술까지 다양한 시대와 장르의 작품을 다룹니다. 매주 새로운 작품이 업데이트되며, 사용자의 관심사에 따라 추천 작품도 제공합니다.(준비중)',
    },
  ];
  return (
    <div className='w-full h-root flex flex-col justify-start items-center bg-[#F9FAFB]'>
      {/* 서비스 소개 */}
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
      {/* 핵심가치 */}
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
      {/* 주요 기능 */}
      <section className='w-full bg-[#ffffff] flex flex-col justify-start items-center'>
        <div className='flex justify-center items-center mt-[50px]'>
          <img src={logo} alt='logo' className='w-[91px]' />
          <h2 className='text-[18px] font-semibold text-[#3D3D3D]'>
            의 주요기능
          </h2>
        </div>
        <div className='w-full flex justify-center items-center px-[17px] mt-[20px]'>
          {serviceList.map((service, index) => {
            return (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`w-[33.3%] text-[12px] font-semibold border-b-[1px] cursor-pointer ${
                  activeTab === index
                    ? 'text-[#6366F1] border-[#6366F1] border-b-[2px]'
                    : 'text-[#817E7E] border-[#817E7E]'
                }`}
              >
                {service.title}
              </button>
            );
          })}
        </div>
        {serviceList[activeTab] && (
          <div className='w-full flex flex-col justify-center items-center px-[38px]'>
            <div
              className='w-full flex items-center justify-center mb-6 mt-[20px] px-[80px] py-[60px]'
              style={{
                background: 'linear-gradient(180deg, #5085F7 0%, #AEB0F6 100%)',
                boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.3)',
              }}
            >
              <img
                src={serviceList[activeTab].img}
                alt={serviceList[activeTab].title}
                className='w-[141px]'
              />
            </div>
            <div className='w-[280px] h-[102px] mb-[100px]'>
              <div className='flex items-center gap-[10px]'>
                <div className='w-[45px] h-[45px] rounded-full overflow-hidden flex items-center justify-center bg-[#E7E8FC]'>
                  {(() => {
                    const Icon = serviceList[activeTab]?.icon;
                    return Icon ? (
                      <Icon className='size-6 text-[#6366F1]' />
                    ) : null;
                  })()}
                </div>
                <h2 className='text-[#3D3D3D] text-[18px] font-semibold mt-[22px] mb-[10px]'>
                  {serviceList[activeTab].title}
                </h2>
              </div>

              <p className='w-[260px] text-[14px] text-[#817E7E] text-left mt-[10px]'>
                {serviceList[activeTab].desc}
              </p>
            </div>
          </div>
        )}
      </section>
      {/* 작동방법 */}
      <section className='w-full flex flex-col justify-start items-center  px-[17px] py-[50px] '>
        <div className='flex justify-center items-center mb-[34px]'>
          <h2 className='text-[18px] font-semibold text-[#3D3D3D]'>
            이렇게 작동합니다.
          </h2>
        </div>
        <div className=' min-h-[375px]'>
          {howItWorks.map((step, index) => (
            <div key={index} className='flex mb-8 last:mb-0'>
              <div className='mr-6'>
                <div className='w-12 h-12 rounded-full bg-gradient-to-r from-[#4B6FBF] to-[#A855F7] flex items-center justify-center text-white font-bold text-lg'>
                  {index + 1}
                </div>
                {index < howItWorks.length - 1 && (
                  <div className='w-0.5 h-full bg-gray-300 mx-auto mt-2'></div>
                )}
              </div>
              <div className='flex-1 pt-1.5'>
                <div className='bg-white p-6 rounded-lg shadow-md'>
                  <div className='flex items-center mb-3'>
                    {(() => {
                      const Icon = step.icon;
                      return <Icon className='w-5 h-5 text-[#6366F1] mr-3' />;
                    })()}
                    <h3 className='text-lg font-semibold'>{step.title}</h3>
                  </div>
                  <p className='text-gray-600'>{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* 레벨 시스템 */}
      <section className='w-full flex flex-col justify-start items-center  px-[17px] py-[50px] bg-white'>
        <h2 className='text-[18px] font-semibold text-[#3D3D3D] mb-[30px]'>
          레벨 시스템
        </h2>
        <div className='w-full flex flex-col justify-start items-start'>
          <div className='min-w-[335px] max-w-[667px] w-full overflow-x-scroll pb-2 scrollbar-hide'>
            <div
              className='flex space-x-4 px-2'
              style={{ width: 'max-content' }}
            >
              {levels.map((level, index) => (
                <div
                  key={index}
                  className='w-64 bg-white border border-gray-200 rounded-lg shadow-md p-6 flex flex-col justify-center items-center'
                >
                  <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#4B6FBF] to-[#A855F7] flex items-center justify-center text-white font-bold text-xl'>
                    {index + 1}
                  </div>
                  <h3 className='text-lg font-semibold text-center mb-1'>
                    {level.name}
                  </h3>
                  <p className='text-sm text-center text-[#6366F1] font-medium mb-4'>
                    <UserLvLabel userLv={Number(level.level)} />
                  </p>
                  <p className='text-gray-600 text-center text-sm'>
                    {level.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='mt-8 bg-white rounded-lg shadow-md p-6'>
          <h3 className='text-lg font-semibold mb-4 text-center'>
            실력 향상 추적
          </h3>
          <div className='grid grid-cols-3 gap-4'>
            <div className='text-center'>
              <div className='w-20 h-20 mx-auto mb-2 rounded-full border-4 border-[#4B6FBF] flex items-center justify-center'>
                <span className='text-xl font-bold text-[#4B6FBF]'>78%</span>
              </div>
              <p className='text-sm font-medium'>어휘력</p>
            </div>
            <div className='text-center'>
              <div className='w-20 h-20 mx-auto mb-2 rounded-full border-4 border-[#6366F1] flex items-center justify-center'>
                <span className='text-xl font-bold text-[#6366F1]'>65%</span>
              </div>
              <p className='text-sm font-medium'>문장력</p>
            </div>
            <div className='text-center'>
              <div className='w-20 h-20 mx-auto mb-2 rounded-full border-4 border-[#A855F7] flex items-center justify-center'>
                <span className='text-xl font-bold text-[#A855F7]'>82%</span>
              </div>
              <p className='text-sm font-medium'>표현력</p>
            </div>
          </div>
        </div>
      </section>
      {/* 사용자 후기 */}
      <section className='w-full flex flex-col justify-start items-center  px-[17px] py-[50px]'>
        <h2 className='text-[18px] font-semibold text-[#3D3D3D] mb-[30px]'>
          사용자 후기
        </h2>
        <div className='w-full flex flex-col justify-start items-start'>
          <div className='min-w-[335px] max-w-[667px] w-full overflow-x-scroll pb-2 scrollbar-hide'>
            <div className='flex space-x-4 min-w-max px-2'>
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className='w-80 bg-white rounded-lg shadow-md p-6'
                >
                  <div className='flex items-center mb-4'>
                    <div className='w-12 h-12 rounded-full bg-gradient-to-r from-[#4B6FBF] to-[#A855F7] flex items-center justify-center text-white font-bold text-lg mr-3'>
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className='font-semibold'>{testimonial.name}</h3>
                      <p className='text-sm text-gray-500'>
                        {testimonial.age}세
                      </p>
                    </div>
                  </div>
                  <div className='flex mb-3'>
                    <StarRating score={testimonial.rating} />
                  </div>
                  <p className='text-gray-600'>{testimonial.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* 무료 체험하기 */}
      <section
        className='w-full min-h-[273px] object-cover object-center bg-cover bg-center flex justify-center items-center'
        style={{ backgroundImage: `url(${serviceBg})` }}
      >
        <div className='flex flex-col justify-between items-center w-[287px] h-[180px]'>
          <section className='flex flex-col justify-center items-center text-center text-[#ffffff]'>
            <h2 className='text-[24px] font-extrabold'>
              지금 무료로 시작해보세요
            </h2>
            <p className='text-[14px] mt-[12px]'>
              매일 5분, 예술과 함께하는 영어 회화로 자연스럽게 영어 실력을
              향상시키세요.
            </p>
          </section>
          <button
            onClick={() => navigate('/talkList')}
            className='w-full flex flex-col justify-center items-center bg-[#F9FAFB] h-[48px] rounded-[4px] text-[#4B6FBF] font-semibold text-[14px] cursor-pointer shadow-[0_2px_4px_0_rgba(0,0,0,0.1)]'
          >
            무료 체험해보기
          </button>
        </div>
      </section>
      {/* 자주 묻는 질문 */}
      <section className='w-full flex flex-col justify-start items-center  px-[17px] py-[50px] bg-white'>
        <h2 className='text-[18px] font-semibold text-[#3D3D3D] mb-[30px]'>
          자주 묻는 질문
        </h2>
        <div className='w-full'>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className='mb-4 border border-gray-200 rounded-lg overflow-hidden'
            >
              <button
                className='w-full px-6 py-4 text-left font-medium flex justify-between items-center focus:outline-none cursor-pointer'
                onClick={() => toggleFaq(index)}
              >
                <span>{faq.question}</span>
                {activeFaq === index ? (
                  <ChevronUpIcon className='w-5 h-5 text-[#6366F1]' />
                ) : (
                  <ChevronDownIcon className='w-5 h-5 text-[#6366F1]' />
                )}
              </button>
              <div
                className={`px-6 pb-4 ${
                  activeFaq === index ? 'block' : 'hidden'
                }`}
              >
                <p className='text-gray-600'>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Service;
