function nextSlideIdx({ dataLength, currentSlide }) {
  return currentSlide === dataLength - 1 ? 0 : currentSlide + 1;
}

function prevSlideIdx({ dataLength, currentSlide }) {
  return currentSlide === 0 ? dataLength - 1 : currentSlide - 1;
}

export { nextSlideIdx, prevSlideIdx };
