import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Banner01 from '../../assets/banner/banner01.png';
import Banner02 from '../../assets/banner/banner02.png';
import Banner03 from '../../assets/banner/banner03.png';
import Banner04 from '../../assets/banner/banner04.png';
import Banner05 from '../../assets/banner/banner05.png';

const Carousel = () => {
  const bannerList = [Banner01, Banner02, Banner03, Banner04, Banner05];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 7000,
    slidesToShow: 1,
    slidesToScroll: 1,
    // dotsClass: 'slick-dots',
  };

  return (
    <div className='w-full'>
      <Slider {...settings}>
        {bannerList.map((banner, index) => (
          <div key={index} className='flex justify-center'>
            <img src={banner} alt={`banner-${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
