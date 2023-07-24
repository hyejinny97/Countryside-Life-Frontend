import { useState } from 'react';
import { Dropdown } from '@components/ui';
import { categoryMenuData } from '@datas/community';

function CategoryDropdown({ invalidTexts, initialValue }) {
    const [value, setValue] = useState(categoryMenuData.find(data => data.value === initialValue) || null);

    return (
        <div className='CategoryDropdown'>
            <Dropdown 
                label='게시글 주제를 선택해주세요(필수)' 
                options={categoryMenuData.slice(1)} 
                value={value}
                onChange={setValue}
                className={`CategoryDropdown__dropdown ${invalidTexts ? 'CategoryDropdown__dropdown--red': ''}`}
                // style={{width: '18rem'}}
            />
            {invalidTexts && <p className='CategoryDropdown__invalid-text' >This field may not be blank.</p>}
            <input type='hidden' name='category' value={value?.value || ''} />
        </div>
    );
}

export default CategoryDropdown;