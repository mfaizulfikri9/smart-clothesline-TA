<template>
  <v-app class="white">
    <v-content>
      <router-view></router-view>
    </v-content>
    <c-master/>
  </v-app>
</template>
<script>
import CMaster from "@/components/CMaster.vue";
export default {
  name: "App",
  components: {
    CMaster
  }
};
</script>