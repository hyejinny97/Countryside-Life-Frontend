function ArticleImageList({ data=[] }) {
    const renderImages = data.map(imageSrc => {
        return <img key={imageSrc.image} className='ArticleImageList__article-image' src={imageSrc.image} alt='article 이미지'/>
    })

    return (
        <div className='ArticleImageList__article-image-list'>
            {renderImages}
        </div>
    );
}

export default ArticleImageList;