import React, { useState } from 'react'
import axios from 'axios'

export default function CommentCreate({ postId }) {
    const [content, setContent] = useState('')

    const handleOnSubmit = async (e) => {
        e.preventDefault()

        await axios.post(`http://posts.com/posts/${postId}/comments`, {
            content
        })

        setContent('')
    }
    return (
        <div className='mt-1'>
            <form onSubmit={handleOnSubmit}>
                <label className='text-white'>Comment</label>
                <div className='flex flex-col'>
                    <input type="text" value={content} onChange={e => setContent(e.target.value)} className='py-2 px-2 rounded-md' placeholder='Make a comment' />
                    <button className='w-[100px] bg-red-400 mt-1 rounded-md py-2 text-white'>Submit</button>
                </div>
            </form>
        </div>
    )
}
