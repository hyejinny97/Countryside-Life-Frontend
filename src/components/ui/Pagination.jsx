import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '@constants';

function Pagination({ dataCnt=0 }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = +searchParams.get('page') || 1;

    const handlePageClick = (pageNum) => {
        searchParams.set('page', pageNum);
        setSearchParams(searchParams);
        window.scrollTo({ top: 0 });
    }

    const pageCnt = Math.ceil(dataCnt / PAGE_SIZE);

    const renderPages = Array(pageCnt).fill(0).map((_, idx) => {
        return (
            <span 
                key={idx + 1} 
                className={`Pagination__number ${currentPage === (idx + 1) ? 'Pagination__number--active': ''}`}
                onClick={() => handlePageClick(idx + 1)}
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