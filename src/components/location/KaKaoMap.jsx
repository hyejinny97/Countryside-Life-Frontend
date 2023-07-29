import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { marker_icon } from '@assets';
import { 
    displayMap, 
    markingByCoord, 
    displayOverlay, 
    markingByCategory, 
    controlMapType,
    displayRoadView,
} from '@helpers';

function KaKaoMap() {
    const { addressData, latitude, longitude, error } = useLoaderData();
    
    let address, road_address;
    if (addressData) {
        address = addressData.documents[0].address;
        road_address = addressData.documents[0].road_address;
    };

    useEffect(() => {
        // 지도 생성하기
        const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        const { map, mapCenter } = displayMap({container, latitude, longitude})
        
        // 카테고리별 장소 검색하기
        markingByCategory({map});

        // 지도 타입 변경 (지도/스카이뷰)
        controlMapType({map});

        // 로드뷰 변경
        displayRoadView({map, mapCenter});

        if (!addressData) return

        // 마커 표시하기
        const markerImageUrl = marker_icon;
        const marker = markingByCoord({map, latitude, longitude, markerImageUrl});
    
        // 오버레이 생성하기
        displayOverlay({map, marker, title: '선택한 위치', address: address?.address_name, roadAddress: road_address?.address_name});
    }, [latitude, longitude])

    return (
        <div id="container">
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
            <div className="custom_typecontrol radius_border"> {/* 지도타입 컨트롤 div 입니다 */}
                <span id="btnRoadmap" className="selected_btn">지도</span>
                <span id="btnSkyview" className="btn">스카이뷰</span>
            </div>
            <div className="map_wrap">
                <div id="map" style={{width: '100%', height: '400px'}}></div>
                <div id="roadviewControl"></div> {/* 로드뷰 컨트롤러 */}
            </div>
            <div id="rvWrapper">
                <div id="roadview" style={{width: '100%', height: '100%'}}></div> {/* 로드뷰를 표시할 div 입니다 */}
                <div id="close" title="로드뷰닫기"><span className="img"></span></div>
            </div>
        </div>
    );
}

export default KaKaoMap;