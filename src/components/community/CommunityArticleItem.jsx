import { Link } from 'react-router-dom';
import { CiLocationOn } from "react-icons/ci";
import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { Badge } from '@components/ui';

function CommunityArticleItem({ data }) {
    const cntData = [
        {label: 'likes', icon: <AiOutlineHeart />, value: 15},
        {label: 'comments', icon: <HiOutlineChatBubbleOvalLeft />, value: 5},
    ];

    const renderCntItems = cntData.map(item => {
        return (
            <li className='CommunityArticleItem__cnt-item' key={item.label}>
                {item.icon}
                <span>{item.value}</span>
            </li>
        );
    })

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
                <div className='CommunityArticleItem__article-image-list'>
                    <img className='CommunityArticleItem__article-image' src='https://i.namu.wiki/i/qDlZMYpqfH2RERMiiXssiA1qC1qFIsXXHO-nWCleYJoLUxyb3CeDP615OCwVuW9lnFrj2ujI00BVi5C85Zzbnw.webp' alt='article 이미지'/>
                    <img className='CommunityArticleItem__article-image' src='https://i.namu.wiki/i/sLpl_9SaPt63LS9uKn7ptjw1GtopAOeL-fVSbFHsfwm2ZKwywO-4rd91q_MPds0-pXHkGqRyAj6u366J2-SygA.webp' alt='article 이미지'/>
                    <img className='CommunityArticleItem__article-image' src='https://cdn.pet-news.or.kr/news/photo/202304/2914_4458_5921.jpg' alt='article 이미지'/>
                </div>
            </div>
            <div className='CommunityArticleItem__foot'>
                <ul className='CommunityArticleItem__cnt-list'>
                    {renderCntItems}
                </ul>
                <span className='CommunityArticleItem__created-time'>2023.07.18</span>
            </div>
        </div>
    );
}

export default CommunityArticleItem;