const express = require('express')
const redis = require('redis')

const app = express()
const publisher = redis.createClient(6379, "127.0.0.1")
const redisClient = redis.createClient(6379, "127.0.0.1")


publisher.connect()
// Intercept the subscribe method to log channel subscriptions
const originalSubscribe = redisClient.subscribe;
redisClient.subscribe = function (...args) {
  console.log(`Client subscribed to channel: ${args[0]}`);
  originalSubscribe.apply(redisClient, args);
};

app.get("/", (req, res) => {

    setInterval(()=>{
        const user = {
            id: Math.floor(Math.random() * 100) + 1,
            text: 'this is text example'
        }

        publisher.publish('article_user', JSON.stringify(user))
    
        console.log(user)
        res.json(user)

    }, 5000)
})

app.get('/publish', (req, res) => {
    const user = {
        id: Math.floor(Math.random() * 100) + 1,
        text: 'this is text example'
    }

    publisher.publish('article_user', JSON.stringify(user))

    console.log(user)
    res.json(user)
})

// Use setInterval to publish data every 5 seconds
setInterval(() => {
    const user = {
        id: Math.floor(Math.random() * 100) + 1,
        text: 'this is text example'
    };

    // Publish data to the 'article_user' channel
    publisher.publish('article_user', JSON.stringify(user));

    console.log(user);
}, 5000);

app.listen(3080, () => console.log("server running in port", 3080))