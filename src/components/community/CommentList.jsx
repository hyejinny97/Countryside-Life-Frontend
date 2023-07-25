import { Comment } from '@components/community';

function CommentList({ data }) {
    const renderComments = data.map(comment => {
        return <Comment key={comment.id} data={comment} />
    })

    return renderComments;
}

export default CommentList;