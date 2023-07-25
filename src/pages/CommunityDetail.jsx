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
import { store, communityApi } from '@store';
import { PATH_COMMUNITY } from '@constants';

async function loader({ params:{articleId} }) {
    const res = await store.dispatch(communityApi.endpoints.fetchArticle.initiate(articleId));
    
    return {data: res.data, articleId};
}

async function action({ request, params:{articleId} }) {
    const formData = Object.fromEntries(await request.formData());

    if (request.method === 'DELETE') {
        await store.dispatch(communityApi.endpoints.deleteArticle.initiate(articleId));
        return redirect(PATH_COMMUNITY);
    } 

    if (request.method === 'POST') {
        if (formData.hasOwnProperty('like')) {
            await store.dispatch(communityApi.endpoints.postLike.initiate(articleId));
            
            await new Promise(resolve => setTimeout(resolve, 100))
            return null;
        }
        if (formData.hasOwnProperty('content')) {
            return null;
        }
    }
}

function CommunityDetail() {
    const { data:{
        category, 
        title,
        content,
        article_images,
        user,
        created_at,
        comments,
        like_users,
    }, error, articleId} = useLoaderData();
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
                        (authenticatedUser.id !== -1 && <Like likeUsers={like_users} />)
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
                    <CommentForm disabled={authenticatedUser.id === -1} />
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