import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { IoMdClose } from "react-icons/io";

function Modal({ 
    closeIcon=<IoMdClose />, 
    children, 
    handleModalClose 
}) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = 'visible';
    }, [])

    return (
        <div className='Modal'>
            <div className='Modal__overlay' onClick={handleModalClose}></div>
            <div className='Modal__container'>
                <div className='Modal__icon-close' onClick={handleModalClose}>
                    {closeIcon}
                </div>
                {children}
            </div>
        </div>
    );
}

Modal.propTypes = {
    closeIcon: PropTypes.element,
    children: PropTypes.node,
    handleModalClose: PropTypes.func,
};

export default Modal;