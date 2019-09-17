<template>
  <div>
    <v-toolbar class="black--text">
      <v-btn icon exact to="/">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>About</v-toolbar-title>
    </v-toolbar>
    <v-container fluid grid-list-lg>
      <v-flex xs12>
        <v-img
          :src="require('@/assets/static/logoapp.png')"
          width="70"
          height="70"
          class="imageposition"
        ></v-img>
        <p class="black--text title text-xs-center">Smart Clothesline</p>
        <p>Smart Clothesline adalah aplikasi kendali jemuran antisipasi hujan. Aplikasi ini dapat mengendalikan atap jemuran secara otomatis ataupun manual.</p>
      </v-flex>
    </v-container>
  </div>
</template>
<style scoped>
.imageposition {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>