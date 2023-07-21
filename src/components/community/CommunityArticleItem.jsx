import { Link } from 'react-router-dom';
import { CiLocationOn } from "react-icons/ci";
import { Badge } from '@components/ui';
import { ArticleImageList, ArticleCntList } from '@components/community';
import { strToDate } from '@utils';
import { PATH_COMMUNITY } from '@constants';

function CommunityArticleItem({ data }) {
    const { 
        id:articleId, 
        title,
        content,
        category,
        region,
        user,
        article_images,
        created_at,
        updated_at,
        like_users,
        comments,
        comments_cnt,
    } = data;

    return (
        <div className='CommunityArticleItem'>
            <div className='CommunityArticleItem__head'>
                <Badge primary md>{category}</Badge>
                <div className='CommunityArticleItem__location'>
                    <CiLocationOn className='CommunityArticleItem__location-icon'/>
                    <p className='CommunityArticleItem__location-text'>{region}</p>
                </div>
            </div>
            <div className='CommunityArticleItem__body'>
                <Link className='CommunityArticleItem__title' to={`${PATH_COMMUNITY}/${articleId}`}>{title}</Link>
                <Link className='CommunityArticleItem__content' to='/'>{content}</Link>
                <ArticleImageList data={article_images} />
            </div>
            <div className='CommunityArticleItem__foot'>
                <ArticleCntList likesCnt={like_users.length} commentsCnt={comments_cnt} />
                <span className='CommunityArticleItem__created-time'>{strToDate(created_at)}</span>
            </div>
        </div>
    );
}

export default CommunityArticleItem;