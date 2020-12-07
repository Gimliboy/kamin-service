const fs = require('fs');
const ytdl = require('ytdl-core');
const player = require('play-sound')(opts = {})

// download mp3 part of youtube video 
ytdl('https://www.youtube.com/watch?v=AWKzr6n0ea0', {filter: 'audioonly'})
  .pipe(fs.createWriteStream('/media/kaminSound2.mp3'));

/*player.play('testVideo.mp3', (err) =>
  {
	  if(err)
	  	{
			  console.log("problem")
		  }
  })*/