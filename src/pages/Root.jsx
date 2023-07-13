import axios from 'axios';
import { useSelector, shallowEqual } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from '@components/root';
import { Toast } from '@components/ui';
import { silentRefresh } from '@helpers';

async function loader() {
    if (axios.defaults.headers.common.Authorization) return null;
    
    try {
        await silentRefresh();
        return null;
    } catch(e) {
        return null;
    }
}

function Root() {
    const {cnt, toastContent} = useSelector(({ toast: {cnt, toastContent} }) => {
        return {
            cnt,
            toastContent,
        }
    }, shallowEqual);

    return (
        <main className='Root'>
            <Navbar />
            <Outlet />
            <Footer />
            {cnt > 0 ? <Toast>{toastContent}</Toast> : ''}
        </main>
    );
}

export default Root;
export {loader};