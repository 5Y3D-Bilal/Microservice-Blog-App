import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'

export default function PostList() {
    const [posts, setPosts] = useState({})

    const fetchPosts = async () => {
        const res = await axios.get('http://posts.com/posts')
        console.log(res.data)
        setPosts(res.data)
    }
    useEffect(() => {
        fetchPosts()
    }, [])

    const renderedPosts = Object.values(posts).map(post => {
        return <div className='bg-blue-600 w-[400px]  py-6 px-4 border rounded-md' key={post.id}>
            <div>
                <h3 className='text-white'>{post.title}</h3>
                <CommentList comments={post.comments} />
                <CommentCreate postId={post.id} />
            </div>
        </div>
    })
    return (
        <div className='grid  gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>{renderedPosts}</div>
    )
}
