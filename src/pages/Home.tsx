import Carousel from '../components/home/Carousel';
import ArtCategory from '../components/home/ArtCategory';
import TodayRecommendedTalk from '../components/home/TodayRecommendedTalk';
import LearningTip from '../components/home/LearningTip';

const Home = () => {
  return (
    <div className='w-full h-root flex flex-col justify-start items-center'>
      <Carousel />
      <ArtCategory />
      <TodayRecommendedTalk />
      <LearningTip />
    </div>
  );
};

export default Home;
