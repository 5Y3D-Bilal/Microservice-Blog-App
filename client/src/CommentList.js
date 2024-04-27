import React from 'react'

export default function CommentList({ comments }) {

    const renderedComments = comments.map((comment) => {
        return <li li key={comment.id} className={`${comment.status === 'Rejected' && 'text-yellow-600 font-bold' || comment.status === 'pending' && 'text-black font-bold'}`}> {comment.status === 'pending' ? "Your comment contains some malicious things. and a mods will review it in 2-3 hours" : comment.status === "Approved" ? comment.content : "This Comment is Reject due to its a slang."}</li>
    })
    return (
        <ul className='list-disc px-3 text-white mt-3'>{renderedComments}</ul>
    )
}
