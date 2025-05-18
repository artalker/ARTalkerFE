import UserLvLabel from '../../common/UserLvLabel';

const UserLevelSection = () => {
  return (
    <div className='w-[335px] h-[90px] flex flex-col justify-between items-start'>
      <div>
        <UserLvLabel userLv={1} />
      </div>
      <div></div>
    </div>
  );
};

export default UserLevelSection;
