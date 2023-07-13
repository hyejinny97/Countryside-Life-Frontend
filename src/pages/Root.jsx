import axios from 'axios';
import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from '@components/root';
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
    return (
        <main className='Root'>
            <Navbar />
            <Outlet />
            <Footer />
        </main>
    );
}

export default Root;
export {loader};