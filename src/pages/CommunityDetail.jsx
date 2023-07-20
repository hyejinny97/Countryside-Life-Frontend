import { Page, Badge, Line } from '@components/ui';
import { UserImage, WriterInfo, MutateLinks, Like } from '@components/community';

function action() {
    console.log('CommunityDetail action');
    return null;
}

function CommunityDetail() {
    console.log('디테일 컴포넌트')
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
                    {/* <MutateLinks comment commentId={1} handleEditClick={(commentId) => console.log('EditClick')} handleDeleteClick={(commentId) => console.log('DeleteClick')} /> */}
                    <Like />
                </div>
            </div>
            <Line secondaryLight />
        </Page>
    );
}

export default CommunityDetail;
export {action};