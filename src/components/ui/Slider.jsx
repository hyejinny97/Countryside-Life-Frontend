import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { nextSlideIdx, prevSlideIdx } from "@helpers";

function Slider({
  data,
  config,
  sliding,
  transitionTime,
  infinite,
  currentSlide,
  setCurrentSlide,
}) {
  const sliderList = useRef();

  useEffect(() => {
    const sliderListEl = sliderList.current;

    // 현재 슬라이드로 이동
    sliderListEl.style.transform = `translateX(-${currentSlide * 100}%)`;

    // 스와이프 이벤트 - 마우스
    let mouseDownX, mouseUpX;
    const handleMouseDown = (e) => {
      if (e.button !== 0) return; // e.button = 0: 마우스 왼쪽
      mouseDownX = e.clientX;
    };

    const handleMouseUp = (e) => {
      if (e.button !== 0) return; // e.button = 0: 마우스 왼쪽
      mouseUpX = e.clientX;

      const drag = mouseDownX - mouseUpX;
      if (Math.abs(drag) < window.innerWidth / 3) return;

      if (drag > 0) return handleSlideMove(currentSlide + 1);
      else return handleSlideMove(currentSlide - 1);
    };

    sliderListEl.addEventListener("mousedown", handleMouseDown);
    sliderListEl.addEventListener("mouseup", handleMouseUp);

    // 스와이프 이벤트 - 손가락 터치
    let touchStartX, touchEndX;
    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].clientX;

      const drag = touchStartX - touchEndX;
      if (Math.abs(drag) < window.innerWidth / 3) return;

      if (drag > 0) return handleSlideMove(currentSlide + 1);
      else return handleSlideMove(currentSlide - 1);
    };

    sliderListEl.addEventListener("touchend", handleTouchEnd);
    sliderListEl.addEventListener("touchstart", handleTouchStart);

    return () => {
      sliderListEl.removeEventListener("mousedown", handleMouseDown);
      sliderListEl.removeEventListener("mouseup", handleMouseUp);
      sliderListEl.removeEventListener("touchstart", handleTouchStart);
      sliderListEl.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentSlide]);

  useEffect(() => {
    const sliderListEl = sliderList.current;

    // 이동 효과 추가
    if (sliding) sliderListEl.style.transition = `transform ${transitionTime}s`;
  }, []);

  let newData = data;
  if (infinite)
    newData = [
      { ...data.at(-1), label: `${data.at(-1).label}-last-duplicated` },
      ...data,
      { ...data.at(0), label: `${data.at(0).label}-first-duplicated` },
    ];

  const handleSlideMove = (nextSlide) => {
    // 무한 슬라이드인 경우
    if (infinite) {
      setCurrentSlide(nextSlide);
      if (nextSlide === newData.length - 1) {
        return setTimeout(() => {
          sliderList.current.style.transition = `0s`;
          setCurrentSlide(1);
          return setTimeout(() => {
            if (sliding)
              sliderList.current.style.transition = `transform ${transitionTime}s`;
          }, 0.1 * 1000);
        }, transitionTime * 1000);
      }
      if (nextSlide === 0) {
        return setTimeout(() => {
          sliderList.current.style.transition = `0s`;
          setCurrentSlide(newData.length - 2);
          return setTimeout(() => {
            if (sliding)
              sliderList.current.style.transition = `transform ${transitionTime}s`;
          }, 0.1 * 1000);
        }, transitionTime * 1000);
      }
    }

    // 무한 슬라이드가 아닌 경우
    setCurrentSlide(nextSlide);
  };

  const renderSlides = newData.map((item, idx) => {
    return (
      <div className="Slider__item" key={item.label}>
        {config.renderContent(item)}
      </div>
    );
  });

  const renderDots = Array(data.length)
    .fill(0)
    .map((dot, idx) => {
      let activeDot;
      // 무한 슬라이드인 경우
      if (infinite) {
        idx = idx + 1;
        if (currentSlide === newData.length - 1 && idx === 1) activeDot = true;
        else if (currentSlide === 0 && idx === data.length) activeDot = true;
        else activeDot = idx === currentSlide;
      }
      // 무한 슬라이드가 아닌 경우
      else {
        activeDot = idx === currentSlide;
      }

      return (
        <div
          className="Slider__dot"
          key={idx}
          onClick={() => handleSlideMove(idx)}
        >
          {activeDot ? config.renderActiveDot() : config.renderInactiveDot()}
        </div>
      );
    });

  return (
    <div className="Slider">
      <div className="Slider__container">
        <div className="Slider__list" ref={sliderList}>
          {renderSlides}
        </div>
      </div>
      <div className="Slider__controller-container">
        <div
          className="Slider__controller Slider__controller--prev"
          onClick={() =>
            handleSlideMove(
              prevSlideIdx({ dataLength: newData.length, currentSlide })
            )
          }
        >
          {config.renderControllerPrev()}
        </div>
        <div
          className="Slider__controller Slider__controller--next"
          onClick={() =>
            handleSlideMove(
              nextSlideIdx({ dataLength: newData.length, currentSlide })
            )
          }
        >
          {config.renderControllerNext()}
        </div>
      </div>
      <div className="Slider__dot-container">{renderDots}</div>
    </div>
  );
}

Slider.propTypes = {
  data: PropTypes.array.isRequired,
  config: PropTypes.object.isRequired,
  sliding: PropTypes.bool,
  transitionTime: PropTypes.number,
  infinite: PropTypes.bool,
  currentSlide: PropTypes.number.isRequired,
  setCurrentSlide: PropTypes.func.isRequired,
};

Slider.defaultProps = {
  sliding: true,
  transitionTime: 0.5,
  infinite: true,
};

export default Slider;
