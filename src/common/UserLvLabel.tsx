const UserLvLabel = ({ userLv }: { userLv: number }) => {
  return (
    <div
      className={`w-[44px] h-[20px] rounded-[10px] flex justify-center items-center text-[12px] font-normal text-[#ffffff]
  ${
    userLv === 1
      ? 'bg-[#CDA8FA]'
      : userLv === 2
      ? 'bg-[#BA9CF9]'
      : userLv === 3
      ? 'bg-[#A48FF7]'
      : userLv === 4
      ? 'bg-[#8E81F5]'
      : userLv === 5
      ? 'bg-[#8179F4]'
      : userLv === 6
      ? 'bg-[#7772F3]'
      : userLv === 7
      ? 'bg-[#6366F1]'
      : null
  }
    `}
    >
      Lv.{userLv}
    </div>
  );
};

export default UserLvLabel;
