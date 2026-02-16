import React from 'react'

export default function CommentCard ({comment}) {
  return (
    <div className="bg-gray-100 p-2 rounded text-sm">
        <b>{comment.user?.username}</b>
        <p>{comment.text}</p>
    </div>
  )
}
