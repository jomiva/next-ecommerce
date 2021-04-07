import React, { useState } from "react";
import { Image, Modal } from "semantic-ui-react";
import Slider from "react-slick";
import { map } from "lodash";

const setImgs = {
  className: "carousel-screenshots",
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  swipeToSlider: true,
  slidesToScroll: 6,
};

const CarouselScreenshots = ({ title, images }) => {
  const [image, setImage] = useState(null);

  return (
    <>
      <Slider {...setImgs}>
        {map(images, (screenshot) => (
          <Image
            key={screenshot.id}
            src={screenshot.url}
            alt={screenshot.name}
            onClick={() => setImage(screenshot.url)}
          />
        ))}
      </Slider>
      <Modal open={image} onClose={() => setImage(null)} size="large">
        <Image src={image} alt={title} />
      </Modal>
    </>
  );
};

export default CarouselScreenshots;
