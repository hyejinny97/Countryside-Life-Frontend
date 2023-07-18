import {
    icon_all,
    icon_cat,
    icon_dog,
    icon_farming,
    icon_festival,
    icon_flower,
    icon_free,
    icon_garden,
    icon_house,
    icon_sight,
    icon_view
} from '@assets';
import { 
    PATH_COMMUNITY, 
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
} from '@constants';

const data = [
    {label: '전체', value: CATEGORY_ALL, icon: icon_all},
    {label: '텃밭', value: CATEGORY_GARDEN, icon: icon_garden},
    {label: '화단', value: CATEGORY_FLOWER, icon: icon_flower},
    {label: '한달살기', value: CATEGORY_HOUSE, icon: icon_house},
    {label: '시골 댕댕이', value: CATEGORY_DOG, icon: icon_dog},
    {label: '시골 냥냥이', value: CATEGORY_CAT, icon: icon_cat},
    {label: '귀농/귀촌', value: CATEGORY_FARMING, icon: icon_farming},
    {label: '시골 풍경', value: CATEGORY_VIEWS, icon: icon_view},
    {label: '지역 축제', value: CATEGORY_FESTIVAL, icon: icon_festival},
    {label: '숨은 명소', value: CATEGORY_SIGHT, icon: icon_sight},
    {label: '자유', value: CATEGORY_FREE, icon: icon_free},
];

data.forEach((item, i) => {
    item.to = `${PATH_COMMUNITY}?category=${item.value}`;
})

export {data};