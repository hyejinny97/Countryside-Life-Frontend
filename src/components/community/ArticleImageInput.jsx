import { useState, useRef } from 'react';
import { BsCamera } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { ImageFileInput } from '@components/ui';

function ArticleImageInput() {
    const [images, setImages] = useState({});
    const imageList = useRef();
 
    const handleImageUpload = (files, idx) => {
        const imageUrl = URL.createObjectURL(files[0]);
        setImages({...images, [idx]: imageUrl});
    }

    const handleImageRemove = (curIdx) => {
        const articleImageInputs = imageList.current.querySelectorAll('.ArticleImageInput input');
        articleImageInputs[curIdx].value = '';
        
        delete images[curIdx];
        setImages({...images});
    }

    const renderImages = Object.entries(images).map(([idx, image]) => {
        return (
            <div className='ArticleImageInput__upload-image-item' key={image}>
                <img className='ArticleImageInput__upload-image' src={image} alt='업로드이미지' />
                <AiFillCloseCircle onClick={() => handleImageRemove(idx)} />
            </div>
        );
    })

    const renderImageInputs = Array(3).fill(0).map((_, idx) => {
        const imageInputProps = { 
            name: `article_image${idx + 1}`, 
            label: `article_image${idx + 1}`, 
            labelContent: <BsCamera />, 
            className: `ArticleImageInput ${Object.keys(images).length === idx ? 'ArticleImageInput--show':''}`, 
            onChange: (e) => handleImageUpload(e.target.files, idx),
        }
        
        return <ImageFileInput key={idx} {...imageInputProps} />;
    })

    return (
        <div className='ArticleImageInput__upload-image-wrap'>
            <div className='ArticleImageInput__upload-image-list' ref={imageList}>
                {renderImageInputs}
                {renderImages}
            </div>
            <span className='ArticleImageInput__upload-image-length'>
                {Object.values(images).length}
                <span className='ArticleImageInput__upload-image-length--limit'>&nbsp;/&nbsp;3</span>
            </span>
        </div>
    )
}

export default ArticleImageInput;