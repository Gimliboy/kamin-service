<template>
    <div>
    <v-card shaped>
      <v-card-text class="heading"
        ><h1>Download</h1>
        </v-card-text>
      <v-card-actions class="btn-bar">
        <div>
        <v-text-field v-model="url">
        <v-icon slot="append" large v-on:click="download()">mdi-download</v-icon>
        </v-text-field>
        </div>
        <div>
            <div>{{name}}</div>
        <v-text-field v-model="name"></v-text-field>
        </div>
      </v-card-actions>
    </v-card>
    </div>
</template>

<script>
export default {
    name:"DownloadSound",
    props: {},
    data() {
        return{
            url: String,
            name: String
        }
    },
    mounted(){
        this.url = ""
        this.name = ""
    },
    methods: {
        download(){
            console.log(this.$fs)
            try {
            this.$ytdl(this.url, {filter: 'audioonly'})
  .pipe(this.$fs.createWriteStream(`/media/${name}.mp3`));
            } catch (error) {
            console.log(error)        
            }}
    }
}
</script>
<style scoped>
.btn-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>