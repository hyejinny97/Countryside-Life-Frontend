import { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function Dropdown({ label='선택', options, value, onChange, className, style, title }) {
    const [isOpened, setIsOpened] = useState(false);
    const dropdown = useRef();

    useEffect(() => {
        const handleBodyClick = (e) => {
            if (dropdown?.current?.contains(e.target)) return
            
            setIsOpened(false)
        };
        document.addEventListener('click', handleBodyClick, true);

        return () => document.removeEventListener('click', handleBodyClick);
    }, [])

    const handleOptionClick = (option) => {
        setIsOpened(false);
        onChange(option);
    }

    const renderOptions = options.map(option => {
        return (
            <div className='Dropdown__option' key={option.value} onClick={() => handleOptionClick(option)}>
                {option.label}
            </div>
        );
    })

    return (
        <div className={`Dropdown ${className}`} ref={dropdown} style={style} title={title}>
            <div className='Dropdown__head' onClick={() => setIsOpened(!isOpened)}>
                {value?.label || label}
                {isOpened ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            {isOpened && 
                <div className='Dropdown__body'>
                    {renderOptions}
                </div>
            }
        </div>
    );
}

export default Dropdown;