import React from 'react';
import Carousel from '../components/home/Carousel';
import ArtCategory from '../components/home/ArtCategory';

const Home = () => {
  return (
    <div className='w-full h-root flex flex-col justify-start items-center'>
      <Carousel />
      <div className='w-full pt-[45px]'>
        <ArtCategory />
      </div>
    </div>
  );
};

export default Home;
