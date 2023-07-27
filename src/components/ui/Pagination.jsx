function Pagination({ dataCnt=0, pageSize, currentPage, onClick }) {
    const pageCnt = Math.ceil(dataCnt / pageSize);

    const renderPages = Array(pageCnt).fill(0).map((_, idx) => {
        return (
            <span 
                key={idx + 1} 
                className={`Pagination__number ${currentPage === (idx + 1) ? 'Pagination__number--active': ''}`}
                onClick={() => onClick(idx + 1)}
            >
                {idx + 1}
            </span>
        );
    })

    return (
        <div className='Pagination'>
            {pageCnt > 1 && renderPages}
        </div>
    );
}

export default Pagination;