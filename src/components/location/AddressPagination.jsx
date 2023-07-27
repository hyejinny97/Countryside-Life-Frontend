import { useState } from 'react';
import { Pagination } from '@components/ui';
import { ADDRESS_PAGE_SIZE } from '@constants';

function AddressPagination({ dataCnt=0, onSubmit }) {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageClick = (pageNum) => {
        setCurrentPage(pageNum);
        onSubmit(pageNum)
    }

    return (
        <Pagination 
            dataCnt={dataCnt}
            pageSize={ADDRESS_PAGE_SIZE}
            currentPage={currentPage}
            onClick={handlePageClick}
        />
    );
}

export default AddressPagination;