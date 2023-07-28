const { kakao } = window;

function displayMap({container, latitude=33.450701, longitude=126.570667}) {
    const options = { //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(+latitude, +longitude), //지도의 중심좌표.
        level: 3 //지도의 레벨(확대, 축소 정도)
    };
    
    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    
    return map;
}

function markingByCoord({map, latitude=33.450701, longitude=126.570667, markerImageUrl}) {
    const markerPosition  = new kakao.maps.LatLng(+latitude, +longitude); 

    const marker = new kakao.maps.Marker({  // 마커를 생성합니다
        position: markerPosition,
        image: markerImage(markerImageUrl),
    });

    marker.setMap(map);  // 마커가 지도 위에 표시되도록 설정합니다
    return marker;
}

function markerImage(image) {
    const imageSrc = image; // 마커이미지의 주소입니다    
    const imageSize = new kakao.maps.Size(64, 69); // 마커이미지의 크기입니다
    const imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    
    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
    return markerImage;
}

function displayOverlay({ map, marker, title, address, roadAddress }) {
    // 커스텀 오버레이에 표시할 컨텐츠 입니다
    // 커스텀 오버레이는 아래와 같이 사용자가 자유롭게 컨텐츠를 구성하고 이벤트를 제어할 수 있기 때문에
    // 별도의 이벤트 메소드를 제공하지 않습니다 
    // const content = `
    //     <div class="MapOverlay__wrap">
    //         <div class="MapOverlay__info">
    //             <div class="MapOverlay__title">
    //                 ${title}
    //                 <div class="MapOverlay__close" title="닫기"></div>
    //             </div>
    //             <div class="MapOverlay__body">
    //                 <div class="MapOverlay__desc">
    //                     <div class="MapOverlay__ellipsis">${roadAddress}</div>
    //                     <div class="MapOverlay__jibun MapOverlay__ellipsis">${address}</div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    //     `;

    const content = document.createElement('div');
    content.setAttribute('class', 'MapOverlay__wrap');

    const info = document.createElement('div');
    info.setAttribute('class', 'MapOverlay__info');
    content.appendChild(info);

    const titleEl = document.createElement('div');
    titleEl.setAttribute('class', 'MapOverlay__title');
    info.appendChild(titleEl);
    
    const titleText = document.createTextNode(title);
    titleEl.appendChild(titleText);

    const close = document.createElement('div');
    close.setAttribute('class', 'MapOverlay__close');
    close.onclick = function() { // 닫기 이벤트 추가
        overlay.setMap(null);
    };
    titleEl.appendChild(close);

    const body = document.createElement('div');
    body.setAttribute('class', 'MapOverlay__body');
    info.appendChild(body);

    const desc = document.createElement('div');
    desc.setAttribute('class', 'MapOverlay__desc');
    body.appendChild(desc);

    if (roadAddress) {
        const ellipsis = document.createElement('div');
        ellipsis.setAttribute('class', 'MapOverlay__ellipsis');
        desc.appendChild(ellipsis);
    
        const ellipsisText = document.createTextNode(roadAddress);
        ellipsis.appendChild(ellipsisText);
    }

    if (address) {
        const jibun = document.createElement('div');
        jibun.setAttribute('class', 'MapOverlay__ellipsis MapOverlay__jibun');
        desc.appendChild(jibun);
    
        const jibunText = document.createTextNode(address);
        jibun.appendChild(jibunText);
    }


    // 마커 위에 커스텀오버레이를 표시합니다
    // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
    const overlay = new kakao.maps.CustomOverlay({
        content: content,
        map: map,
        position: marker.getPosition(),
        clickable: true,       
    });

    // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
    kakao.maps.event.addListener(marker, 'click', function() {
        overlay.setMap(map);
    });

    // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 
    function closeOverlay() {
        overlay.setMap(null);     
    }
}

