import PropTypes from 'prop-types';
import classname from 'classnames';

function Textarea({ 
    name, 
    label, 
    maxLength, 
    rows, 
    cols,
    helpText, 
    invalidTexts, 
    placeholder, 
    left, 
    right, 
    className, 
    value,
    onChange,
}) {    
    const textareaClassName = classname('Textarea__input', {
        'Textarea__input--red': invalidTexts && invalidTexts.length >= 1 && (!left || !right),
        'Textarea__input--no-line': left || right,
    })

    const textareaContainerClassName = classname('Textarea__input-container', {
        'Textarea__input-container--no-line': !left && !right,
    })

    const renderValidTexts = invalidTexts?.map(text => {
        return <p key={text} className='Textarea__invalid-text' >{text}</p>
    })

    return (
    <div className={`Textarea ${className}`}>
        {label && <label className='Textarea__label' htmlFor={label}>{label}</label>}
        {helpText && <p className='Textarea__help-text'>{helpText}</p>}
        <div className={textareaContainerClassName}>
            <div className='Textarea__input-left'>{left}</div>
            <textarea 
                className={textareaClassName} 
                id={label} 
                name={name} 
                placeholder={placeholder} 
                rows={rows}
                maxLength={maxLength}
                onChange={(e) => onChange(e.target.value)}
            >
                {value}
            </textarea>
            <div className='Textarea__input-right'>{right}</div>
        </div>
        {renderValidTexts}
    </div>
    );
}

Textarea.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    maxLength: PropTypes.number,
    rows: PropTypes.number,
    cols: PropTypes.number,
    helpText: PropTypes.string,
    invalidTexts: PropTypes.array, 
    placeholder: PropTypes.string,
    left: PropTypes.element,
    right: PropTypes.element,
    className: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
}

export default Textarea;