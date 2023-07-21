import { Link, useLoaderData } from 'react-router-dom';
import { BsPencil } from "react-icons/bs";
import { HiOutlineDocumentText } from "react-icons/hi";
import { Category, SearchForm, OrderList, RegionDropdown, CommunityArticleList } from '@components/community';
import { Page, Spinner, ErrorBox, EmptyBox } from '@components/ui';
import { PATH_CREATECOMMUNITY } from '@constants';
import { paramsToObject } from '@helpers';
import { store, communityApi, useFetchAllArticlesQuery } from '@store';

async function loader({ request }) {
    const url = new URL(request.url);
    const searchParams = paramsToObject(url.searchParams.entries());

    store.dispatch(communityApi.endpoints.fetchAllArticles.initiate(searchParams));

    return searchParams;
}

function Community() {
    const searchParams = useLoaderData();
    const {data:articleData, error, isFetching} = useFetchAllArticlesQuery(searchParams);
    console.log(error)
    return (
        <Page className='Community'>
            <h3 className='Community__title'>시골생활을 공유해보세요</h3>
            <div className='Community__inner'>
                <Category />
                <div className='Community__content'>
                    <SearchForm />
                    <div className='Community__utils'>
                        <OrderList />
                        <RegionDropdown />
                    </div>
                    {articleData && (articleData.count > 0 ? 
                        <CommunityArticleList data={articleData.results} />:
                        <EmptyBox message='게시글이 없습니다.' icon={<HiOutlineDocumentText />} />
                    )}
                    {error && <ErrorBox message='게시글을 불러올 수 없습니다.' icon={<HiOutlineDocumentText />}/>}
                </div>
            </div>
            <Link className='Community__write-button' title='게시글 작성하기' to={PATH_CREATECOMMUNITY}>
                <BsPencil />
            </Link>
            {isFetching && <Spinner />}
        </Page>
    );
}

export default Community;
export {loader};