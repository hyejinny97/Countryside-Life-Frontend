import { useSubmit } from 'react-router-dom';
import { BiCurrentLocation } from "react-icons/bi";
import { Badge } from '@components/ui';

function CurrentLocation() {
    const submit = useSubmit();

    const handleClick = () => {
        const success = (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            submit({ latitude, longitude }, { method: 'GET' });
        }

        const fail = (e) => alert(`현 위치를 찾을 수 없습니다.`);

        navigator.geolocation.getCurrentPosition(success, fail)
    }

    return (
        <div className='CurrentLocation'>
            <Badge primaryDark outline onClick={handleClick}>
                <BiCurrentLocation />&nbsp;
                현 위치로 찾기
            </Badge>
        </div>
    );
}

export default CurrentLocation;