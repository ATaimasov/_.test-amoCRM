<script setup>
import DropDownComponent from './components/DropDownComponent.vue'
import CreateButtonComponent from './components/UI/CreateButtonComponent.vue'
import ResultDisplayComponent from './components/ResultDisplayComponent.vue'




</script>

<template>
  <div class="main">
    <div class="wrapper">
      <DropDownComponent></DropDownComponent>
        <div class="button-container">
          <CreateButtonComponent></CreateButtonComponent>
        </div>
    </div>
    <div>
      <ResultDisplayComponent></ResultDisplayComponent>
    </div>
  </div>
</template>

<style scoped>

.main {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 10%
}

.button-container {
    display: flex;
    justify-content: center;
    align-items: flex-end;
}
</style>
