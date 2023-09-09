import { useSelector } from "react-redux";
import { redirect, useParams } from "react-router-dom";
import { Page, Badge, Line } from "@components/ui";
import {
  UserImage,
  WriterInfo,
  MutateLinks,
  Like,
  ArticleImageList,
  ArticleCntList,
  CommentForm,
  CommentList,
} from "@components/community";
import { store, communityApi, useFetchArticleQuery } from "@store";
import { PATH_COMMUNITY } from "@constants";

async function action({ request, params: { articleId } }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  if (request.method === "DELETE") {
    if (data.target === "article") {
      await store.dispatch(
        communityApi.endpoints.deleteArticle.initiate(articleId)
      );
      return redirect(PATH_COMMUNITY);
    }
    if (data.target === "comment") {
      await store.dispatch(
        communityApi.endpoints.deleteComment.initiate({
          articleId,
          commentId: data.commentId,
        })
      );

      return null;
    }
  }

  if (request.method === "POST") {
    if (data.hasOwnProperty("like")) {
      await store.dispatch(communityApi.endpoints.postLike.initiate(articleId));

      return null;
    }
    if (data.hasOwnProperty("content") && data.state === "create") {
      await store.dispatch(
        communityApi.endpoints.createComment.initiate({ formData, articleId })
      );

      return null;
    }
    if (data.hasOwnProperty("content") && data.state === "edit") {
      await store.dispatch(
        communityApi.endpoints.editComment.initiate({
          formData,
          articleId,
          commentId: data.commentId,
        })
      );

      return null;
    }
  }
}

function CommunityDetail() {
  const authenticatedUser = useSelector((state) => state.user);
  const { articleId } = useParams();
  const { data, error } = useFetchArticleQuery(articleId);

  if (!data) return null;

  const {
    category,
    title,
    content,
    article_images,
    user,
    created_at,
    comments,
    like_users,
  } = data;

  return (
    <Page className="CommunityDetail">
      <div className="CommunityDetail__head">
        <Badge primary md>
          {category}
        </Badge>
        <h2 className="CommunityDetail__title">{title}</h2>
        <div className="CommunityDetail__head-bottom">
          <div className="CommunityDetail__user-info">
            <UserImage imageUrl={user.image} />
            <WriterInfo nickName={user.nickname} createdTime={created_at} />
          </div>
          {user.id === authenticatedUser.id ? (
            <MutateLinks
              article
              editPath="/community/edit"
              articleId={+articleId}
            />
          ) : (
            authenticatedUser.id !== -1 && <Like likeUsers={like_users} />
          )}
        </div>
      </div>
      <Line secondaryLight />
      <div className="CommunityDetail__body">
        <p className="CommunityDetail__content">{content}</p>
        {/* <ArticleImageList data={article_images} /> */}
        <ArticleCntList
          likesCnt={like_users.length}
          commentsCnt={comments.length}
        />
      </div>
      <Line secondaryLight />
      <div className="CommunityDetail__foot">
        <div className="CommunityDetail__comment-input-wrap">
          <UserImage imageUrl={user.image} />
          <CommentForm disabled={authenticatedUser.id === -1} create />
        </div>
        <div className="CommunityDetail__comment-list">
          <CommentList data={comments} />
        </div>
      </div>
    </Page>
  );
}

export default CommunityDetail;
export { action };
