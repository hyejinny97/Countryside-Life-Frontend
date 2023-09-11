import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { Slider } from "@components/ui";
import { nextSlideIdx } from "@helpers";

function AutoPlaySlider({
  data,
  config,
  sliding,
  transitionTime,
  infinite,
  intervalTime,
}) {
  const autoSlider = useRef();
  const [currentSlide, setCurrentSlide] = useState(infinite ? 1 : 0);

  useEffect(() => {
    const interval = setInterval(() => {
      // 무한 슬라이드인 경우
      if (infinite) {
        if (currentSlide === data.length) {
          setCurrentSlide(currentSlide + 1);
          return setTimeout(() => {
            const slideList =
              autoSlider?.current.querySelector(".Slider__list");
            slideList.style.transition = "none";
            setCurrentSlide(1);
            return setTimeout(() => {
              if (sliding)
                slideList.style.transition = `transform ${transitionTime}s`;
            }, 0.1 * 1000);
          }, transitionTime * 1000);
        } else
          return setCurrentSlide(
            nextSlideIdx({ dataLength: data.length + 2, currentSlide })
          );
      }

      // 무한 슬라이드가 아닌 경우
      setCurrentSlide(nextSlideIdx({ data, currentSlide }));
    }, intervalTime * 1000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div ref={autoSlider}>
      <Slider
        data={data}
        config={config}
        sliding={sliding}
        transitionTime={transitionTime}
        infinite={infinite}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
    </div>
  );
}

AutoPlaySlider.propTypes = {
  data: PropTypes.array.isRequired,
  config: PropTypes.object.isRequired,
  sliding: PropTypes.bool,
  transitionTime: PropTypes.number,
  infinite: PropTypes.bool,
  intervalTime: PropTypes.number,
};

AutoPlaySlider.defaultProps = {
  sliding: true,
  transitionTime: 0.5,
  infinite: true,
  intervalTime: 3,
};

export default AutoPlaySlider;
