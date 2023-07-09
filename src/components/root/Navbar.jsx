import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineArrowDown } from "react-icons/ai";
import logo from '@assets/logo.png';
import { SubNavbar } from '@components/root';
import { Menu } from '@components/ui';
import { navbarMenuData } from '@datas/root';

function Navbar() {
    const [showUserInfo, setShowUserInfo] = useState(false);
    const [showSubNavbar, setShowSubNavbar] = useState(false);

    const config = {
        render(item) {
            return <Link to={item.to}>{item.label}</Link>;
        },
        horizontal: true,
    }

    return (
        <div>
            <nav className='Navbar container'>
                <div className='Navbar__wrap container__wrap'>
                    <section className='Navbar__head'>
                        <Link to='/'><img className='Navbar__logo' src={logo} alt='logo'/></Link>
                        <RxHamburgerMenu className='Navbar__icon-burger' onClick={() => setShowSubNavbar(!showSubNavbar)} />
                    </section>
                    <section className='Navbar__body'>
                        <Menu data={navbarMenuData} config={config} />
                    </section>
                    <section className='Navbar__foot'>
                        <div className='Navbar__before-login Navbar__before-login--hidden'>
                            <Link className="Navbar__utils-link" to='/'>로그인</Link>
                            <Link className="Navbar__utils-link" to='/'>회원가입</Link>
                        </div>
                        <div className="Navbar__after-login">
                            <div className="Navbar__icons" onClick={() => setShowUserInfo(!showUserInfo)}>
                                <FaUserCircle className="Navbar__icon-user" />
                                <AiOutlineArrowDown className="Navbar__icon-down" />
                            </div>
                            <div className={`Navbar__user-info ${!showUserInfo && 'Navbar__user-info--hidden'}`}>
                                <p className="Navbar__user-name">
                                    <span className="Navbar__user-name--bold">농부가될테야</span>님
                                </p>
                                <Link className="Navbar__mypage" style={{display: 'block'}} to='/'>마이페이지</Link>
                                <Link className="Navbar__logout-link" style={{display: 'block'}} to='/'>로그아웃</Link>
                            </div>
                        </div>
                    </section>
                </div>
            </nav>
            {showSubNavbar && <SubNavbar />}
        </div>
    );
}

export default Navbar;