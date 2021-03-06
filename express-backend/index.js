const fs = require("fs");
const ytdl = require("ytdl-core");
let { exec, spawn } = require("child_process");
const Express = require("express");

let playProcess = null;
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

// download song with :url and store it under :name
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

// play song with :name
app.get("/playSong/:name", (req, res) => {
  if (playProcess === null) {
    playProcess = exec("omxplayer -o local --vol 20 ./media/" + req.params.name);
    playProcess.stdin.setEncoding("utf-8");
  } else {
    res.sendStatus(500);
  }
});

app.get("/pause", (req, res) => {
  if (playProcess !== null) {
    playProcess.stdin.write("p")
  } else {
    res.sendStatus(500);
  }
});

// control volume
app.get("/higherVol", (req, res) => {
  if (playProcess) {
    playProcess.stdin.write("+");
  }
  console.log("higher");
});
app.get("/lowerVol", (req, res) => {
  if (playProcess) {
    playProcess.stdin.write("-");
  }
  console.log("lower");
});

// stop the song
app.get("/stopSong", (req, res) => {
  if (playProcess) {
	playProcess.stdin.write("q");
    playProcess.kill('SIGINT');
console.log(playProcess.pid);    
playProcess = null;
  }
  console.log("stop the song");
});

// get all songs
app.get("/songs", (req, res) => {
  const allFiles = fs
    .readdirSync("./media")
    .filter((file) => file.endsWith(".mp3"));
  console.log(allFiles);
  res.send(allFiles);
});

app.listen(port, () => console.log("listening on http://localhost:" + port));
