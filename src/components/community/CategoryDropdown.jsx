import { useState } from 'react';
import { Dropdown } from '@components/ui';
import { categoryMenuData } from '@datas/community';

function CategoryDropdown() {
    const [value, setValue] = useState(null);
    
    return (
        <Dropdown 
            label='게시글 주제를 선택해주세요(필수)' 
            options={categoryMenuData.slice(1)} 
            value={value}
            onChange={setValue}
            className='CategoryDropdown'
            // style={{width: '18rem'}}
        />
    );
}

export default CategoryDropdown;