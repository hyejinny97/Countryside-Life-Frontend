const { kakao } = window;

function displayMap({container, latitude=33.450701, longitude=126.570667}) {
    const options = { //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(+latitude, +longitude), //지도의 중심좌표.
        level: 3 //지도의 레벨(확대, 축소 정도)
    };
    
    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    
    return map;
}

function markingFromCoord({map, latitude=33.450701, longitude=126.570667}) {
    const markerPosition  = new kakao.maps.LatLng(+latitude, +longitude); 

    const marker = new kakao.maps.Marker({  // 마커를 생성합니다
        position: markerPosition
    });

    marker.setMap(map);  // 마커가 지도 위에 표시되도록 설정합니다
}

export {displayMap, markingFromCoord};