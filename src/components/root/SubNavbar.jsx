import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Menu } from '@components/ui';
import { navbarMenuData } from '@datas/root';
import { PATH_SIGNUP, PATH_LOGIN, PATH_MYPAGE  } from '@constants';

function SubNavbar() {
    const config = {
        render(item) {
            return <Link to={item.to}>{item.label}</Link>;
        },
    }

    return (
        <section className="SubNavbar">
            <div className="SubNavbar__user">
                <div className='SubNavbar__before-login SubNavbar__before-login--hidden'>
                    <p>로그인하세요.</p>
                    <Link to={PATH_LOGIN}>로그인</Link>
                    <Link to={PATH_SIGNUP}>회원가입</Link>
                </div>
                <div className='SubNavbar__after-login'>
                    <FaUserCircle className="SubNavbar__icon-user" />
                    <p className="SubNavbar__user-name"> 
                        <Link to={PATH_MYPAGE}><span className="SubNavbar__user-name--bold">농부가될테야</span></Link>님
                    </p>
                    <div className="SubNavbar__logout">
                        <Link to='/'>로그아웃</Link>
                    </div>
                </div>
            </div>
            <Menu data={navbarMenuData} config={config} />
        </section>
    );
}

export default SubNavbar;