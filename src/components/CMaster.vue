<template>
  <v-card height="100%" flat>
    <v-bottom-nav fixed :active.sync="bottomNav" :value="true" absolute color="transparent">
      <v-btn to="/" color="teal" flat>
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn to="/control" color="teal" flat>
        <span>Control</span>
        <v-icon>settings</v-icon>
      </v-btn>
      <v-btn to="/about" color="teal" flat>
        <span>About</span>
        <v-icon>info</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      bottomNav: "Home"
    };
  }
};
</script>
