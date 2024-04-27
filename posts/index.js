const express = require('express');
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios');

const app = express();
app.use(bodyParser.json())
app.use(cors())

const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/posts/create', async (req, res) => {
    const id = randomBytes(4).toString('hex') // Genrating a random id for every post that will be made.
    const { title } = req.body

    posts[id] = {
        id, title
    }

    //* Making a request to the Event Bus so it can pass data to other services
    await axios.post(`http://eventbus-cluster-svc:4005/events`, {
        type: 'PostCreated',
        data: {
            id, title
        }
    })

    res.status(201).send(posts[id])  // Send a response back with the new created post.
})


app.post('/events', (req, res) => { //* So here we are getting all events from our EventBus / its using the same API as this route and here we are kinda listening for incoming events from our Event Bus.
    console.log('Received Event', req.body.type)

    res.send({})
})


app.listen(4000, () => console.log('Listening on port 4000', 'Tesing  Server'))