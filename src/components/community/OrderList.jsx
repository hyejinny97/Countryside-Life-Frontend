import { useSearchParams } from 'react-router-dom';
import { Menu } from '@components/ui';
import { orderMenuData } from '@datas/community';
import { ORDER_CREATED_AT } from '@constants';

function OrderList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentOrder = searchParams.get('ordering') || ORDER_CREATED_AT;
    
    const handleOrderClick = (value) => {
        searchParams.set('ordering', value);
        setSearchParams(searchParams);
    }

    const config = {
        render: (data) => {
            return (
                <div 
                    className={`OrderList__item ${currentOrder === data.value ? 'OrderList__item--active' : ''}`} 
                    onClick={() => handleOrderClick(data.value)}
                >
                    {data.label}
                </div>
            );
        },
        horizontal: true,
    };

    return (
        <div>
            <Menu data={orderMenuData} config={config} />
        </div>
    );
}

export default OrderList;