import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { IoChatbubblesOutline } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { Button, Line } from '@components/ui';

function MyPage() {
    return (
        <div className="MyPage container">
            <div className="MyPage__wrap container__wrap">
                <div className="MyPage__profile-card">
                    <div className="MyPage__user-info">
                        <FaUserCircle className="MyPage__icon-user"/>
                        <p className="MyPage__nickname">농부가될테야</p>
                        <Link to='/edit-profile'>
                            <Button className="MyPage__button-setting" secondary outline>설정</Button>
                        </Link>
                    </div>
                    <Line secondaryLight />
                    <div className="MyPage__util-list">
                        <div className="MyPage__util-item">
                            <IoChatbubblesOutline className="MyPage__util-icon" />
                            <p className="MyPage__util-text">작성글/댓글</p>
                            <p className="MyPage__util-count">5</p>
                        </div>
                        <div className="MyPage__util-item">
                            <AiOutlineHeart className="MyPage__util-icon" />
                            <p className="MyPage__util-text">좋아요</p>
                            <p className="MyPage__util-count">13</p>
                        </div>
                    </div>
                </div>
                <div className="MyPage__content">

                </div>
            </div>
        </div>
    );
}

export default MyPage;