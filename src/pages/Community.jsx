import { Form, Link } from 'react-router-dom';
import { BsSearch, BsPencil } from "react-icons/bs";
import { Category, OrderList, RegionDropdown } from '@components/community';
import { Page, Input, Button } from '@components/ui';

async function loader() {
    console.log('커뮤니티 로더')
    return null;
}

function Community() {
    const searchInputProps = {
        type: 'text', 
        name: 'search', 
        placeholder: '게시글을 검색해보세요.', 
        left: <BsSearch />,
        className: 'Community__search-input'
    }

    return (
        <Page className='Community'>
            <h3 className='Community__title'>시골생활을 공유해보세요</h3>
            <div className='Community__inner'>
                <Category />
                <div className='Community__content'>
                    <Form className="Community__search">
                        <Input {...searchInputProps} />
                        <Button className='Community__search-button' primaryDark>검색</Button>
                    </Form>
                    <div className='Community__utils'>
                        <OrderList />
                        <RegionDropdown />
                    </div>
                </div>
            </div>
            <Link className='Community__write-button' title='게시글 작성하기'>
                <BsPencil />
            </Link>
        </Page>
    );
}

export default Community;
export {loader};