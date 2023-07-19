import { useState } from 'react';
import { Form } from 'react-router-dom';
import { Page, Input, Button } from '@components/ui';
import { CategoryDropdown, SimpleRegionDropdown, ContentTextarea, ArticleImageInput } from '@components/community';

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
            <Form method="post" encType="multipart/form-data">
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
                <ContentTextarea />
                <ArticleImageInput />
                <div className='CreateCommunity__button-wrap'>
                    <Button primaryDark className='CreateCommunity__button'>작성 완료</Button>
                </div>
            </Form>
        </Page>
    );
}

export default CreateCommunity;