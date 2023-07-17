import { Link, useSearchParams } from 'react-router-dom';
import { Menu } from '@components/ui';
import { categoryMenuData } from '@datas/community';
import { CATEGORY_ALL } from '@constants';

function Category() {
    const [searchParams] = useSearchParams();
    const currentCategory = searchParams.get('category') || CATEGORY_ALL

    const config = {
        render: (data) => {
            return (
                <Link 
                    className={`Category__link ${currentCategory === data.value ? 'Category__link--active': ''}`}
                    to={data.to}
                >
                    <img src={data.icon} alt={`${data.label} 아이콘`} />
                    {data.label}
                </Link>
            );
        }
    };

    return (
        <div className='Category'>
            <h3 className='Category__title'>시골생활을 공유해보세요</h3>
            <Menu data={categoryMenuData} config={config} />
        </div>
    );
}

export default Category;