// navigation path
const PATH_ROOT = '/';
const PATH_LOGIN = '/login';
const PATH_LOGOUT = '/logout';
const PATH_SIGNUP = '/signup';
const PATH_EDITPROFILE = '/edit-profile';
const PATH_CHANGEPASSWORD = '/change-password';
const PATH_MYPAGE = '/my-page';
const PATH_COMMUNITY = '/community';

// JWT
const JWT_EXPIRRY_TIME = 60 * 60 * 1000;  // 단위: ms

// community category
const CATEGORY_ALL = '전체';
const CATEGORY_GARDEN = '텃밭';
const CATEGORY_FLOWER = '화단';
const CATEGORY_HOUSE = '한달살기';
const CATEGORY_DOG = '댕댕이';
const CATEGORY_CAT = '냥냥이';
const CATEGORY_FARMING = '귀농';
const CATEGORY_VIEWS = '풍경';
const CATEGORY_FESTIVAL = '축제';
const CATEGORY_SIGHT = '명소';
const CATEGORY_FREE = '자유';

// community filter - ordering(정렬)
const ORDER_CREATED_AT = 'created_at';
const ORDER_LIKES = 'likes';

// community filter - region(지역) 


export { 
    PATH_ROOT, 
    PATH_LOGIN, 
    PATH_LOGOUT,
    PATH_SIGNUP, 
    PATH_EDITPROFILE, 
    PATH_CHANGEPASSWORD, 
    PATH_MYPAGE,
    PATH_COMMUNITY,
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
}