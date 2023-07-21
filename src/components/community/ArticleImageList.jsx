function ArticleImageList({ data=[] }) {
    const renderImages = data.map(imageSrc => {
        return <img className='ArticleImageList__article-image' src={imageSrc} alt='article 이미지'/>
    })

    return (
        <div className='ArticleImageList__article-image-list'>
            {renderImages}
        </div>
    );
}

export default ArticleImageList;