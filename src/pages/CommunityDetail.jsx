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

function action() {
    console.log('CommunityDetail action');
    return null;
}

function CommunityDetail() {
    return (
        <Page className='CommunityDetail'>
            <div className='CommunityDetail__head'>
                <Badge primary md>텃밭</Badge>
                <h2 className='CommunityDetail__title'>토마토가 빨갛게 익었어요!!!!!</h2>
                <div className='CommunityDetail__head-bottom'>
                    <div className='CommunityDetail__user-info'>
                        <UserImage />
                        <WriterInfo />
                    </div>
                    {/* <MutateLinks article editPath='/community' articleId={2} /> */}
                    <Like />
                </div>
            </div>
            <Line secondaryLight />
            <div className='CommunityDetail__body'>
                <p className='CommunityDetail__content'>
                    4월에 심은 토마토가 벌써 이렇게 자라서 빨갛게 익었어요~
                    조만간 따 먹어도 될 것 같아요ㅎㅎ
                </p>
                <ArticleImageList />
                <ArticleCntList />
            </div>
            <Line secondaryLight />
            <div className='CommunityDetail__foot'>
                <div className='CommunityDetail__comment-input-wrap'>
                    <UserImage />
                    <CommentForm />
                </div>
                <div className='CommunityDetail__comment-list'>
                    <Comment />
                    <Comment />
                </div>
            </div>
        </Page>
    );
}

export default CommunityDetail;
export {action};