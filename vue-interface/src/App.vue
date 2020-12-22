<template>
  <div id="main">
    <div class="sound-list">
        <download-sound/>
      <div class="sound-item" v-for="file in soundFiles" v-bind:key="file">
        <kamin-sound v-bind:fileName="file" />
      </div>
    </div>
  </div>
</template>

<script>
import KaminSound from "./components/KaminSound.vue";
import DownloadSound from "./components/DownloadSound";
export default {
  name: "App",

  components: {
    KaminSound,
    DownloadSound
  },
  mounted() {
    this.soundFiles = ["testVideo2.mp3", "testVideo.mp3"];
  },
  data: () => ({
    soundFiles: [],
  }),
};
</script>
<style scoped>
#main {
  background-image: url("./assets/kaminFeuer.jpg");
  height: 100vh;
}
.sound-item {
  padding: 1.5rem;
}
.sound-list {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
</style>