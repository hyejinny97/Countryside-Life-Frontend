import { useState } from 'react';
import { Dropdown } from '@components/ui';
import { regionMenuData } from '@datas/community';

function SimpleRegionDropdown() {
    const [select, setSelect] = useState(null);

    return (
        <Dropdown 
            label='지역' 
            options={regionMenuData} 
            value={select} 
            onChange={setSelect} 
            style={{width: '7rem'}}
            title='작성글과 관련된 지역을 선택해주세요.'
        />
    );
}

export default SimpleRegionDropdown;