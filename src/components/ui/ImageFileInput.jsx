import PropTypes from 'prop-types';
import classname from 'classnames';

function ImageFileInput({ name, label, labelContent, className, ...rest }) {
    const inputClassName = classname("ImageFileInput", className)
    
    return (
        <div className={inputClassName}>
            <label className="ImageFileInput__label" htmlFor={label}>
                {labelContent}
            </label>
            <input 
                className="ImageFileInput__input" 
                type='file' 
                name={name} 
                accept='image/' 
                id={label} 
                {...rest}
            />
        </div>
    );
}

ImageFileInput.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    labelContent: PropTypes.element,
    className: PropTypes.string,
}


export default ImageFileInput;