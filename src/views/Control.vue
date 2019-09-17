<template>
  <div>
    <v-toolbar class="black--text">
      <v-btn icon exact to="/">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>Roof Control</v-toolbar-title>
    </v-toolbar>
    <v-container text-xs-center v-if="mode.status_kendali === '0'">
      <p color="teal" class="title mb-0">Hanya Aktif untuk Mode Manual</p>
      <div>Press the button close or open to control</div>
    </v-container>
    <v-container text-xs-center v-if="mode.status_kendali === '1'">
      <p color="teal" class="title mb-0" v-if="motorservo.status_kendali === '0'">Roof is Closed</p>
      <p color="teal" class="title mb-0" v-if="motorservo.status_kendali === '1'">Roof is Opened</p>
      <div>Press the button close or open to control</div>
    </v-container>

    <v-img :src="require('@/assets/static/pakaian.jpg')" aspect-ratio="2.75" width="100%"></v-img>
    <v-container>
      <v-layout row wrap>
        <v-flex xs6>
          <div class="text-xs-center" v-if="mode.status_kendali === '1'">
            <v-btn color="teal" v-on:click="btnClose">Close</v-btn>
          </div>
          <div class="text-xs-center" v-else>
            <v-btn color="teal" disabled>Close</v-btn>
          </div>
        </v-flex>
        <v-flex xs6>
          <div class="text-xs-center" v-if="mode.status_kendali === '1'">
            <v-btn color="teal" v-on:click="btnOpen">Open</v-btn>
          </div>
          <div class="text-xs-center" v-else>
            <v-btn color="teal" disabled>Open</v-btn>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-form ref="form" v-on:submit.prevent="updateMode">
            <v-select
              v-model="status_kendali"
              :items="items"
              item-value="id"
              item-text="kendali"
              label="Select Mode"
            ></v-select>
            <div class="text-xs-center">
              <v-btn color="teal" fab large type="submit">Change</v-btn>
            </div>
          </v-form>
        </v-flex>
        <v-flex xs12 pt-2>
          <p class="mb-0 text-xs-center" v-if="mode.status_kendali === '1'">Manual mode is active</p>
          <p class="mb-0 text-xs-center" v-else>Automatic mode is active</p>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    motorservo: [],
    mode: [],
    status_kendali: null,
    items: [
      {
        id: "0",
        kendali: "Automatic"
      },
      {
        id: "1",
        kendali: "Manual"
      }
    ]
  }),
  methods: {
    load() {
      let motorservo = "/jsonmotorservo";
      let mode = "/jsonmode";
      // Motor Servo otomatis 0 = Menutup, 1 = Membuka
      this.axios
        .get(motorservo)
        .then(response => {
          let motorservo = response.data;
          this.motorservo = motorservo;
        })
        .catch(error => {
          let responses = error.response;
          console.log(responses);
        });
      // Mode Manual dan otomatis 0 = Otomatis, 1 = Manual
      this.axios
        .get(mode)
        .then(response => {
          let mode = response.data;
          this.mode = mode;
        })
        .catch(error => {
          let responses = error.response;
          console.log(responses);
        });
    },
    btnOpen() {
      this.axios
        .post("/servobuka")
        .then(response => {
          this.load();
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    btnClose() {
      this.axios
        .post("/servotutup")
        .then(response => {
          this.load();
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateMode(e) {
      e.preventDefault();
      this.axios
        .post("/pilihmode", {
          status_kendali: this.status_kendali
        })
        .then(response => {
          this.load();
          this.status_kendali = "Select Mode";
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.load();
  }
};
</script>
<style scoped>
</style>
