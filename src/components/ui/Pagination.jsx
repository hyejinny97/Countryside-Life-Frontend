import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";

function Pagination({ dataCnt=0, pageSize, currentPage, onClick }) {
    const pageCnt = Math.ceil(dataCnt / pageSize);
    const pagesPerView = 5;
    
    const firstView = Math.floor((currentPage - 1) / pagesPerView) === 0;
    const lastView = Math.floor((currentPage - 1) / pagesPerView) === Math.floor((pageCnt - 1) / pagesPerView);
    const currentView = Math.floor((currentPage - 1) / pagesPerView);

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
            {pageCnt >= pagesPerView 
                && !firstView
                && <IoIosArrowDropleft onClick={() => onClick(pagesPerView * currentView)} />
            }
            {pageCnt > 1 && renderPages.slice(pagesPerView * currentView, pagesPerView * (currentView + 1))}
            {pageCnt >= pagesPerView 
                && !lastView
                && <IoIosArrowDropright onClick={() => onClick(pagesPerView * (currentView + 1) + 1)} />
            }
        </div>
    );
}

export default Pagination;