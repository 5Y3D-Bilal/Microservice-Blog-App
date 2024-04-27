const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const posts = {}

const EventHandlers = (type, data) => {
    //We got 2 services and now we are going to structure them in a way that it is easier to get posts data by a user.
    if (type === 'PostCreated') {
        const { id, title } = data
        posts[id] = { id, title, comments: [] }
    }

    // Event Comming from Comments and for now the status in  pending for this comment. comment -> eventBus -> query
    if (type === 'CommentCreated') {
        const { id, postId, content, status } = data

        const post = posts[postId]
        post.comments.push({ id, content, status })
    }

    // Event Comming from Comments after the modration has been completed. comment -> eventBus -> query
    if (type === 'CommentUpdated') {
        const { id, postId, content, status } = data

        const post = posts[postId]
        const comment = post.comments.find(comment => { // iderate through all comments and it will updated the status to "Approved" || "Rejected".
            return comment.id === id
        })

        comment.status = status
        comment.content = content
    }
}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/events', (req, res) => {//* So here we are getting all events from our EventBus / its using the same API as this route and here we are kinda listening for incoming events from our Event Bus.
    const { type, data } = req.body //Extracting the type and data from the request body 

    EventHandlers(type, data)

    res.send({})
})


app.listen(4002, async () => {
    console.log('listening on port 4002')
    
    try {
        const res = await axios.get("http://eventbus-cluster-svc:4005/events");

        for (let event of res.data) {
            console.log("Processing event:", event.type);

            EventHandlers(event.type, event.data);
        }
    } catch (error) {
        console.log(error.message);
    }
})