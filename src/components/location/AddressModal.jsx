import { useState } from 'react';
import { useFetcher } from 'react-router-dom';
import { Input, Button, Modal, Line } from '@components/ui';
import { AddressList, AddressPagination } from '@components/location';

function AddressModal({ handleModalClose }) {
    const fetcher = useFetcher();
    const [curAddress, setCurAddress] = useState('');

    let data;
    if (fetcher.data) data = fetcher.data.coordData;

    const addressInputProps = {
        type: 'text', 
        name: 'address', 
        placeholder: '주소 입력 (지번 주소, 도로명 주소)', 
        className: 'AddressModal__input',
        getValue: (value) => setCurAddress(value),
    }

    return (
        <Modal className='AddressModal' handleModalClose={handleModalClose}>
            <h3 className='AddressModal__title'>주소 검색</h3>
            <fetcher.Form className='AddressModal__input-form'>
                <Input {...addressInputProps} />
                <Button primaryDark>검색</Button>
            </fetcher.Form>
            <h5 className='AddressModal__text-result'>검색 결과 ({data?.meta.total_count || 0})</h5>
            <Line secondaryLight />
            <AddressList data={data?.documents || []} handleModalClose={handleModalClose} />
            <AddressPagination 
                dataCnt={data?.meta.total_count || 0} 
                onSubmit={(pageNum) => fetcher.submit({ address: curAddress, page: pageNum }, { method: "get" })}
            />
        </Modal>
    );
}

export default AddressModal;