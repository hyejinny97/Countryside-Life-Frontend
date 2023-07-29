function nextSlideIdx({ data, currentSlide }) {
    return currentSlide === data.length - 1 ? 0 : currentSlide + 1;
}

function prevSlideIdx({ data, currentSlide }) {
    return currentSlide === 0 ? data.length - 1 : currentSlide - 1;
}

export {nextSlideIdx, prevSlideIdx};