import { useState } from 'react';
import { Textarea } from '@components/ui';

function ContentTextarea({ invalidTexts, initialValue }) {
    const [value, setValue] = useState(initialValue || null);

    const textareaProps = { 
        name: 'content', 
        maxLength: 5000, 
        rows: 10, 
        invalidTexts: invalidTexts || [], 
        placeholder: '본문(필수)\n- 최소 1 ~ 5,000자 이내로 작성할 수 있어요.\n- 운영 정책에 맞지 않는 경우 숨김 처리 돼요.', 
        className: 'ContentTextarea__textarea', 
        value: value,
        onChange: setValue,
    }

    return (
        <div className='ContentTextarea'>
            <Textarea {...textareaProps} />
            <span className='ContentTextarea__content-length'>
                {value?.length || 0}
                <span className='ContentTextarea__content-length--limit'>&nbsp;/&nbsp;5000</span>
            </span>
        </div>
        );
}

export default ContentTextarea;