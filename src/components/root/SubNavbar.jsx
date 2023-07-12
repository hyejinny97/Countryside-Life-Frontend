import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { Menu } from '@components/ui';
import { navbarMenuData } from '@datas/root';
import { PATH_SIGNUP, PATH_LOGIN, PATH_LOGOUT, PATH_MYPAGE  } from '@constants';

function SubNavbar() {
    const {nickname, profileImage} = useSelector(({ user: {nickname, profileImage} }) => {
        return {
            nickname,
            profileImage
        }
    }, shallowEqual)

    const config = {
        render(item) {
            return <Link to={item.to}>{item.label}</Link>;
        },
    }

    return (
        <section className="SubNavbar">
            <div className="SubNavbar__user">
                {!nickname ? 
                    <div className='SubNavbar__before-login'>
                        <p>로그인하세요.</p>
                        <Link to={PATH_LOGIN}>로그인</Link>
                        <Link to={PATH_SIGNUP}>회원가입</Link>
                    </div>
                    :
                    <div className='SubNavbar__after-login'>
                        <FaUserCircle className="SubNavbar__icon-user" />
                        <p className="SubNavbar__user-name"> 
                            <Link to={PATH_MYPAGE}><span className="SubNavbar__user-name--bold">{nickname}</span></Link>님
                        </p>
                        <div className="SubNavbar__logout">
                            <Link to={PATH_LOGOUT}>로그아웃</Link>
                        </div>
                    </div>
                }
            </div>
            <Menu data={navbarMenuData} config={config} />
        </section>
    );
}

export default SubNavbar;