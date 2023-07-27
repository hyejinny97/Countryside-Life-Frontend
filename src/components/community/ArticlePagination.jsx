import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '@constants';
import { Pagination } from '@components/ui';

function ArticlePagination({ dataCnt }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = +searchParams.get('page') || 1;

    const handlePageClick = (pageNum) => {
        searchParams.set('page', pageNum);
        setSearchParams(searchParams);
        window.scrollTo({ top: 0 });
    }

    return <Pagination 
        dataCnt={dataCnt} 
        pageSize={PAGE_SIZE} 
        currentPage={currentPage} 
        onClick={handlePageClick} 
    />;
}

export default ArticlePagination;