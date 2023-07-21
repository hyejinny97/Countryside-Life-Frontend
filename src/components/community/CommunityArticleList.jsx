import { CommunityArticleItem } from '@components/community';

function CommunityArticleList({ data }) {
    const renderArticleItems = data.map(item => {
        return <CommunityArticleItem key={item.id} data={item} />
    })

    return (
        <div className='CommunityArticleList'>
            {renderArticleItems}
        </div>
    );
}

export default CommunityArticleList;