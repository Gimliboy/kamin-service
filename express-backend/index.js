const fs = require("fs");
const ytdl = require("ytdl-core");
const player = require("play-sound")((opts = {}));

import Express from "express";
const youtubeUrl = "https://www.youtube.com/";
const mediaUrl = "/media/";
const app = Express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("hi");
});

app.get("/downloadSong", (req, res) => {
  // download mp3 part of youtube video
  ytdl(youtubeUrl + "watch?v=AWKzr6n0ea0", {
    filter: "audioonly",
  }).pipe(fs.createWriteStream(mediaUrl + "kaminSound2.mp3"));
});

app.get("/playSong", (req, res) => {
  // play the song
  player.play(mediaUrl + "testVideo.mp3", (err) => {
    if (err) {
      console.log("problem");
    }
  });
});

app.get("/songs", (req, res) => {});

app.listen(port, () => console.log("listening on http://localhost:" + port));
