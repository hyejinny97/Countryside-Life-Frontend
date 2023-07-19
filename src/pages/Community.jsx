import { Link } from 'react-router-dom';
import { BsPencil } from "react-icons/bs";
import { Category, SearchForm, OrderList, RegionDropdown, CommunityArticleList } from '@components/community';
import { Page } from '@components/ui';
import { PATH_CREATECOMMUNITY } from '@constants';

async function loader() {
    console.log('커뮤니티 로더')
    return null;
}

function Community() {
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
                    <CommunityArticleList />
                </div>
            </div>
            <Link className='Community__write-button' title='게시글 작성하기' to={PATH_CREATECOMMUNITY}>
                <BsPencil />
            </Link>
        </Page>
    );
}

export default Community;
export {loader};