import fs, { lstat } from "fs";
import ytdl from "ytdl-core";
import player from "play-sound";
import exec, { spawn } from "child_process";
import Express from "express";
import { stderr } from "process";

const youtubeUrl = "https://www.youtube.com/";
const mediaUrl = "/media/";
const app = Express();
const port = 3000;
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("hi");
});

app.get("/downloadSong/:url/:name", (req, res) => {
  console.log("downloading....");
  // download mp3 part of youtube video
  try {
    ytdl((youtubeUrl + "/watch?v=" + req.params.url).replace("/", ""), {
      filter: "audioonly",
    })
      .on("progress", (numChunk, numBytes, numTotal) => {
        if (numBytes / numTotal == 1) {
          console.log("finished");
          res.sendStatus(200);
        }
      })
      .pipe(fs.createWriteStream("./media/" + req.params.name + ".mp3"));
  } catch (err) {
    res.sendStatus(500);
  }
});

app.get("/playSong/:name", (req, res) => {
  spawn("start ", ["./media/" + req.params.name]);
  res.sendStatus(200);
});

app.get("/songs", (req, res) => {
  const allFiles = fs
    .readdirSync("./media")
    .filter((file) => file.endsWith(".mp3"));
  console.log(allFiles);
  res.send(allFiles);
});

app.listen(port, () => console.log("listening on http://localhost:" + port));
