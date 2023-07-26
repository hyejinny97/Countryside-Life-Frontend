import axios from 'axios';
import { useSelector, shallowEqual } from 'react-redux';
import { Link, redirect, useLoaderData } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { IoChatbubblesOutline } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { Button, Line, Page, Pagination } from '@components/ui';
import { CommunityArticleList } from '@components/community';
import { PATH_EDITPROFILE, PATH_LOGIN, PATH_MYPAGE } from '@constants';
import { silentRefresh } from '@helpers';
import { communityApi, store } from '@store';

async function loader({ request }) {
    try {
        if (!axios.defaults.headers.common.Authorization) await silentRefresh();
    } catch(e) {
        return redirect(PATH_LOGIN);
    }
    
    const accessToken = axios.defaults.headers.common.Authorization;
    const url = new URL(request.url);
    const activity = url.searchParams.get('activity') || 'articles';
    const page = url.searchParams.get('page') || 1;

    try {
        const articleRes = await store.dispatch(communityApi.endpoints.fetchUserArticles.initiate({accessToken, page: activity === 'articles' ? page : 1}));
        const commentsRes = await store.dispatch(communityApi.endpoints.fetchUserComments.initiate({accessToken, page: activity === 'comments' ? page : 1}));
        const likeRes = await store.dispatch(communityApi.endpoints.fetchUserLikes.initiate({accessToken, page: activity === 'likes' ? page : 1}));

        return {activity, articleData: articleRes.data, commentData: commentsRes.data, likeData: likeRes.data}
    } catch(e) {
        return {error: e}
    }
}

function MyPage() {
    const {activity, articleData, commentData, likeData, error} = useLoaderData();
    const {nickname, profileImage} = useSelector(({ user: {nickname, profileImage} }) => {
        return {
            nickname,
            profileImage
        }
    }, shallowEqual);
    
    let data;
    switch (activity) {
        case 'articles':
            data = articleData;
            break
        case 'comments':
            data = commentData;
            break;
        case 'likes':
            data = likeData;
            break
        default:
            data = articleData;
    }

    return (
        <Page className="MyPage">
            <div className="MyPage__profile-card">
                <div className="MyPage__user-info">
                    {profileImage ? 
                        <img className="MyPage__image" src={profileImage} alt='profile' /> :
                        <FaUserCircle className="MyPage__icon-user"/>
                    }
                    <p className="MyPage__nickname">{nickname}</p>
                    <Link to={PATH_EDITPROFILE}>
                        <Button className="MyPage__button-setting" secondary outline>설정</Button>
                    </Link>
                </div>
                <Line secondaryLight />
                <div className="MyPage__util-list">
                    <Link to={`${PATH_MYPAGE}?activity=articles`} className="MyPage__util-item">
                        <IoChatbubblesOutline className="MyPage__util-icon" />
                        <p className="MyPage__util-text">작성글/댓글</p>
                        <p className="MyPage__util-count">{articleData.count + commentData.count}</p>
                    </Link>
                    <Link to={`${PATH_MYPAGE}?activity=likes`} className="MyPage__util-item">
                        <AiOutlineHeart className="MyPage__util-icon" />
                        <p className="MyPage__util-text">좋아요</p>
                        <p className="MyPage__util-count">{likeData.count}</p>
                    </Link>
                </div>
            </div>
            <div className="MyPage__content">
                <div className='MyPage__activity-tab-list'>
                    {activity === 'articles' || activity === 'comments' ?
                        <>
                            <Link className={`MyPage__activity-tab-item ${activity === 'articles' ? 'active' : ''}`} to={`${PATH_MYPAGE}?activity=articles`}>작성 글({articleData.count})</Link>
                            <Link className={`MyPage__activity-tab-item ${activity === 'comments' ? 'active' : ''}`} to={`${PATH_MYPAGE}?activity=comments`}>작성 댓글({commentData.count})</Link>
                        </>:
                        <Link className={`MyPage__activity-tab-item ${activity === 'likes' ? 'active' : ''}`} to={`${PATH_MYPAGE}?activity=likes`}>좋아요한 글({likeData.count})</Link>                    
                    }
                </div>
                <Line secondaryLight />
                <CommunityArticleList data={data.results}/>
                <Pagination dataCnt={data.count} />
            </div> 
        </Page>
    );
}

export default MyPage;
export {loader};