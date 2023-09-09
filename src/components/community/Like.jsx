import React from "react";
import { useSelector } from "react-redux";
import { Form } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function Like({ likeUsers = [] }) {
  const authenticatedUserId = useSelector((state) => state.user.id);

  let liked = likeUsers.some((likeUser) => likeUser === authenticatedUserId);

  return (
    <Form method="post" className="Like">
      <button name="like" value={liked ? "false" : "true"}>
        {liked ? (
          <AiFillHeart className="Like__full-heart" />
        ) : (
          <AiOutlineHeart className="Like__empty-heart" />
        )}
      </button>
    </Form>
  );
}

export default Like;
