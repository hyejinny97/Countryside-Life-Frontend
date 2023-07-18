import { Link, useSearchParams } from 'react-router-dom';
import { Menu } from '@components/ui';
import { categoryMenuData } from '@datas/community';
import { CATEGORY_ALL } from '@constants';

function Category() {
    const [searchParams] = useSearchParams();
    const currentCategory = searchParams.get('category') || CATEGORY_ALL

    const configVertical = {
        render: (data) => {
            return (
                <Link 
                    className={`Category__link Category__link--vertical ${currentCategory === data.value ? 'Category__link--active': ''}`}
                    to={data.to}
                >
                    <img src={data.icon} alt={`${data.label} 아이콘`} />
                    {data.label}
                </Link>
            );
        }
    };

    const configHorizontal = {
        render: (data) => {
            return (
                <div className='Category__link-wrap'>
                    <Link 
                        className={`Category__link Category__link--horizontal ${currentCategory === data.value ? 'Category__link--active': ''}`}
                        to={data.to}
                        >
                        <img src={data.icon} alt={`${data.label} 아이콘`} />
                    </Link>
                    {data.label}
                </div>
            );
        },
        // horizontal: true,
    };

    return (
        <div className='Category'>
            <Menu className='Category__menu Category__menu--vertical' data={categoryMenuData} config={configVertical} />
            <Menu className='Category__menu Category__menu--horizontal' data={categoryMenuData} config={configHorizontal} />
        </div>
    );
}

export default Category;