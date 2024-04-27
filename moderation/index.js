const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json());


app.post('/events', async (req, res) => {
    const { type, data } = req.body

    if (type === 'CommentCreated') {
        const status = data.content.includes('nigga') ? 'Rejected' : 'Approved';

        await axios.post('http://eventbus-cluster-svc:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        });
    }
})


app.listen(4003, () => console.log(`listening on port  4003`))
