<template>
  <div>
    <v-card shaped>
      <v-card-text class="heading"
        ><h1>Playing {{ fileName }}</h1>
        <v-progress-circular
          v-show="this.playing"
          :rotate="-90"
          :size="70"
          :value="this.percentFinished"
          :width="10"
          >{{ Math.round(this.audio.currentTime) }} s</v-progress-circular
        ></v-card-text
      >
      <v-card-actions class="btn-bar">
        <v-icon large v-on:click="pause()">mdi-pause</v-icon>
        <v-icon v-bind:disabled="playing" large v-on:click="play()"
          >mdi-play</v-icon
        >
        <v-icon large v-on:click="lowerVolume()"> mdi-minus </v-icon>
        <v-icon large v-on:click="higherVolume()"> mdi-plus </v-icon>
        <v-icon large v-on:click="muteVolume()">mdi-volume-off</v-icon>
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
    this.audio = new Audio(require("../assets/audio/" + this.fileName));
    this.playing = false;
    console.log(this.audio);
  },
  methods: {
    play() {
      this.audio.play();
      this.audio.volume = 0.5;
      this.playing = true;
      let i = 0;
      setInterval(() => {
        this.percentFinished =
          (this.audio.currentTime / this.audio.duration) * i;
        i++;
      }, 2000);
    },
    pause() {
      this.audio.pause();
      this.playing = false;
      console.log(this.audio.duration);
    },
    lowerVolume() {
      if (this.audio.volume - 0.1 >= 0) {
        this.audio.volume -= 0.1;
      }
    },
    higherVolume() {
      if (this.audio.volume + 0.1 <= 1) {
        this.audio.volume += 0.1;
      }
    },
    muteVolume() {
      if (this.audio.volume > 0) {
        this.oldVolume = this.audio.volume;
        this.audio.volume = 0;
      } else {
        this.audio.volume = this.oldVolume;
      }
    },
    computeRate() {
      return this.audio.currentTime / 100;
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
</style>