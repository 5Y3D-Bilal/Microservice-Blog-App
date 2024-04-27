import React from 'react'
import './style.css'
import PostCreated from './postCreated'
import PostList from './PostList'

const App = () => {
    return <div >
        <div className='flex justify-center items-center py-10 flex-col space-y-2'>
            <h1 className='text-3xl font-semibold'>Create Post</h1>
            <PostCreated />
            <hr />
            <h1 className='text-2xl font-semibold'>Posts</h1>
            <PostList />
        </div>
    </div>
}

export default App