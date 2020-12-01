<template>
  <div>
    <v-card shaped>
      <v-card-text
        ><h1>Playing {{ fileName }}</h1>
        <h2 v-show="playing" v-text="this.audio.currentTime"></h2>
        <v-progress-circular
          :rotate="-90"
          :size="50"
          :value="this.audio.currentTime"
          :width="10"
        ></v-progress-circular
      ></v-card-text>
      <v-card-actions class="btn-bar">
        <v-icon large v-on:click="pause()">mdi-pause</v-icon>
        <v-icon v-bind:disabled="playing" large v-on:click="play()"
          >mdi-play</v-icon
        >
        <v-icon large v-on:click="lowerVolume()"> mdi-minus </v-icon>
        <v-icon large v-on:click="higherVolume()"> mdi-plus </v-icon>
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
    },
    pause() {
      this.audio.pause();
      this.playing = false;
    },
    lowerVolume() {
      if (this.audio.volume - 0.1 >= 0) {
        this.audio.volume -= 0.1;
      }
      console.log(this.audio.currentTime);
      console.log(this.audio.length);
    },
    higherVolume() {
      if (this.audio.volume + 0.1 <= 1) {
        this.audio.volume += 0.1;
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
</style>