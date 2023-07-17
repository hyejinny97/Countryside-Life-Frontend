import { Category } from '@components/community';
import { Page } from '@components/ui';

async function loader() {
    return null;
}

function Community() {
    return (
        <Page className='Community'>
            <Category />
            <div className='Community__content'></div>
        </Page>
    );
}

export default Community;
export {loader};