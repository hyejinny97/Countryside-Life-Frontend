import { useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineArrowDown } from "react-icons/ai";
import logo from '@assets/logo.png';
import { SubNavbar } from '@components/root';
import { Menu } from '@components/ui';
import { navbarMenuData } from '@datas/root';
import { PATH_ROOT, PATH_SIGNUP, PATH_LOGIN, PATH_LOGOUT, PATH_MYPAGE  } from '@constants';

function Navbar() {
    const [showUserInfo, setShowUserInfo] = useState(false);
    const [showSubNavbar, setShowSubNavbar] = useState(false);
    const {nickname, profileImage} = useSelector(({ user: {nickname, profileImage} }) => {
        return {
            nickname,
            profileImage
        }
    }, shallowEqual)
    const location = useLocation();

    useEffect(() => {
        setShowUserInfo(false);
        setShowSubNavbar(false);
    }, [location]);

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
                        <Link to={PATH_ROOT}><img className='Navbar__logo' src={logo} alt='logo'/></Link>
                        <RxHamburgerMenu className='Navbar__icon-burger' onClick={() => setShowSubNavbar(!showSubNavbar)} />
                    </section>
                    <section className='Navbar__body'>
                        <Menu data={navbarMenuData} config={config} />
                    </section>
                    <section className='Navbar__foot'>
                        { !nickname ? 
                            <div className='Navbar__before-login'>
                                <Link className="Navbar__utils-link" to={PATH_LOGIN}>로그인</Link>
                                <Link className="Navbar__utils-link" to={PATH_SIGNUP}>회원가입</Link>
                            </div>
                            :
                            <div className="Navbar__after-login">
                                <div className="Navbar__icons" onClick={() => setShowUserInfo(!showUserInfo)}>
                                    {profileImage ? 
                                        <img className="Navbar__image" src={profileImage} alt='profile' /> :
                                        <FaUserCircle className="Navbar__icon-user" />
                                    }
                                    <AiOutlineArrowDown className="Navbar__icon-down" />
                                </div>
                                <div className={`Navbar__user-info ${!showUserInfo && 'Navbar__user-info--hidden'}`}>
                                    <p className="Navbar__user-name">
                                        <span className="Navbar__user-name--bold">{nickname}</span>님
                                    </p>
                                    <Link className="Navbar__mypage" style={{display: 'block'}} to={PATH_MYPAGE}>마이페이지</Link>
                                    <Link className="Navbar__logout-link" style={{display: 'block'}} to={PATH_LOGOUT}>로그아웃</Link>
                                </div>
                            </div>
                        }
                    </section>
                </div>
            </nav>
            {showSubNavbar && <SubNavbar />}
        </div>
    );
}

export default Navbar;