import { Link } from 'react-router-dom';
import { CiLocationOn } from "react-icons/ci";
import { Badge } from '@components/ui';
import { ArticleImageList, ArticleCntList } from '@components/community';

function CommunityArticleItem({ data }) {
    return (
        <div className='CommunityArticleItem'>
            <div className='CommunityArticleItem__head'>
                <Badge primary md>텃밭</Badge>
                <div className='CommunityArticleItem__location'>
                    <CiLocationOn className='CommunityArticleItem__location-icon'/>
                    <p className='CommunityArticleItem__location-text'>문경시</p>
                </div>
            </div>
            <div className='CommunityArticleItem__body'>
                <Link className='CommunityArticleItem__title' to='/'>토마토가 빨갛게 익었어요!1111111111111111111111</Link>
                <Link className='CommunityArticleItem__content' to='/'>4월에 심은 토마토가 벌써 이렇게 자라서 빨갛게 익었어요! 조만간 따 먹어도 될 것 같아욯ㅎ</Link>
                <ArticleImageList />
            </div>
            <div className='CommunityArticleItem__foot'>
                <ArticleCntList />
                <span className='CommunityArticleItem__created-time'>2023.07.18</span>
            </div>
        </div>
    );
}

export default CommunityArticleItem;