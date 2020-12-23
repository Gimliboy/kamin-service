const fs = require("fs");
const ytdl = require("ytdl-core");
const {exec, spawn} = require("child_process");
const Express = require("express");

const playProcess = null;
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
  playProcess = spawn("omxplayer -o local ./media/" + req.params.name);
  playProcess.stdin.setEncoding('utf-8')
});

app.get("/higherVol", (req, res) => {
  if(playProcess)
  {
    playProcess.stdin.write("+ \n")
    playProcess.stdin.end()
  }
  console.log("higher")
});
app.get("/lowerVol", (req, res) => {
  if(playProcess)
  {
    playProcess.stdin.write("- \n")
    playProcess.stdin.end()
  }
  console.log("lower")
});
app.get("/stopSong", (req, res) =>{
  if(playProcess)
  {
    playProcess.kill();
  }
  console.log("stop the song")
})
app.get("/songs", (req, res) => {
  const allFiles = fs
    .readdirSync("./media")
    .filter((file) => file.endsWith(".mp3"));
  console.log(allFiles);
  res.send(allFiles);
});

app.listen(port, () => console.log("listening on http://localhost:" + port));
