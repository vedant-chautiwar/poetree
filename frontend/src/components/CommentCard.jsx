import React from "react";

export default function CommentCard({ comment }) {
  return (
    <div className="comment-card">
      <p className="text-sm font-extrabold text-[#24493d]">{comment.user?.username}</p>
      <p className="mt-1 text-sm leading-6 text-[#435049]">{comment.text}</p>
    </div>
  );
}
