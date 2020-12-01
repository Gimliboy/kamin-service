<template>
  <div>
    <v-card shaped>
      <v-card-text
        ><h1>Playing {{ fileName }}</h1>
        <h2 v-show="this.audio.playing">
          {{ this.audio.currentTime }}
        </h2></v-card-text
      >
      <v-card-actions class="btn-bar">
        <v-icon large v-on:click="pause()">mdi-pause</v-icon>
        <v-icon large v-on:click="play()">mdi-play</v-icon>
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
  mounted() {
    this.audio = new Audio(require("../assets/audio/" + this.fileName));
  },
  data() {
    return {
      audioURL: String,
      audio: Audio,
    };
  },
  methods: {
    play() {
      this.audio.play();
      this.audio.volume = 0.5;
    },
    pause() {
      this.audio.pause();
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