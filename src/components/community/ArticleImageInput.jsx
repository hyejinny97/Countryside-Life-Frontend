import { BsCamera } from "react-icons/bs";
import { ImageFileInput } from '@components/ui';

function ArticleImageInput({ value, onChange }) {
    const imageInputProps = { 
        name: 'article_images', 
        label: 'article_image', 
        labelContent: <BsCamera />, 
        multiple: true,
        className: 'ArticleImageInput', 
        value: {value},
        onChange: (e) => onChange(e.target.files),
    }

    return <ImageFileInput {...imageInputProps} />;
}

export default ArticleImageInput;