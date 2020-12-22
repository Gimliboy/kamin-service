import Express from 'express';

const app = Express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("hi")
})

app.get("/downloadSong", (req, res) => {

})

app.get("/playSong", (req, res) => {

})

app.get("/songs", (req, res) => {

})

app.listen(port, () => console.log("listening on http://localhost:" + port))