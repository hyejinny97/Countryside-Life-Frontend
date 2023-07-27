import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { displayMap, markingFromCoord } from '@helpers';

function KaKaoMap() {
    const { addressData, latitude, longitude, error } = useLoaderData();
    console.log(addressData, latitude, longitude)

    useEffect(() => {
        // 지도 생성하기
        const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        const map = displayMap({container, latitude, longitude})
    
        // 마커 표시하기
        markingFromCoord({map, latitude, longitude});
    }, [latitude, longitude])

    return (
        <div id="map" style={{width: '100%', height: '400px'}}></div>
    );
}

export default KaKaoMap;