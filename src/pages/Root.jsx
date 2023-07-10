import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from '@components/root';

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