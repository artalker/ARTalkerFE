import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Banner01 from '../../assets/banner/banner01.png';
import Banner02 from '../../assets/banner/banner02.png';
import Banner03 from '../../assets/banner/banner03.png';
import Banner05 from '../../assets/banner/banner05.png';
import Banner06 from '../../assets/banner/banner06.png';
import { useNavigate } from 'react-router-dom';

const Carousel = () => {
  const navigate = useNavigate();

  const bannerList = [Banner06, Banner01, Banner02, Banner03, Banner05];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 7000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className='w-full'>
      <Slider {...settings}>
        {bannerList.map((banner, index) => (
          <div
            key={index}
            onClick={() => navigate(`/service`)}
            className='flex justify-center cursor-pointer'
          >
            <img src={banner} alt={`banner-${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
