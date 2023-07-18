import { useState } from 'react';
import { Form } from 'react-router-dom';
import { Page, Input } from '@components/ui';
import { CategoryDropdown, SimpleRegionDropdown } from '@components/community';

function CreateCommunity() {
    const [titleLength, setTitleLength] = useState(0);

    const titleInputProps = { 
        type: 'text', 
        name: 'title', 
        placeholder: '제목(필수)', 
        maxLength: 50,
        getValue: (value) => setTitleLength(value.length),
        invalidTexts: [], 
        className: 'CreateCommunity__title-input', 
    }

    return (
        <Page className='CreateCommunity'>
            <Form>
                <div className='CreateCommunity__dropdown-list'>
                    <CategoryDropdown />
                    <SimpleRegionDropdown />
                </div>
                <div className='CreateCommunity__title-wrap'>
                    <Input {...titleInputProps} />
                    <span className='CreateCommunity__title-length'>
                        {titleLength}
                        <span className='CreateCommunity__title-length--limit'>&nbsp;/&nbsp;50</span>
                    </span>
                </div>
            </Form>
        </Page>
    );
}

export default CreateCommunity;