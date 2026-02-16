import React from 'react'
import { useState } from 'react'
import API from '../api/axios'
import CommentCard from './CommentCard'

export default function PoemCard ({poem}) {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");

    const like = async()=>{
        await API.patch(`/poems/like/${poem._id}`);
        window.location.reload();
    }
    const loadComments = async()=>{
        const res = await API.get(`/comments/${poem._id}`);
        setComments(res.data);
    }
    const addComment = async()=>{
        await API.post("/comments", {poem:poem._id, text});
        setText("");
        loadComments();
    }
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 mb-3 hover:scale-[1.02] transition-all duration-200 hover:cursor-pointer">
        <h2 className="text-xl font-semibold">
            {poem.title}
        </h2>
        <p className="mt-2 whitespace-pre-line">
            {poem.content}
        </p>
        <p className="text-sm text-gray-500 mt-1">
            {poem.author?.username}
        </p>
        <div className="flex gap-4 mt-3">
            <button onClick={like} className='p-2 rounded hover:bg-gray-100 transition-all duration-300 hover:cursor-pointer'>
                ❤️ {poem.likes.length}
            </button>
            <button onClick={loadComments} className='p-2 rounded hover:bg-gray-100 transition-all duration-300'>Comments</button>
        </div>
        <div className="mt-3 space-y-2">
            {comments.length === 0 ? (
                <p className="text-sm text-gray-400">No comments yet</p>
            ):(
                comments.map((comment) => (
                <CommentCard key={comment._id} comment={comment} />
                ))
            )}
        </div>
        <div className="flex mt-3 gap-2">
            <input className='border p-2 flex-1 rounded-lg' placeholder='Add comment...' value={text} onChange={(e)=> setText(e.target.value)} />
            <button onClick={addComment} className='p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:cursor-pointer'>Post</button>
        </div>
    </div>
  )
}
