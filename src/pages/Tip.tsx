import { useState } from 'react';
import CustomPagination from '../common/CustomPagination';

const Tip = () => {
  const [page, setPage] = useState<number>(1);
  const tipList = {
    items: [
      {
        no: 0,
        date: '2025.05.18',
        desc: "작품을 설명할 때는 단순히 보이는 것을 묘사하는 것보다 작품에서 느껴지는 감정과 분위기를 표현해보세요. 'I think', 'In my opinion' 대신 'This artwork evokes...' 또는 'The artist conveys...'와 같은 표현을 사용해보세요.",
      },
      {
        no: 1,
        date: '2025.05.17',
        desc: '색상과 빛의 사용이 작품의 감정을 어떻게 전달하는지 주목해보세요. 예를 들어, 빨간색은 열정이나 감정의 강도를, 파란색은 평온함이나 멜랑콜리함을 표현할 수 있습니다.',
      },
      {
        no: 2,
        date: '2025.05.16',
        desc: '작품의 구성을 분석해보세요. 화면의 중심에 있는 주요 요소는 어떤 의미를 가지는지, 배경과 전경의 관계는 어떤지 고려해보세요.',
      },
      {
        no: 3,
        date: '2025.05.15',
        desc: '작품의 시대적 배경을 이해하는 것이 중요합니다. 예술가는 그들의 작품을 통해 어떤 사회적 메시지를 전달하려고 했는지 생각해보세요.',
      },
      {
        no: 4,
        date: '2025.05.14',
        desc: '작품의 기법과 재료를 주목해보세요. 예를 들어, 유화와 수채화는 서로 다른 느낌을 전달할 수 있습니다.',
      },
      {
        no: 5,
        date: '2025.05.13',
        desc: '작품의 제목과 아티스트의 의도를 고려해보세요. 제목은 작품의 의미를 이해하는 데 중요한 단서가 될 수 있습니다.',
      },
      {
        no: 6,
        date: '2025.05.12',
        desc: '작품의 시각적 요소를 분석해보세요. 선, 모양, 질감, 공간 등이 작품의 전체적인 느낌에 어떤 영향을 미치는지 고려해보세요.',
      },
      {
        no: 7,
        date: '2025.05.11',
        desc: '작품의 상징성을 찾아보세요. 예를 들어, 새는 자유를, 나무는 생명력을, 물은 순환을 상징할 수 있습니다.',
      },
      {
        no: 8,
        date: '2025.05.10',
        desc: '작품을 설명할 때는 개인적인 경험과 연결시켜 보세요. 작품이 당신에게 어떤 감정을 불러일으키는지, 어떤 추억을 떠올리게 하는지 공유해보세요.',
      },
      {
        no: 9,
        date: '2025.05.09',
        desc: '작품의 동선을 따라가보세요. 작가가 관객이 어떤 순서로 작품을 보기를 원했는지 생각해보세요.',
      },
      {
        no: 10,
        date: '2025.05.08',
        desc: '작품의 대비와 균형을 분석해보세요. 강한 대비는 어떤 느낌을, 조화로운 균형은 어떤 분위기를 전달하는지 고려해보세요.',
      },
      {
        no: 11,
        date: '2025.05.07',
        desc: '작품의 시대적 맥락을 연구해보세요. 그 시대의 예술 트렌드와 이 작품이 어떤 관계를 맺고 있는지 생각해보세요.',
      },
      {
        no: 12,
        date: '2025.05.06',
        desc: '작품의 크기와 스케일을 고려해보세요. 큰 작품은 강한 인상을, 작은 작품은 세밀한 관찰을 요구할 수 있습니다.',
      },
      {
        no: 13,
        date: '2025.05.05',
        desc: '작품의 시대적 배경을 이해하는 것이 중요합니다. 예술가는 그들의 작품을 통해 어떤 사회적 메시지를 전달하려고 했는지 생각해보세요.',
      },
      {
        no: 14,
        date: '2025.05.04',
        desc: '작품의 감정적 반응을 표현해보세요. 작품이 당신에게 어떤 느낌을 주는지, 어떤 생각을 하게 하는지 공유해보세요.',
      },
      {
        no: 15,
        date: '2025.05.03',
        desc: '작품의 구성을 분석해보세요. 화면의 중심에 있는 주요 요소는 어떤 의미를 가지는지, 배경과 전경의 관계는 어떤지 고려해보세요.',
      },
      {
        no: 16,
        date: '2025.05.02',
        desc: '작품의 기법과 재료를 주목해보세요. 예를 들어, 유화와 수채화는 서로 다른 느낌을 전달할 수 있습니다.',
      },
      {
        no: 17,
        date: '2025.05.01',
        desc: '작품의 시대적 배경을 이해하는 것이 중요합니다. 예술가는 그들의 작품을 통해 어떤 사회적 메시지를 전달하려고 했는지 생각해보세요.',
      },
      {
        no: 18,
        date: '2025.04.30',
        desc: '작품의 색상과 빛의 사용이 작품의 감정을 어떻게 전달하는지 주목해보세요. 예를 들어, 빨간색은 열정이나 감정의 강도를, 파란색은 평온함이나 멜랑콜리함을 표현할 수 있습니다.',
      },
      {
        no: 19,
        date: '2025.04.29',
        desc: '작품의 시대적 배경을 이해하는 것이 중요합니다. 예술가는 그들의 작품을 통해 어떤 사회적 메시지를 전달하려고 했는지 생각해보세요.',
      },
      {
        no: 20,
        date: '2025.04.28',
        desc: '작품의 시대적 배경을 이해하는 것이 중요합니다. 예술가는 그들의 작품을 통해 어떤 사회적 메시지를 전달하려고 했는지 생각해보세요.',
      },
    ],
    meta: {
      total: 10,
      page: '1',
      limit: '20',
      totalPages: 1,
      search: '',
    },
  };
  return (
    <div className='w-full h-root flex flex-col justify-start items-center bg-[#F9FAFB]'>
      <section className='mt-[25px] mb-[60px]'>
        <div className='w-[335px] min-h-[142px] bg-gradient-to-r from-[#4B6FBF]/10 to-[#A857F7]/10 rounded-lg p-4'>
          <h2 className='text-[16px] font-semibold mb-2 text-[#4B6FBF]'>
            오늘의 학습 TIP!
          </h2>
          <p className='text-[12px] text-[#3D3D3D]'>{tipList.items[0].desc}</p>
        </div>
      </section>
      <section className='w-[335px] flex flex-col mb-[60px]'>
        <h2 className='ttext-[14px] font-semibold mb-[12px] text-[#3D3D3D]'>
          지난 학습 TIP
        </h2>
        <div className='flex flex-col gap-[6px]'>
          {tipList.items.slice(1).map((tip, index) => (
            <div
              key={index}
              className='w-[335px] flex flex-col justify-between items-start border-[1px] border-[#E5E5E5] px-[16px] py-[13px] bg-[#FFFFFF] rounded-lg'
            >
              <p className='mb-[4px] text-[12px] font-semibold text-[#3D3D3D]'>
                {tip.date}
              </p>
              <p className='text-[12px] text-[#817E7E]'>{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <CustomPagination
        page={page}
        total={Number(tipList.meta.total)}
        limit={10}
        onPageChange={(page: number) => setPage(page)}
      />
    </div>
  );
};

export default Tip;
