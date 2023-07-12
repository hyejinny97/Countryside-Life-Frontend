import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from '@components/root';
import { silentRefresh } from '@helpers';

async function loader() {
    try {
        silentRefresh();
        return null;
    } catch(e) {
        console.log(e);
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