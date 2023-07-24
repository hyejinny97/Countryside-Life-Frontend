import { useSelector } from 'react-redux';
import { redirect, useLoaderData } from 'react-router-dom';
import { Page, Badge, Line } from '@components/ui';
import { 
    UserImage, 
    WriterInfo, 
    MutateLinks, 
    Like, 
    ArticleImageList, 
    ArticleCntList, 
    CommentForm,
    Comment
} from '@components/community';
import { store, communityApi, useFetchArticleQuery } from '@store';
import { PATH_COMMUNITY } from '@constants';

async function loader({ params:{articleId} }) {
    await store.dispatch(communityApi.endpoints.fetchArticle.initiate(articleId));

    return articleId;
}

async function action({ params:{articleId} }) {
    await store.dispatch(communityApi.endpoints.deleteArticle.initiate(articleId));
    return redirect(PATH_COMMUNITY);
}

function CommunityDetail() {
    const articleId = useLoaderData();
    const { data:{
        category, 
        title,
        content,
        article_images,
        user,
        created_at,
        comments,
        like_users,
    }, error } = useFetchArticleQuery(articleId);
    const authenticatedUser = useSelector(state => state.user);

    return (
        <Page className='CommunityDetail'>
            <div className='CommunityDetail__head'>
                <Badge primary md>{ category }</Badge>
                <h2 className='CommunityDetail__title'>{ title }</h2>
                <div className='CommunityDetail__head-bottom'>
                    <div className='CommunityDetail__user-info'>
                        <UserImage imageUrl={user.image} />
                        <WriterInfo nickName={user.nickname} createdTime={created_at} />
                    </div>
                    {user.id === authenticatedUser.id ?
                        <MutateLinks article editPath='/community/edit' articleId={+articleId} />:
                        <Like />
                    }
                </div>
            </div>
            <Line secondaryLight />
            <div className='CommunityDetail__body'>
                <p className='CommunityDetail__content'>{content}</p>
                <ArticleImageList data={article_images} />
                <ArticleCntList likesCnt={like_users.length} commentsCnt={comments.length} />
            </div>
            <Line secondaryLight />
            <div className='CommunityDetail__foot'>
                <div className='CommunityDetail__comment-input-wrap'>
                    <UserImage imageUrl={user.image} />
                    <CommentForm />
                </div>
                <div className='CommunityDetail__comment-list'>
                    {comments.map(comment => <Comment key={comment.id} data={comment} />)}
                </div>
            </div>
        </Page>
    );
}

export default CommunityDetail;
export {action, loader};