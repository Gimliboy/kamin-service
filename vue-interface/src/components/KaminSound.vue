<template>
  <div>
    <v-card shaped v-bind:class="{'playing': (this.playing === true)}">
      <v-card-text class="heading"
        ><h1>Playing {{ fileName }}</h1>
        <v-progress-circular id="progress"
          v-show="false"
          :rotate="-90"
          :size="70"
          :value="0"
          :width="10"
        ></v-progress-circular
      ></v-card-text>
      <v-card-actions class="btn-bar">
        <v-icon large v-on:click="pause()">mdi-pause</v-icon>
        <v-icon large v-on:click="play()">mdi-play</v-icon>
        <v-icon large v-on:click="lowerVolume()"> mdi-minus </v-icon>
        <v-icon large v-on:click="higherVolume()"> mdi-plus </v-icon>
	<v-icon large v-on:click="muteVolume()"> mdi-stop </v-icon>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "KaminSound",
  props: { fileName: String },
  data() {
    return {
      audioURL: String,
      audio: Audio,
      playing: Boolean,
      finished: Boolean,
      percentFinished: Number,
      oldVolume: Number,
    };
  },
  mounted() {
    /*this.audio = new Audio(require("../assets/audio/" + this.fileName));
    this.playing = false;
    console.log(this.audio);*/
    //this.player = omx('../assets/audio/' + this.fileName)
  },
  methods: {
    play() {
      /*this.audio.play();
      this.audio.volume = 0.5;*/
      let response = fetch(
        "http://192.168.178.90:3000/playSong/" + this.fileName
      ).then((response) => {
        console.log(response.status);
        if (response.status == 200) {
                this.playing = true;
} else {
          alert("other song already playing");
        }
      });
      console.log(response);
      /*player.play('../assets/audio/testVideo.mp3', (err) => 
      {
        if (err)
        {
          console.log("error: " + err)
        }
        else{
          console.log("hi")
        }
      });*/

      /*let i = 0;
      setInterval(
        () =>{
          this.percentFinished = (this.audio.currentTime / this.audio.duration) * i
          i++
        }, 2000)*/

      //var stream = this.$fs.createReadStream('../assets/audio/testVideo.mp3');
      //stream.pipe(new this.$decoder()).pipe(new this.$speaker())
    },
    pause() {
      // this.audio.pause();
      //this.playing = false;
      //let response = fetch("http://192.168.178.90:3000/pause");
      //console.log(response);
      // console.log(this.audio.duration)
      //this.player.pause();
    },
    lowerVolume() {
      let response = fetch("http://192.168.178.90:3000/lowerVol");
      console.log(response);
      /*if (this.audio.volume - 0.1 >= 0) {
        this.audio.volume -= 0.1;
      }*/
      //this.player.volDown();
    },
    higherVolume() {
      let response = fetch("http://192.168.178.90:3000/higherVol");
      console.log(response);
      /*if (this.audio.volume + 0.1 <= 1) {
        this.audio.volume += 0.1;
      }*/
      //this.player.volUp();
    },
    muteVolume() {
        let response = fetch("http://192.168.178.90:3000/stopSong").then((response) => {
            this.playing = false
            console.log(response);
        });
      console.log(response);
      /*if (this.audio.volume > 0) {
        this.oldVolume = this.audio.volume;
        this.audio.volume = 0;
      } else {
        this.audio.volume = this.oldVolume;
      }*/
    },
    computeRate() {
      //return this.audio.currentTime / 100;
    },
  },
};
</script>

<style scoped>
.btn-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.heading {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
#progress{
  visibility: hidden;
}
.playing{
  border-radius: 1rem;
  border: burlywood;
}
</style>
