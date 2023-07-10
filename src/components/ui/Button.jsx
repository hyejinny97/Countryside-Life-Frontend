import classname from 'classnames';
import PropTypes from 'prop-types';

function Button({
    primary,
    primaryDark,
    secondary,
    secondaryLight,
    secondaryDark,
    tertiary,
    danger,
    outline,
    className, 
    children
}) {

    const buttonClassName = classname('Button', {
        'primary': primary,
        'primary-dark': primaryDark,
        'secondary': secondary,
        'secondary-light': secondaryLight,
        'secondary-dark': secondaryDark,
        'tertiary': tertiary,
        'danger': danger,
        'outline': outline,
    }, className)

    return (
        <button className={buttonClassName}>
            {children}
        </button>
    );
}

Button.propTypes = {
    primary: PropTypes.bool,
    primaryDark: PropTypes.bool,
    secondary: PropTypes.bool,
    secondaryLight: PropTypes.bool,
    secondaryDark: PropTypes.bool,
    tertiary: PropTypes.bool,
    danger: PropTypes.bool,
    outline: PropTypes.bool,
    checkOneColor: function({primary, primaryDark, secondary, secondaryLight, secondaryDark, tertiary, danger}) {
        const count = 
            Number(!!primary) 
            + Number(!!primaryDark) 
            + Number(!!secondary) 
            + Number(!!secondaryLight) 
            + Number(!!secondaryDark) 
            + Number(!!tertiary) 
            + Number(!!danger)
            

        if (count > 1) {
            return new Error('Only one of primary, secondary, tertiary, danger can be true');
        }
    }
}

export default Button;