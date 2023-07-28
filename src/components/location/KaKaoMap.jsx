import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import marker_icon from '@assets/marker_icon.png';
import { displayMap, markingByCoord, displayOverlay, markingByCategory } from '@helpers';

function KaKaoMap() {
    const { addressData, latitude, longitude, error } = useLoaderData();
    
    let address, road_address;
    if (addressData) {
        address = addressData.documents[0].address;
        road_address = addressData.documents[0].road_address;
    };

    console.log(addressData, latitude, longitude, address, road_address)

    useEffect(() => {
        // 지도 생성하기
        const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        const map = displayMap({container, latitude, longitude})
        
        // 카테고리별 장소 검색하기
        markingByCategory({map});

        if (!addressData) return

        // 마커 표시하기
        const markerImageUrl = marker_icon;
        const marker = markingByCoord({map, latitude, longitude, markerImageUrl});
    
        // 오버레이 생성하기
        displayOverlay({map, marker, title: '선택한 위치', address: address?.address_name, roadAddress: road_address?.address_name});
    }, [latitude, longitude])

    return (
        <div className="map_wrap">
            <ul id="category">
                <li id="BK9" data-order="0"> 
                    <span className="category_bg bank"></span>
                    은행
                </li>       
                <li id="MT1" data-order="1"> 
                    <span className="category_bg mart"></span>
                    마트
                </li>  
                <li id="PM9" data-order="2"> 
                    <span className="category_bg pharmacy"></span>
                    약국
                </li>  
                <li id="OL7" data-order="3"> 
                    <span className="category_bg oil"></span>
                    주유소
                </li>  
                <li id="CE7" data-order="4"> 
                    <span className="category_bg cafe"></span>
                    카페
                </li>  
                <li id="CS2" data-order="5"> 
                    <span className="category_bg store"></span>
                    편의점
                </li>      
            </ul>
            <div id="map" style={{width: '100%', height: '400px'}}></div>
        </div>
    );
}

export default KaKaoMap;