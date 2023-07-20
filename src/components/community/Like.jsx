import { useSelector } from 'react-redux';
import { useFetcher } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function Like({ likeUsers=[] }) {
    const fetcher = useFetcher();
    const authenticatedUserId = useSelector(state => state.user.id);
    
    let liked = likeUsers.some(likeUser => likeUser.id === authenticatedUserId);
    if (fetcher.formData) {
        liked = fetcher.formData.get('like') === 'true';
    }

    return (
        <fetcher.Form method='post' className="Like">
            <button
                name='like'
                value={liked ? 'false': 'true'}
            >
                {liked ? <AiFillHeart className="Like__full-heart" /> : <AiOutlineHeart className="Like__empty-heart" />}
            </button>
        </fetcher.Form>
    );
}

export default Like;