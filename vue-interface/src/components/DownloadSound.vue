<template>
  <div>
    <v-card shaped>
      <div class="heading">
        <v-card-text class="heading"><h1>Download</h1> </v-card-text>
        <v-icon v-on:click="$emit('update')">mdi-reload</v-icon>
      </div>
      <v-card-actions class="btn-bar">
        <div>
          <v-text-field v-model="url">
            <v-icon slot="append" large v-on:click="download()"
              >mdi-download</v-icon
            >
          </v-text-field>
        </div>
        <div>
          <v-text-field v-model="name"></v-text-field>
          <div slot="append">.mp3</div>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "DownloadSound",
  props: {},
  data() {
    return {
      url: String,
      name: String,
    };
  },
  mounted() {
    this.url = "";
    this.name = "";
  },
  methods: {
    download() {
      console.log(this.$fs);
      try {
        let response = fetch(
          "http://localhost:3000/downloadSong/" +
            this.url.replace("https://www.youtube.com/watch?v=", "") +
            "/" +
            this.name
        ).then((response) => {
          console.log(response.status);
          if (response.status == 200) {
            alert("downloaded");
            this.$emit("update");
          } else {
            alert("problem with download");
          }
        });
        console.log(response);
      } catch (error) {
        console.log(error);
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
.heading {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>