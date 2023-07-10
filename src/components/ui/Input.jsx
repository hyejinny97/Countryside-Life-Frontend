import {useState} from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';

function Input({ type, name, label, helpText, invalidTexts, placeholder, left, right, className }) {    
    const [value, setValue] = useState('');

    const inputClassName = classname('Input__input', {
        'Input__input--red': invalidTexts && invalidTexts.length >= 1 && (!left || !right),
        'Input__input--no-line': left || right,
    })

    const inputContainerClassName = classname('Input__input-container', {
        'Input__input-container--no-line': !left && !right,
    })

    const renderValidTexts = invalidTexts?.map(text => {
        return <p key={text} className='Input__invalid-text' >{text}</p>
    })

    return (
    <div className={`Input ${className}`}>
        {label && <label className='Input__label' for={label}>{label}</label>}
        {helpText && <p className='Input__help-text'>{helpText}</p>}
        <div className={inputContainerClassName}>
            <div className='Input__input-left'>{left}</div>
            <input 
                className={inputClassName} 
                type={type} 
                id={label} 
                name={name} 
                placeholder={placeholder} 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                />
            <div className='Input__input-right'>{right}</div>
        </div>
        {renderValidTexts}
    </div>
    );
}

Input.propTypes = {
    type: PropTypes.oneOf(['text', 'password']),
    name: PropTypes.string,
    label: PropTypes.string,
    helpText: PropTypes.string,
    invalidTexts: PropTypes.array, 
    placeholder: PropTypes.string,
    left: PropTypes.element,
    right: PropTypes.element,
    className: PropTypes.string,
}

export default Input;