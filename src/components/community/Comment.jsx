import { UserImage, WriterInfo, MutateLinks } from '@components/community';

function Comment({ data }) {
    return (
        <div className='Comment'>
            <UserImage />
            <div>
                <WriterInfo />
                <p className='Comment__content'>너무 잘 익었네요!ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ</p>
            </div>
            <MutateLinks comment commentId={1} handleEditClick={(commentId) => console.log('EditClick')} handleDeleteClick={(commentId) => console.log('DeleteClick')} />
        </div>
    );
}

export default Comment;