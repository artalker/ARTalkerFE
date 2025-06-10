import UserLvLabel from '../../common/UserLvLabel';
import NoneUser from '../../assets/NoneUserImg.png';
import TalkProgress from '../../common/CustomProgress';

const UserLevelSection = () => {
  const userName = sessionStorage.getItem('name');
  const userLevel = sessionStorage.getItem('level');
  const userExperience = sessionStorage.getItem('experience');

  return (
    <div className='w-[335px] min-h-[90px] flex flex-col justify-between items-start mt-[20px]'>
      <div className='flex justify-between items-center w-full'>
        <div>
          <h2 className='text-[18px] font-semibold mb-[4px]'>
            안녕하세요,{' '}
            <span className='text-[#4B6FBF] font-semibold text-[18px] mr-1'>
              {userName}
            </span>
            님!
          </h2>
          <div className='flex justify-start items-center w-full gap-[6px]'>
            <UserLvLabel userLv={Number(userLevel)} />
            <p className='text-[12px] text-[#999999]'>
              현재 '{userName}'님의 진행도는{' '}
              <span className='text-[#6366F1]'>{userExperience}p</span>입니다.
            </p>
          </div>
        </div>
        <div className='w-[40px] h-[40px] rounded-full overflow-hidden border-[3px] border-[#6366F1]'>
          <img src={NoneUser} alt='noneUser' />
        </div>
      </div>
      <div>
        <TalkProgress
          value={Number(userExperience)}
          userLevel={Number(userLevel)}
        />
      </div>
    </div>
  );
};

export default UserLevelSection;
