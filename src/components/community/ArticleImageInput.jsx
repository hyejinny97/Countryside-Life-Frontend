import { useState } from 'react';
import { BsCamera } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { ImageFileInput } from '@components/ui';

function ArticleImageInput() {
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
            <div className='ArticleImageInput__upload-image-item'>
                <img key={image.imageUrl} className='ArticleImageInput__upload-image' src={image.imageUrl} alt='업로드이미지' />
                <AiFillCloseCircle onClick={() => handleImageRemove(image)} />
            </div>
        );
    })

    const newFileList = new DataTransfer();
    images.map(image => newFileList.items.add(image.file));

    const imageInputProps = { 
        name: 'article_images', 
        label: 'article_image', 
        labelContent: <BsCamera />, 
        multiple: true,
        className: 'ArticleImageInput', 
        value: newFileList.files,
        onChange: (e) => handleImageUpload(e.target.files),
    }

    return (
        <div className='ArticleImageInput__upload-image-wrap'>
            <div className='ArticleImageInput__upload-image-list'>
                {images.length < 3 && <ImageFileInput {...imageInputProps} />}
                {renderImages}
            </div>
            <span className='ArticleImageInput__upload-image-length'>
                {images.length}
                <span className='ArticleImageInput__upload-image-length--limit'>&nbsp;/&nbsp;3</span>
            </span>
        </div>
    )
}

export default ArticleImageInput;