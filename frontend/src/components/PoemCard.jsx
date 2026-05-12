import React, { useState } from "react";
import API from "../api/axios";
import CommentCard from "./CommentCard";

export default function PoemCard({ poem }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const like = async () => {
    await API.patch(`/poems/like/${poem._id}`);
    window.location.reload();
  };

  const loadComments = async () => {
    const res = await API.get(`/comments/${poem._id}`);
    setComments(res.data);
  };

  const addComment = async () => {
    if (!text.trim()) return;
    await API.post("/comments", { poem: poem._id, text });
    setText("");
    loadComments();
  };

  return (
    <article className="poem-card fade-up">
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="poem-title">{poem.title}</h2>
          <p className="poem-meta mt-2">by {poem.author?.username || "Unknown poet"}</p>
        </div>

        <p className="poem-body whitespace-pre-line">{poem.content}</p>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button onClick={like} className="pill-button" aria-label="Like poem">
            ❤️ {poem.likes.length}
          </button>
          <button onClick={loadComments} className="pill-button">
            Comments
          </button>
        </div>

        <div className="space-y-2 border-t border-[#eadfce] pt-3">
          {comments.length === 0 ? (
            <p className="text-sm font-medium text-[#7c877f]">No comments yet</p>
          ) : (
            comments.map((comment) => <CommentCard key={comment._id} comment={comment} />)
          )}
        </div>

        <div className="flex gap-2 max-sm:flex-col">
          <input
            className="form-field min-w-0 flex-1"
            placeholder="Add a thoughtful comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={addComment} className="secondary-button shrink-0">
            Post
          </button>
        </div>
      </div>
    </article>
  );
}
