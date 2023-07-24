import { useState } from 'react';
import { Dropdown } from '@components/ui';
import { regionMenuData } from '@datas/community';

function SimpleRegionDropdown({ invalidTexts, initialValue }) {
    const [select, setSelect] = useState(regionMenuData.find(data => data.value === initialValue) || null);

    return (
        <div className='SimpleRegionDropdown'>
            <Dropdown 
                label='지역' 
                options={regionMenuData.slice(1)} 
                value={select} 
                onChange={setSelect} 
                title='작성글과 관련된 지역을 선택해주세요.'
                className={`SimpleRegionDropdown__dropdown ${invalidTexts ? 'SimpleRegionDropdown__dropdown--red': ''}`}
                // style={{width: '7rem'}}
            />
            {invalidTexts && <p className='SimpleRegionDropdown__invalid-text' >This field may not be blank.</p>}
            <input type='hidden' name='region' value={select?.value || ''} />
        </div>
    );
}

export default SimpleRegionDropdown;