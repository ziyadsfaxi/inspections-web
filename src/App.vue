<template>
  <div id="app">
    <Navbar></Navbar>
    <div class="container">
      <InspectionSlotsList></InspectionSlotsList>
    </div>
    <v-dialog />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import InspectionSlotsList from "./components/InspectionSlotsList.vue";

export default {
  name: "App",
  components: {
    Navbar,
    InspectionSlotsList,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
