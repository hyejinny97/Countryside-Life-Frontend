import { useSubmit } from 'react-router-dom';
import { Button } from '@components/ui';

function AddressItem({ data, handleModalClose }) {
    const submit = useSubmit();

    const handleButtonClick = () => {
        handleModalClose();
        submit({ latitude: data.y, longitude: data.x }, { method: 'GET' })
    }

    return (
        <div className="AddressItem">
            <div>
                {data.address ? 
                    <p className="AddressItem__address">{data.address?.address_name}</p>:
                    <p className="AddressItem__address">{data.address_name}</p>
                }
                {data.road_address && <p className="AddressItem__road-address">(도로명) {data.road_address?.address_name}</p>}
            </div>
            <Button primaryDark outline onClick={handleButtonClick}>선택</Button>
        </div>
    );
}

export default AddressItem;