import { useState } from 'react';
import { Form } from 'react-router-dom';
import { AiFillCloseCircle } from "react-icons/ai";
import { Page, Input, Button } from '@components/ui';
import { CategoryDropdown, SimpleRegionDropdown, ContentTextarea, ArticleImageInput } from '@components/community';

function CreateCommunity() {
    const [titleLength, setTitleLength] = useState(0);
    const [images, setImages] = useState([]);

    const handleImageUpload = (files) => {
        const imageUrl = URL.createObjectURL(files[0]);
        setImages([...images, {file: files[0], imageUrl}]);
    }

    const handleImageRemove = (curImage) => {
        setImages(images.filter(image => image !== curImage));
    }

    const renderImages = images.map(image => {
        return (
            <div className='CreateCommunity__upload-image-item'>
                <img key={image.imageUrl} className='CreateCommunity__upload-image' src={image.imageUrl} alt='업로드이미지' />
                <AiFillCloseCircle onClick={() => handleImageRemove(image)} />
            </div>
        );
    })

    const newFileList = new DataTransfer();
    images.map(image => newFileList.items.add(image.file));

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
                <div className='CreateCommunity__upload-image-wrap'>
                    <div className='CreateCommunity__upload-image-list'>
                        {images.length < 3 && <ArticleImageInput value={newFileList.files} onChange={handleImageUpload} />}
                        {renderImages}
                    </div>
                    <span className='CreateCommunity__upload-image-length'>
                        {images.length}
                        <span className='CreateCommunity__upload-image-length--limit'>&nbsp;/&nbsp;3</span>
                    </span>
                </div>
                <div className='CreateCommunity__button-wrap'>
                    <Button primaryDark className='CreateCommunity__button'>작성 완료</Button>
                </div>
            </Form>
        </Page>
    );
}

export default CreateCommunity;