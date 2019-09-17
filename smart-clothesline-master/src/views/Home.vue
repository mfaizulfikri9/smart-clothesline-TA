<template>
  <div>
    <v-card>
      <v-container fluid grid-list-lg>
        <v-flex xs12 text-xs-center>
          <v-toolbar-title class="black--text title">Smart Clothesline</v-toolbar-title>
          <v-img
            :src="require('@/assets/static/logoapp.png')"
            width="70"
            height="70"
            class="imageposition"
          ></v-img>Kendalikan Jemuran dengan Mudah
        </v-flex>
        <v-layout row wrap>
          <v-flex xs12>
            <v-img
              v-if="monitor.hujan === '1.00'"
              :src="require('@/assets/static/cerah.jpg')"
              aspect-ratio="2.75"
            ></v-img>
            <v-img v-else :src="require('@/assets/static/hujan.jpeg')" aspect-ratio="2.75"></v-img>
            <v-card color="teal" class="black--text">
              <v-card-actions>
                <v-flex>
                  <span v-if="monitor.hujan === '1.00'">Cuaca Cerah</span>
                  <span v-else>Cuaca Hujan</span>
                </v-flex>
                <v-flex class="text-xs-right">
                  <span>{{ tanggal }} {{waktu}}</span>
                </v-flex>
              </v-card-actions>
            </v-card>
          </v-flex>
          <!-- Temperature -->
          <v-flex xs6 mt-2>
            <v-card color="yellow accent-4" class="black--text">
              <v-card-title primary-title>
                <div xs6>
                  <v-img :src="require('@/assets/static/term.png')" width="50" height="50"></v-img>
                </div>
                <div xs6>
                  <span>{{ monitor.suhu }}&#176;C</span>
                </div>
              </v-card-title>
            </v-card>
            <p>Temperature</p>
          </v-flex>
          <!-- Humidity -->
          <v-flex xs6 mt-2>
            <v-card color="yellow accent-4" class="black--text">
              <v-card-title primary-title>
                <div xs6>
                  <v-img :src="require('@/assets/static/humidity.png')" width="50" height="50"></v-img>
                </div>
                <div xs6>
                  <span>{{ monitor.kelembaban }}%</span>
                </div>
              </v-card-title>
            </v-card>
            <p>Humidity</p>
          </v-flex>

          <!-- Kendali Atap  -->
          <v-flex xs6 pt-0>
            <v-card color="red lighten-1" class="black--text">
              <!-- Manual  -->
              <v-card-title primary-title v-if="mode.status_kendali === '1'">
                <div xs6>
                  <v-img :src="require('@/assets/static/roof.png')" width="50" height="50"></v-img>
                </div>
                <div xs6 v-if="motorservo.status_kendali === '0'">
                  <span>Close</span>
                </div>
                <div xs6 v-if="motorservo.status_kendali === '1'">
                  <span>Open</span>
                </div>
              </v-card-title>
              <!-- Otomatis -->
              <v-card-title primary-title v-else>
                <div xs6>
                  <v-img :src="require('@/assets/static/roof.png')" width="50" height="50"></v-img>
                </div>
                <div xs6>
                  <span>Non Aktif</span>
                </div>
              </v-card-title>
            </v-card>
            <p>Roof Status</p>
          </v-flex>
          <!-- End Kendali Atap  -->

          <!-- Mode  -->
          <v-flex xs6 pt-0>
            <v-card color="red lighten-1" class="black--text">
              <v-card-title primary-title>
                <div xs6>
                  <v-img :src="require('@/assets/static/mode.png')" width="50" height="50"></v-img>
                </div>
                <div xs6 v-if="mode.status_kendali === '0'">
                  <span>Otomatis</span>
                </div>
                <div xs6 v-else>
                  <span>Manual</span>
                </div>
              </v-card-title>
            </v-card>
            <p>Mode</p>
          </v-flex>
          <!-- End Mode  -->
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    waktu: "",
    tanggal: "",
    monitor: [],
    motorservo: [],
    mode: []
  }),
  methods: {
    load() {
      let url = "/monitor";
      let motorservo = "/jsonmotorservo";
      let mode = "/jsonmode";
      this.axios
        .get(url)
        .then(response => {
          let monitor = response.data;
          this.monitor = monitor;
        })
        .catch(error => {
          let responses = error.response;
          console.log(responses);
        });
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
    waktuFunction: function() {
      var datahari = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu"
      ];
      var databulan = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
      ];
      var v = this;
      var myDate = new Date().getDate();
      var _hari = new Date().getDay();
      var _bulan = new Date().getMonth();
      var _tahun = new Date().getYear();
      var hari = datahari[_hari];
      var bulan = databulan[_bulan];
      var tahun = _tahun < 1000 ? _tahun + 1900 : _tahun;
      v.tanggal = hari + ", " + myDate + " " + bulan + " " + tahun;
      setInterval(() => {
        v.waktu = new Date().toLocaleTimeString();
      }, 1000);
    }
  },
  mounted() {
    this.waktuFunction();
    setInterval(() => {
      this.load();
    }, 1000);
  }
};
</script>
<style scoped>
.imageposition {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>
