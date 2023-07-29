// navigation path
const PATH_ROOT = '/';
const PATH_LOGIN = '/login';
const PATH_LOGOUT = '/logout';
const PATH_SIGNUP = '/signup';
const PATH_EDITPROFILE = '/edit-profile';
const PATH_CHANGEPASSWORD = '/change-password';
const PATH_MYPAGE = '/my-page';
const PATH_COMMUNITY = '/community';
const PATH_CREATECOMMUNITY = '/community/create';
const PATH_COMMUNITYDETAIL = '/community/:articleId';
const PATH_EDITCOMMUNITY = '/community/edit/:articleId';
const PATH_LOCATION = '/location';
const PATH_INTRODUCTION = '/introduction';

// JWT
const JWT_EXPIRRY_TIME = 60 * 60 * 1000;  // 단위: ms

// community category
const CATEGORY_ALL = '전체';
const CATEGORY_GARDEN = '텃밭';
const CATEGORY_FLOWER = '화단';
const CATEGORY_HOUSE = '한달살기';
const CATEGORY_DOG = '댕댕이';
const CATEGORY_CAT = '냥냥이';
const CATEGORY_FARMING = '귀촌';
const CATEGORY_VIEWS = '풍경';
const CATEGORY_FESTIVAL = '축제';
const CATEGORY_SIGHT = '명소';
const CATEGORY_FREE = '자유';

// community filter - ordering(정렬)
const ORDER_CREATED_AT = 'created_at';
const ORDER_LIKES = 'likes';

// community filter - region(지역) 
const REGION_ALL = '전체';
const REGION_GANGWON = '강원도';
const REGION_GYEONGGI = '경기도';
const REGION_GYEONGNAM = '경상남도';
const REGION_GYEONGBUK = '경상북도';
const REGION_GWANGJU = '광주광역시';
const REGION_DAEGU = '대구광역시';
const REGION_DAEJEON = '대전광역시';
const REGION_BUSAN = '부산광역시';
const REGION_SEOUL = '서울특별시';
const REGION_SEJONG = '세종특별자치시';
const REGION_ULSAN = '울산광역시';
const REGION_INCHEON = '인천광역시';
const REGION_JEONNAM = '전라남도';
const REGION_JEONBUK = '전라북도';
const REGION_JEJU = '제주특별자치도';
const REGION_CHUNGNAM = '충청남도';
const REGION_CHUNGBUK = '충청북도';

// 페이지당 데이터 최대 개수
const PAGE_SIZE = 10;
const ADDRESS_PAGE_SIZE = 5;

export { 
    PATH_ROOT, 
    PATH_LOGIN, 
    PATH_LOGOUT,
    PATH_SIGNUP, 
    PATH_EDITPROFILE, 
    PATH_CHANGEPASSWORD, 
    PATH_MYPAGE,
    PATH_COMMUNITY,
    PATH_CREATECOMMUNITY,
    PATH_COMMUNITYDETAIL,
    PATH_EDITCOMMUNITY,
    PATH_LOCATION,
    PATH_INTRODUCTION,
    JWT_EXPIRRY_TIME, 
    ORDER_CREATED_AT,
    ORDER_LIKES,
    CATEGORY_ALL,
    CATEGORY_GARDEN,
    CATEGORY_FLOWER,
    CATEGORY_HOUSE,
    CATEGORY_DOG,
    CATEGORY_CAT,
    CATEGORY_FARMING,
    CATEGORY_VIEWS,
    CATEGORY_FESTIVAL,
    CATEGORY_SIGHT,
    CATEGORY_FREE,
    REGION_ALL,
    REGION_GANGWON,
    REGION_GYEONGGI,
    REGION_GYEONGNAM,
    REGION_GYEONGBUK,
    REGION_GWANGJU,
    REGION_DAEGU,
    REGION_DAEJEON,
    REGION_BUSAN,
    REGION_SEOUL,
    REGION_SEJONG,
    REGION_ULSAN,
    REGION_INCHEON,
    REGION_JEONNAM,
    REGION_JEONBUK,
    REGION_JEJU,
    REGION_CHUNGNAM, 
    REGION_CHUNGBUK,
    PAGE_SIZE,
    ADDRESS_PAGE_SIZE,
}