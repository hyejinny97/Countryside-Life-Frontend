import classname from 'classnames';
import PropTypes from 'prop-types';

function Badge({
    primary,
    primaryDark,
    secondary,
    secondaryLight,
    secondaryDark,
    tertiary,
    danger,
    outline,
    sm,
    md,
    lg,
    className, 
    children,
    ...rest
}) {

    const badgeClassName = classname('Badge', {
        'primary': primary,
        'primary-dark': primaryDark,
        'secondary': secondary,
        'secondary-light': secondaryLight,
        'secondary-dark': secondaryDark,
        'tertiary': tertiary,
        'danger': danger,
        'outline': outline,
        'sm': sm,
        'md': md,
        'lg': lg,
    }, className)

    return (
        <span className={badgeClassName} {...rest}>
            {children}
        </span>
    );
}

Badge.propTypes = {
    primary: PropTypes.bool,
    primaryDark: PropTypes.bool,
    secondary: PropTypes.bool,
    secondaryLight: PropTypes.bool,
    secondaryDark: PropTypes.bool,
    tertiary: PropTypes.bool,
    danger: PropTypes.bool,
    outline: PropTypes.bool,
    sm: PropTypes.bool,
    md: PropTypes.bool,
    lg: PropTypes.bool,
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
    },
    checkOneSize: function({sm, md, lg}) {
        const count = 
            Number(!!sm) 
            + Number(!!md) 
            + Number(!!lg) 
            
        if (count > 1) {
            return new Error('Only one of sm, md, lg can be true');
        }
    }
}

export default Badge;