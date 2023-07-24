import { useState } from 'react';
import { Input } from '@components/ui';

function TitleInput({ invalidTexts, initialValue }) {
    const [titleLength, setTitleLength] = useState(initialValue?.length || 0);

    const titleInputProps = { 
        type: 'text', 
        name: 'title', 
        placeholder: '제목(필수)', 
        maxLength: 50,
        initialValue,
        getValue: (value) => setTitleLength(value.length),
        invalidTexts: invalidTexts || [], 
        className: 'TitleInput__title-input', 
    }

    return (
        <div className='TitleInput__title-wrap'>
            <Input {...titleInputProps} />
            <span className='TitleInput__title-length'>
                {titleLength}
                <span className='TitleInput__title-length--limit'>&nbsp;/&nbsp;50</span>
            </span>
        </div>
    );
}

export default TitleInput;