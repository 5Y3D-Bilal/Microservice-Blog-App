const express = require('express');
const bodyParser = require("body-parser")
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios');

const app = express()
app.use(bodyParser.json())
app.use(cors())


const commentsByPostId = {}

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex')
    const { content } = req.body

    const comments = commentsByPostId[req.params.id] || []
    comments.push({ id: commentId, content, status: "pending" })

    commentsByPostId[req.params.id] = comments

    //* Making a request to the Event Bus so it can pass data to other services
    await axios.post(`http://eventbus-cluster-svc:4005/events`, {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    })

    res.status(201).send(comments)
})

app.get('/posts/:id/comments', (req, res) => {
    res.status(200).send(commentsByPostId[req.params.id] || [])
})

app.post('/events', async (req, res) => {//* So here we are getting all events from our EventBus / its using the same API as this route and here we are kinda listening for incoming events from our Event Bus.
    console.log('Event Received', req.body.type)

    const { type, data } = req.body

    if (type === 'CommentModerated') {
        const { postId, id, status, content } = data
        const comments = commentsByPostId[postId]

        const comment = comments.find(comment => {
            return comment.id === id
        })
        comment.status = status
        await axios.post('http://eventbus-cluster-svc:4005/events', {
            type: "CommentUpdated",
            data: {
                id,
                postId,
                status,
                content
            }
        })
    }

    res.send({})
})

app.listen(4001, () => console.log("Listening on port 4001"))