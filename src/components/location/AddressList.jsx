import { AddressItem } from '@components/location';

function AddressList({ data=[], handleModalClose }) {
    const renderItems = data.map(item => {
        return <AddressItem key={item.address_name} data={item} handleModalClose={handleModalClose} />
    })

    return (
        <div className='AddressList'>
            {renderItems}
        </div>
    );
}

export default AddressList;