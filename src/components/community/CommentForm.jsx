import { BsSend } from "react-icons/bs";
import { useFetcher, useSubmit } from 'react-router-dom';
import { Input } from '@components/ui';

function CommentForm() {
    const fetcher = useFetcher();
    const submit = useSubmit();

    const commentInputProps = { 
        type: 'text', 
        name: 'content', 
        maxLength: 500, 
        invalidTexts: [], 
        placeholder: '댓글을 남겨보세요.', 
        right: <BsSend />, 
        handleRightClick: (e) => submit(e.currentTarget.closest('.CommentForm')),
        className: 'CommentForm__input', 
        // clear 
    }

    return (
        <fetcher.Form method='post' className='CommentForm'>
            <Input {...commentInputProps} />
        </fetcher.Form>
    );
}

export default CommentForm;