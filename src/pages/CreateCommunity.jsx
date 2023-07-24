import axios from 'axios';
import { Form, redirect, useActionData } from 'react-router-dom';
import { Page, Button } from '@components/ui';
import { CategoryDropdown, SimpleRegionDropdown, ContentTextarea, ArticleImageInput, TitleInput } from '@components/community';
import { store, runToast, communityApi } from '@store';
import { PATH_LOGIN, PATH_COMMUNITY } from '@constants';
import { silentRefresh } from '@helpers';

async function loader() {
    if (axios.defaults.headers.common.Authorization) {
        return null;
    };
    
    try {
        await silentRefresh();
        return null;
    } catch(e) {
        store.dispatch(runToast('글을 작성하기 전 먼저 로그인해주세요.'));
        return redirect(PATH_LOGIN);
    }
}

async function action({ request }) {
    const formData = await request.formData();
    
    const res = await store.dispatch(communityApi.endpoints.createArticle.initiate(formData));
    return res.error ? res.error.data : redirect(PATH_COMMUNITY);
}

function CreateCommunity() {
    const errors = useActionData();

    return (
        <Page className='CreateCommunity'>
            <Form method="post" encType="multipart/form-data">
                <div className='CreateCommunity__dropdown-list'>
                    <CategoryDropdown invalidTexts={errors?.category} />
                    <SimpleRegionDropdown invalidTexts={errors?.region} />
                </div>
                <TitleInput invalidTexts={errors?.title} />
                <ContentTextarea invalidTexts={errors?.content} />
                <ArticleImageInput />
                <div className='CreateCommunity__button-wrap'>
                    <Button primaryDark className='CreateCommunity__button'>작성 완료</Button>
                </div>
            </Form>
        </Page>
    );
}

export default CreateCommunity;
export {loader, action};