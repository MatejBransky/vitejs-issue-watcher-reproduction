import React from "react";
import useSWR from "swr";
import { Comment, CommentType } from "./Comment";

export const Post: React.FC<{ id: string }> = ({ id }) => {
  const { data: post, /*isValidating: isPostValidating*/ } = useSWR<PostType>(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      onSuccess(data) {
        console.log("[FETCH]: post:", data);
      },
    }
  );
  const { data: comments, /*isValidating: areCommentsValidating*/ } = useSWR<
    CommentType[]
  >(`https://jsonplaceholder.typicode.com/comments?postId=${id}`, {
    onSuccess(data) {
      console.log("[FETCH]: comments:", data);
    },
  });
  // console.log("[RENDER]: isValidating", {
  //   post: isPostValidating,
  //   comments: areCommentsValidating,
  // });

  console.log(`[RENDER]: <Post id="${id}" /> rendered!`);

  if (!post || !comments) {
    return null;
  }

  return (
    <div>
      <h1>Post with id: {id}</h1>
      <pre>
        <code>{JSON.stringify(post, null, "\t")}</code>
      </pre>
      <h2>Comments:</h2>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
