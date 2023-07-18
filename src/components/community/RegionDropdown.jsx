import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Dropdown } from '@components/ui';
import { regionMenuData } from '@datas/community';

function RegionDropdown() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [select, setSelect] = useState(null);

    useEffect(() => {
        const curRegion = searchParams.get('region');
        const value = regionMenuData.find(option => option.value === curRegion);
        setSelect(value);
    }, [searchParams])
    
    const handleChange = (option) => {
        setSelect(option);
        searchParams.set('region', option.value);
        setSearchParams(searchParams);
    }

    return (
        <Dropdown 
            label='지역' 
            options={regionMenuData} 
            value={select} 
            onChange={handleChange} 
        />
    );
}

export default RegionDropdown;