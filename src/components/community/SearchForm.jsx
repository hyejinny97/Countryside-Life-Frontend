import { Form, useSearchParams } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import { Input, Button } from '@components/ui';

function SearchForm() {
    const [searchParams] = useSearchParams();
    const searchValue = searchParams.get('search');

    const searchInputProps = {
        type: 'text', 
        name: 'search', 
        initialValue: searchValue,
        placeholder: '게시글을 검색해보세요.', 
        left: <BsSearch />,
        className: 'Community__search-input',
        clear: !searchValue,
    }

    return (
        <Form className="Community__search">
            <Input {...searchInputProps} />
            <Button className='Community__search-button' primaryDark>검색</Button>
        </Form>
    );
}

export default SearchForm;