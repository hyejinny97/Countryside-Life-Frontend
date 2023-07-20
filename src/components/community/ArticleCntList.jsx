import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";

function ArticleCntList({ likesCnt=0, commentsCnt=0 }) {
    const cntData = [
        {label: 'likes', icon: <AiOutlineHeart />, value: likesCnt},
        {label: 'comments', icon: <HiOutlineChatBubbleOvalLeft />, value: commentsCnt},
    ];

    const renderCntItems = cntData.map(item => {
        return (
            <li className='ArticleCntList__cnt-item' key={item.label}>
                {item.icon}
                <span>{item.value}</span>
            </li>
        );
    })

    return (
        <ul className='ArticleCntList__cnt-list'>
            {renderCntItems}
        </ul>
    );
}

export default ArticleCntList;