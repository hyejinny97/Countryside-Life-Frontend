import { useState, useEffect } from 'react';
import { Slider } from '@components/ui';
import { nextSlideIdx } from '@helpers';

function AutoPlaySlider({ data, config, intervalTime=3 }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(nextSlideIdx({ data, currentSlide }));
        }, intervalTime * 1000);

        return () => clearInterval(interval);
    }, [currentSlide])

    const handleSlideMove = (slideIdx) => {
        setCurrentSlide(slideIdx);
    }

    return (
        <Slider data={data} config={config} currentSlide={currentSlide} onClick={handleSlideMove} />
    );
}

export default AutoPlaySlider;