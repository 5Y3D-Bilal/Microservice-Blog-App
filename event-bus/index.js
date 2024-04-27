const express = require('express');
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

const events = []

app.post('/events', (req, res) => {//* Here we are listening for incoming requests on the /events endpoint using HTTP POST method. from both comments service and post service.
    const event = req.body

    //* So Now we are making a backup of data so if the server of any service goes down, we can restore it when ever that service is on again.

    events.push(event)

    //* and then we are sending all data to our services. with a post request and they are liseniting for incoming requests.
    axios.post('http://posts-cluster-srv:4000/events', event).catch((err) => {
        console.log(err.message); // For Post Service
    });
    axios.post('http://comments-svc:4001/events', event).catch((err) => {
        console.log(err.message); // For Comments Service
    });
    axios.post('http://query-svc:4002/events', event).catch((err) => {
        console.log(err.message); // For Query Service
    });
    axios.post('http://moderation-svc:4003/events', event).catch((err) => {
        console.log(err.message); // For Moderation Service
    });

    res.send({ status: "ok" })
})

//* When the query service will make a GET request asking for all the events. Now we can ezly provide it because we have made storage for events so if a service is offline or its down for some resone.    
app.get('/events', (req, res) => {
    res.send(events)
})

app.listen(4005, () => console.log("Listening on port 4005"))