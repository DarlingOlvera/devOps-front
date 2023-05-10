<script setup>
import axios from 'axios'

const getUsuarios = async()=>{

  try {
    const resp = await axios.get('usuarios')

    console.log(resp.data);

  } catch (error) {
    console.log(error);

  }
}

getUsuarios()

</script>

<template>
  <v-container>
    <h1>Login/signup</h1>
  </v-container>
</template>

<style scoped>

</style>