function markingByCategory({ map }) {
    // 마커를 클릭했을 때 해당 장소의 상세정보를 보여줄 커스텀오버레이입니다
    const placeOverlay = new kakao.maps.CustomOverlay({zIndex:1}); 
    const contentNode = document.createElement('div'); // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다 
    let markers = []; // 마커를 담을 배열입니다
    let currCategory = ''; // 현재 선택된 카테고리를 가지고 있을 변수입니다
    
    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places(map); 

    // 지도에 idle 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'idle', searchPlaces);

    // 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다 
    contentNode.className = 'placeinfo_wrap';

    // 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
    // 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다 
    addEventHandle(contentNode, 'mousedown', kakao.maps.event.preventMap);
    addEventHandle(contentNode, 'touchstart', kakao.maps.event.preventMap);

    // 커스텀 오버레이 컨텐츠를 설정합니다
    placeOverlay.setContent(contentNode);  

    // 각 카테고리에 클릭 이벤트를 등록합니다
    addCategoryClickEvent();

    // 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
    function addEventHandle(target, type, callback) {
        if (target.addEventListener) {
            target.addEventListener(type, callback);
        } else {
            target.attachEvent('on' + type, callback);
        }
    }

    // 카테고리 검색을 요청하는 함수입니다
    function searchPlaces() {
        if (!currCategory) {
            return;
        }
        
        // 커스텀 오버레이를 숨깁니다 
        placeOverlay.setMap(null);

        // 지도에 표시되고 있는 마커를 제거합니다
        removeMarker();
        
        ps.categorySearch(currCategory, placesSearchCB, {useMapBounds:true}); 
    }

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {

            // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
            displayPlaces(data);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요

        } else if (status === kakao.maps.services.Status.ERROR) {
            // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
            
        }
    }

    // 지도에 마커를 표출하는 함수입니다
    function displayPlaces(places) {

        // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
        // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
        const order = document.getElementById(currCategory).getAttribute('data-order');

        for (let i=0; i<places.length; i++ ) {

            // 마커를 생성하고 지도에 표시합니다
            const marker = addMarker(new kakao.maps.LatLng(places[i].y, places[i].x), order);

            // 마커와 검색결과 항목을 클릭 했을 때
            // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
            (function(marker, place) {
                kakao.maps.event.addListener(marker, 'click', function() {
                    displayPlaceInfo(place);
                });
            })(marker, places[i]);
        }
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position, order) {
        const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png'; // 마커 이미지 url, 스프라이트 이미지를 씁니다
        const imageSize = new kakao.maps.Size(27, 28);  // 마커 이미지의 크기
        const imgOptions =  {
                spriteSize : new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
                spriteOrigin : new kakao.maps.Point(46, (order*36)), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                offset: new kakao.maps.Point(11, 28) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
            };
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
                marker = new kakao.maps.Marker({
                position: position, // 마커의 위치
                image: markerImage 
            });

        marker.setMap(map); // 지도 위에 마커를 표출합니다
        markers.push(marker);  // 배열에 생성된 마커를 추가합니다

        return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
        for (let i = 0; i < markers.length; i++ ) {
            markers[i].setMap(null);
        }   
        markers = [];
    }

    // 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
    function displayPlaceInfo (place) {
        let content = '<div class="placeinfo">' +
                        '   <a class="title" href="' + place.place_url + '" target="_blank" title="' + place.place_name + '">' + place.place_name + '</a>';   

        if (place.road_address_name) {
            content += '    <span title="' + place.road_address_name + '">' + place.road_address_name + '</span>' +
                        '  <span class="jibun" title="' + place.address_name + '">(지번 : ' + place.address_name + ')</span>';
        }  else {
            content += '    <span title="' + place.address_name + '">' + place.address_name + '</span>';
        }                
    
        content += '    <span class="tel">' + place.phone + '</span>' + 
                    '</div>' + 
                    '<div class="after"></div>';

        contentNode.innerHTML = content;
        placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
        placeOverlay.setMap(map);  
    }


    // 각 카테고리에 클릭 이벤트를 등록합니다
    function addCategoryClickEvent() {
        const category = document.getElementById('category');
        const children = category.children;

        for (var i=0; i< children.length; i++) {
            children[i].onclick = onClickCategory;
        }
    }

    // 카테고리를 클릭했을 때 호출되는 함수입니다
    function onClickCategory() {
        const id = this.id;
        const className = this.className;

        placeOverlay.setMap(null);

        if (className === 'on') {
            currCategory = '';
            changeCategoryClass();
            removeMarker();
        } else {
            currCategory = id;
            changeCategoryClass(this);
            searchPlaces();
        }
    }

    // 클릭된 카테고리에만 클릭된 스타일을 적용하는 함수입니다
    function changeCategoryClass(el) {
        const category = document.getElementById('category');
        const children = category.children;

        for (let i=0; i<children.length; i++ ) {
            children[i].className = '';
        }

        if (el) {
            el.className = 'on';
        } 
    } 
}

function controlMapType({ map }) {
    const roadmapControl = document.getElementById('btnRoadmap');
    const skyviewControl = document.getElementById('btnSkyview'); 

    roadmapControl.onclick = () => setMapType('roadmap');
    skyviewControl.onclick = () => setMapType('skyview');

    function setMapType(maptype) {
        if (maptype === 'roadmap') {
            map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);    
            roadmapControl.className = 'selected_btn';
            skyviewControl.className = 'btn';
        } else {
            map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);    
            skyviewControl.className = 'selected_btn';
            roadmapControl.className = 'btn';
        }
    }
}

export {displayMap, markingByCoord, displayOverlay, markingByCategory, controlMapType};