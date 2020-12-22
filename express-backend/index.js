const fs = require('fs');
const ytdl = require('ytdl-core');
const player = require('play-sound')(opts = {})

import Express from 'express';

const app = Express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("hi")
})

app.get("/downloadSong", (req, res) => {
// download mp3 part of youtube video 
ytdl('https://www.youtube.com/watch?v=AWKzr6n0ea0', {filter: 'audioonly'})
  .pipe(fs.createWriteStream('/media/kaminSound2.mp3'));
})

app.get("/playSong", (req, res) => {
player.play('testVideo.mp3', (err) =>
  {
	  if(err)
	  	{
			  console.log("problem")
		  }
  })
})

app.get("/songs", (req, res) => {

})

app.listen(port, () => console.log("listening on http://localhost:" + port))