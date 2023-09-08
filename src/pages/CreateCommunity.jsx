import axios from "axios";
import { Form, redirect, useActionData, useLoaderData } from "react-router-dom";
import { Page, Button } from "@components/ui";
import {
  CategoryDropdown,
  SimpleRegionDropdown,
  ContentTextarea,
  ArticleImageInput,
  TitleInput,
} from "@components/community";
import { store, runToast, communityApi } from "@store";
import { PATH_LOGIN, PATH_COMMUNITY } from "@constants";
import { silentRefresh } from "@helpers";

async function createLoader() {
  if (axios.defaults.headers.common.Authorization) {
    return null;
  }

  try {
    await silentRefresh();
    return null;
  } catch (e) {
    store.dispatch(runToast("글을 작성하기 전 먼저 로그인해주세요."));
    return redirect(PATH_LOGIN);
  }
}

async function editLoader({ params: { articleId } }) {
  if (axios.defaults.headers.common.Authorization) {
    const response = await store.dispatch(
      communityApi.endpoints.fetchArticle.initiate(articleId)
    );
    if (store.getState().user.id !== response.data.user.id)
      return redirect(PATH_COMMUNITY);
    return response.data;
  }

  try {
    await silentRefresh();
  } catch (e) {
    store.dispatch(runToast("글을 수정하기 전 먼저 로그인해주세요."));
    return redirect(PATH_LOGIN);
  }

  try {
    const response = await store.dispatch(
      communityApi.endpoints.fetchArticle.initiate(articleId)
    );
    if (store.getState().user.id !== response.data.user.id)
      return redirect(PATH_COMMUNITY);
    return response.data;
  } catch (e) {
    return redirect(PATH_COMMUNITY);
  }
}

async function createAction({ request }) {
  try {
    const formData = await request.formData();
    const res = await store.dispatch(
      communityApi.endpoints.createArticle.initiate(formData)
    );

    if (res.error) throw Error(res.error.message);
    return redirect(PATH_COMMUNITY);
  } catch (e) {
    return e;
  }
}

async function editAction({ request, params: { articleId } }) {
  try {
    const formData = await request.formData();
    const res = await store.dispatch(
      communityApi.endpoints.editArticle.initiate({ formData, articleId })
    );

    if (res.error) throw Error(res.error.message);
    return redirect(`${PATH_COMMUNITY}/${articleId}`);
  } catch (e) {
    return e;
  }
}

function CreateCommunity() {
  const errors = useActionData();
  const data = useLoaderData();

  return (
    <Page className="CreateCommunity">
      <Form method="post" encType="multipart/form-data">
        <div className="CreateCommunity__dropdown-list">
          <CategoryDropdown
            invalidTexts={errors?.category}
            initialValue={data?.category}
          />
          <SimpleRegionDropdown
            invalidTexts={errors?.region}
            initialValue={data?.region}
          />
        </div>
        <TitleInput invalidTexts={errors?.title} initialValue={data?.title} />
        <ContentTextarea
          invalidTexts={errors?.content}
          initialValue={data?.content}
        />
        {/* <ArticleImageInput /> */}
        <div className="CreateCommunity__button-wrap">
          <Button primaryDark className="CreateCommunity__button">
            작성 완료
          </Button>
        </div>
      </Form>
    </Page>
  );
}

export default CreateCommunity;
export { createLoader, createAction, editLoader, editAction };
