import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { slide_apple, slide_house, slide_countryside } from '@assets';
import { AutoPlaySlider } from '@components/ui';

function IntroSlider() {
    const data = [
        {label: '귀농/귀촌', text: '귀농/귀촌을\n계획 중이신가요?', image: slide_apple},
        {label: '전원생활', text: '시골에서의 전원생활을\n꿈꾸시나요?', image: slide_house},
        {label: '공유', text: '시골 생활을 공유해보세요.', image: slide_countryside},
    ];

    const config = {
        renderContent: (data) => {
            return (
                <div className='IntroSlider__item'>
                    <img className='IntroSlider__image' src={data.image} alt={`${data.label} 이미지`} />
                    <p className='IntroSlider__text'>{data.text}</p>
                </div>
            );
        },
        renderControllerPrev: () => <IoIosArrowBack className='IntroSlider__controller IntroSlider__controller--prev' />,
        renderControllerNext: () => <IoIosArrowForward className='IntroSlider__controller IntroSlider__controller--next' />,
        renderInactiveDot: () => <div className='IntroSlider__dot IntroSlider__dot--inactive'></div>,
        renderActiveDot: () => <div className='IntroSlider__dot IntroSlider__dot--active'></div>,
    };

    return (
        <div className="IntroSlider">
            <AutoPlaySlider data={data} config={config} />
        </div>
    );
}

export default IntroSlider;