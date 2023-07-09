import { Link } from 'react-router-dom'
import logo from '@assets/logo_gray.png';
import { Menu } from '@components/ui';
import { footerMenuData } from '@datas/root';

function Footer() {
    const config = {
        render(item) {
            return <Link to={item.to}>{item.label}</Link>
        },
        horizontal: true,
    }

    return (
        <footer className="Footer container">
            <div className="Footer__wrap container__wrap">
                <section className="Footer__head"> 
                    <img className='Footer__logo' src={logo} alt='logo'/>
                </section>
                <section className="Footer__body"> 
                    <Menu data={footerMenuData} config={config} />
                </section>
                <section className="Footer__foot"> 
                    <p>@copyright HyeJinYun</p>
                </section>
            </div>
        </footer>
    );
}

export default Footer;