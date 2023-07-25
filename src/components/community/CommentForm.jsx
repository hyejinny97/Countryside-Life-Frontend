import PropTypes from 'prop-types';
import { BsSend } from "react-icons/bs";
import { Form, useSubmit, useNavigation } from 'react-router-dom';
import { Input } from '@components/ui';

function CommentForm({ disabled=false, initialValue=null, create=false, edit=false, commentId }) {
    const submit = useSubmit();
    const navigation = useNavigation();

    const commentInputProps = { 
        type: 'text', 
        name: 'content', 
        maxLength: 500, 
        initialValue,
        invalidTexts: [], 
        placeholder: '댓글을 남겨보세요.', 
        right: <BsSend />, 
        handleRightClick: (e) => !disabled && submit(e.currentTarget.closest('.CommentForm')),
        className: 'CommentForm__input', 
        disabled,
        clear: navigation.state === 'submitting' && navigation.formData?.get('content'), 
    }

    return (
        <Form method='post' className='CommentForm'>
            <Input {...commentInputProps} />
            <input type="hidden" name="state" value={create ? 'create' : 'edit'} />
            <input type="hidden" name="commentId" value={commentId || -1} />
        </Form>
    );
}

CommentForm.propTypes = {
    selectCreateOrEdit: function({ create, edit }) {
        const count = Number(!!create) + Number(!!edit);
        
        if (count > 1) return new Error('create과 edit 중 하나는 반드시 선택해야 함')
    },
    checkEditCase: function({ edit, commentId }) {
        if (!edit) return

        const count = Number(!!edit) + Number(!!commentId);
        
        if (count < 2) return new Error('edit일 땐, commentId를 꼭 지정해야함')
    },
};

export default CommentForm;