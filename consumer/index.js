const express = require('express')
const redis = require('redis')

const app = express()
const subscriber = redis.createClient(6379, "127.0.0.1")

subscriber.connect()

app.get('/', (req, res) => {
    subscriber.subscribe('article_user', (message)=>{
        console.log(message)
    })
})

// app.get('/subscribe', (req, res) => {
//     // subscriber.connect()
    
//     subscriber.subscribe('article_user', (message)=> {
//         console.log(message)
//     })

//     console.log("this is subscriber")
//     // res.json({
//     //     message: "this is subscriber"
//     // })
// })

app.listen(3081, ()=> console.log('server is running in port 3081'))