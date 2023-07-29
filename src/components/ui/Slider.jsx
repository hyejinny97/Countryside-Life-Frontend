import { useEffect, useRef } from 'react';
import {nextSlideIdx, prevSlideIdx} from '@helpers';

function Slider({ data, config, transitionTime=0, currentSlide=0, onClick }) {
    const sliderList = useRef();

    useEffect(() => {
        if (transitionTime) sliderList.current.style.transition = `transform ${transitionTime}s`;
        sliderList.current.style.transform = `translateX(-${currentSlide * 100}%)`
    }, [currentSlide])

    const renderSlides = data.map(item => {
        return (
            <div className="Slider__item" key={item.label}>
                {config.renderContent(item)}
            </div>
        );
    })

    const renderDots = Array(data.length).fill(0).map((dot, idx) => {
        return (
            <div className='Slider__dot' key={idx} onClick={() => onClick(idx)}>
                {idx === currentSlide ? config.renderActiveDot() : config.renderInactiveDot()}
            </div>
        );
    })

    return (
        <div className="Slider">
            <div className="Slider__container">
                <div className="Slider__list" ref={sliderList}>
                    {renderSlides}
                </div>
            </div>
            <div className='Slider__controller-container'>
                <div 
                    className='Slider__controller Slider__controller--prev'
                    onClick={() => onClick(prevSlideIdx({ data, currentSlide }))}
                >
                    {config.renderControllerPrev()}
                </div>
                <div 
                    className='Slider__controller Slider__controller--next'
                    onClick={() => onClick(nextSlideIdx({ data, currentSlide }))}
                >
                    {config.renderControllerNext()}
                </div>
            </div>
            <div className='Slider__dot-container'> 
                {renderDots}
            </div>
        </div>
    );
}

export default Slider;