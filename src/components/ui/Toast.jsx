import { useEffect, useRef } from 'react';

function Toast({ children }) {
    const toast = useRef();

    useEffect(() => {
        toast.current.classList.remove('Toast--hidden');
        toast.current.classList.add('Toast--show');

        setTimeout(() => {
            toast.current.classList.remove('Toast--show');
            toast.current.classList.add('Toast--hidden');
        }, 3000)
    })

    return (
        <div className='Toast' ref={toast}>
            {children}
        </div>
    );
}

export default Toast;