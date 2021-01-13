import React from "react";

export const Comment: React.FC<{ comment: CommentType }> = ({ comment }) => {
  return (
    <div>
      <h2>{comment.name}</h2>
      <small>{comment.email}</small>
      <p>{comment.body}</p>
    </div>
  );
};

export type CommentType = {
  postId: string;
  id: number;
  name: string;
  email: string;
  body: string;
};
