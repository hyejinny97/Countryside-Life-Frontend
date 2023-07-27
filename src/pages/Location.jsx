import { useLoaderData } from 'react-router-dom';
import { Page } from '@components/ui';
import { AddressForm } from '@components/location';
import { store, locationApi } from '@store';

async function loader({ request }) {
    console.log('로더')

    const url = new URL(request.url);
    const address = url.searchParams.get("address");
    const page = url.searchParams.get("page") || 1;
    const latitude = url.searchParams.get("latitude");
    const longitude = url.searchParams.get("longitude");

    console.log(address, page, latitude, longitude)
    
    if (!address && !latitude && !longitude) return {};

    try {
        let res;
        if (address) res = await store.dispatch(locationApi.endpoints.getCoordFromAdd.initiate({ query: address, page }))
        if (latitude || longitude) res = await store.dispatch(locationApi.endpoints.getAddFromCoord.initiate({ latitude, longitude }))
        
        if (res.error) throw Error(res.error.message);
        console.log(res.data)
        return {data: res.data};
    } catch (e){
        return {error: e};
    }
}

async function action({ request }) {
    console.log('액션')    
    const formData = await request.formData();
    console.log(formData)
    const data = Object.fromEntries(formData);
    console.log(data)
    return null;
}

function Location() {
    return (
        <Page>
            <AddressForm />
        </Page>
    );
}

export default Location;
export {loader, action};