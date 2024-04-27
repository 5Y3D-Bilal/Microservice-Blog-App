import React, { useState } from 'react'
import axios from 'axios'

export default function PostCreated() {
    const [title, setTitle] = useState('')

    const hanldeOnSubmit = async (e) => { 
        e.preventDefault()
        await axios.post('http://posts.com/posts/create' , {
            title
        })

        setTitle('')  
    }


    return (
        <div className='bg-blue-300 w-1/2 flex justify-center items-center h-[300px]'>
            <form onSubmit={hanldeOnSubmit}>
                <div className='group flex flex-col w-[400px]'>
                    <label className='text-2xl text-white'>Title</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} type="text" className='border py-2 px-2 rounded-md' placeholder='Make a post' />
                </div>
                <button className='py-2 px-4 w-full mt-1 bg-red-400 text-white rounded-md'>Submit</button>
            </form>
        </div>
    )
}
