import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { CiLocationOn } from "react-icons/ci";
import { Input, Button } from '@components/ui';
import { AddressModal } from '@components/location';

function AddressForm() {
    const [showModal, setShowModal] = useState(false);
    const {data, error} = useLoaderData();

    const addressName = data?.documents[0].address?.address_name;
    // const roadAddressName = data?.documents[0].road_address?.address_name;
    // const value = `${addressName} ${roadAddressName ? `(${roadAddressName})` : ''}`

    const handleButtonClick = (e) => {
        e.preventDefault();
        setShowModal(true);
    }

    const handleModalClose = () => {
        setShowModal(false);
    }

    const addressInputProps = {
        type: 'text', 
        name: 'address', 
        placeholder: '주소를 입력하세요.(지번 주소, 도로명 주소 모두 가능)', 
        left: <CiLocationOn />,
        className: 'AddressForm__input',
        disabled: true,
        initialValue: addressName,
        newValue: addressName,
        clear: !addressName,
    }

    return (
        <div className='AddressForm'>
            <Input {...addressInputProps} />
            <Button primaryDark onClick={handleButtonClick}>주소 찾기</Button>
            {showModal && <AddressModal handleModalClose={handleModalClose} />}
        </div>
    );
}

export default AddressForm;