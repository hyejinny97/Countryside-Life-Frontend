import { FaUserCircle } from "react-icons/fa";

function UserImage({ imageUrl }) {
    return (    
        <>
            {imageUrl ?
                <img className='UserImage UserImage--image' src={imageUrl} alt='작성자 프로필 사진' /> :
                <FaUserCircle className='UserImage UserImage--icon'/>
            }
        </>
    )
}

export default UserImage;