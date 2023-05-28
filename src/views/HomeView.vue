<script setup>
import { useRouter } from 'vue-router';
import {onMounted, ref} from 'vue'

const router = useRouter()
const logged = ref(false)

const goToLogin =() =>{
  router.push({name:'login'})

}

const goTuSignup = ()=>{
  router.push({name:'signup'})
}

onMounted(() => {
  logged.value =localStorage.getItem('logged')
})



const logout = () =>{

  localStorage.removeItem('tokenAuth')
  localStorage.setItem('logged',false)
  logged.value = localStorage.getItem('logged')

}
</script>

<template>
  <v-container class="d-flex justify-center align-center px-10" style="height: 100vh;">
    <div v-if="logged === 'false'">
      <h1 class="text-center text-title">Bienvenido a Uadyfon Api</h1>
      <br>
      <v-row class="text-center text-secondary">
        Inicia sesión para continuar o si eres nuevo, crea una cuenta.
      </v-row>
      <br>
      <v-row>
          <v-col cols="12" sm="6" md="6" class="d-flex justify-center">
            <v-btn color="primary" class="rounded-xl" @click="goToLogin">Iniciar Sesión</v-btn>
          </v-col>
          <v-col cols="12" sm="6" md="6" class="d-flex justify-center">
            <v-btn color="primary" class="rounded-xl" @click="goTuSignup">Registrarse</v-btn>
          </v-col>
      </v-row>
    </div>

    <div v-else>
      <h2 class="text-center text-h4 text-title">Su sesión está iniciada</h2>
      <v-row class="d-flex justify-center my-10">
        <span class="text-secondary text-subtitle-1">Ahora puede acceder a la ruta que desee</span>
      </v-row>
      <v-row class="d-flex justify-center">
        <v-btn color="primary" class="rounded-xl" @click="logout">Cerrar Sesión</v-btn>
      </v-row>
    </div>
  </v-container>
</template>

<style scoped>
h1{
  font-weight: 400;
}
</style>

