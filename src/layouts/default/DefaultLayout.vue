<script setup>
import {useRoute} from 'vue-router'
import {useDisplay} from 'vuetify'
const route = useRoute()
const {smAndUp} = useDisplay()




</script>

<template>
  <v-app>
    <v-app-bar flat class="bg-primary px-5">
      <template v-if="smAndUp">
        <v-row class="d-flex  justify-space-between">
          <div class="pa-0 d-flex align-center">
            <v-icon icon="fa fa-solid fa-mobile-screen"></v-icon>
            <router-link :to="{name:'home'}" class="text-overline ml-5 link-to">Uadyfon API</router-link>
          </div>
          <div v-if="route.name !== 'signup' && route.name !== 'login'">
            <router-link class="link-to" :to="{name:'vendedores'}">Vendedores</router-link>
            <router-link class="link-to ml-5" :to="{name:'clientes'}">Clientes</router-link>
            <router-link class="link-to ml-5" :to="{name:'planes'}">Planes</router-link>
            <router-link class="link-to ml-5" :to="{name:'telefonos'}">Telefonos</router-link>
          </div>
          <div class="current-page">
            <span class="text-overline ml-4">{{ route.name }}</span>
          </div>
        </v-row>
      </template>
      <template v-else>
        <v-row class="d-flex justify-space-between">
          <div class="pa-0 d-flex align-center">
            <v-icon icon="fa fa-solid fa-mobile-screen"></v-icon>
            <router-link :to="{name:'home'}" class="text-overline ml-5 link-to">Uadyfon API</router-link>
          </div>
          <v-btn
          v-if="route.name != 'login' && route.name != 'signup'"
          icon="fas fa-light fa-bars"
          id="menu-activator"></v-btn>
          <v-menu activator="#menu-activator">
            <v-card height="auto" class="pa-5">
              <v-row class="d-flex justify-center">
                <router-link class="menu-to my-2" :to="{name:'vendedores'}">Vendedores</router-link>
              </v-row>
              <v-row class="d-flex justify-center">
                <router-link class="menu-to my-2" :to="{name:'clientes'}">Clientes</router-link>
              </v-row>
              <v-row class="d-flex justify-center">
                <router-link class="menu-to my-2" :to="{name:'planes'}">Planes</router-link>
              </v-row>
              <v-row class="d-flex justify-center">
                <router-link class="menu-to my-2" :to="{name:'telefonos'}">Telefonos</router-link>
              </v-row>
            </v-card>
          </v-menu>
        </v-row>
      </template>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style scoped>
  .current-page{
    border-left: solid 1px;
    border-left-color: white;

  }

  .link-to{
    text-decoration: none;
    color: white;

  }
  .menu-to{
    text-decoration: none;
    color: #7C9070;

  }
</style>
