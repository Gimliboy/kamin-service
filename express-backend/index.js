import fs from "fs";
import ytdl from "ytdl-core";
import player from "play-sound";

import Express from "express";

const youtubeUrl = "https://www.youtube.com/";
const mediaUrl = "/media/";
const app = Express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("hi");
});

app.get("/downloadSong/:url", (req, res) => {
  // download mp3 part of youtube video
  ytdl((youtubeUrl + "/watch?v=" + req.params.url).replace("/", ""), {
    filter: "audioonly",
  }).pipe(fs.createWriteStream("./media/kaminSound2.mp3"));
});

app.get("/playSong/:name", (req, res) => {
  // play the song
  player.play("./media/"+req.params.name, (err) => {
    if (err) {
      console.log("problem");
    }
  });
});

app.get("/songs", (req, res) => {
  const allFiles =fs.readdirSync("./media").filter(file => file.endsWith(".mp3"))
  console.log(allFiles)
});

app.listen(port, () => console.log("listening on http://localhost:" + port));
