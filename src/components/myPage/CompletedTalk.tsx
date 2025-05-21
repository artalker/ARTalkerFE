const CompletedTalk = ({ data }: { data: any }) => {
  return (
    <div>
      완료한 대화
      {data.items.map((item: any) => (
        <div key={item.no}>{item.title}</div>
      ))}
    </div>
  );
};

export default CompletedTalk;
