const express = require('express');
const fs = require('fs');
const app = express();
const server = require('http').createServer(app);
const redis = require('redis');

const videoPath = './meme.mp4'; // Adjust to your video file path
const videoBuffer = fs.readFileSync(videoPath);
const videoBase64 = videoBuffer.toString('base64');

// Connect to Redis
const redisClient = redis.createClient();
redisClient.connect()

app.get('/', (req, res) => {
  // Publish video to Redis channel 'video_channel'
  const count = {
    id: Math.floor(Math.random(10)),
    name: 'counting 1',
    total: '20'
  }

  setInterval(()=> {
    redisClient.publish('video_channel', JSON.stringify(videoBase64));
    redisClient.publish('video_counting', JSON.stringify(count))
  }, 10000)

  console.log(`published channel`)

  // Respond with the HTML containing the video tag
  res.send(`<video controls><source type="video/mp4" src="data:video/mp4;base64,${videoBase64}"></video>`);
});

// setInterval(()=> {
//   redisClient.publish('video_channel', JSON.stringify(videoBase64))
//   console.log(videoBase64)
// }, 500)


server.listen(3002, () => {
  console.log('Express server is running on port 3002');
});