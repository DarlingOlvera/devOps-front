<script setup>
import axios from 'axios'
import { useDisplay } from 'vuetify'
import {ref} from 'vue'

const {xs} =useDisplay()
const telefonos = ref([])
const crear = ref(false)
const update = ref(false)
const confirmar = ref(false)

const modelo = ref('')
const marca = ref('')
const procesador = ref('')
const ram_gb = ref(null)
const almacenamiento_gb = ref(null)
const Id = ref(null)
const show = ref(false)


const openCreate =() =>{
  reset()
  show.value = true
  crear.value = true
}


const getTelefonos = async()=>{
  try {
    await axios.get('telefonos').then(resp =>{
      telefonos.value = resp.data
    })
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

const createTelefono = async()=>{
  let params = {modelo:modelo.value,marca:marca.value,procesador:procesador.value,ram_gb:ram_gb.value,almacenamiento_gb:almacenamiento_gb.value}
  try {
    await axios.post('telefonos',params).then(resp =>{
      console.log('Telefono creado');
      reset()
      getTelefonos()

      show.value = false
      crear.value =false
    })
  } catch (error) {
    console.log('Error: ' + error.message);
  }

}


const updateTelefono = async(id)=>{
  let params = {modelo:modelo.value,marca:marca.value,procesador:procesador.value,ram_gb:ram_gb.value,almacenamiento_gb:almacenamiento_gb.value}
  try {
    await axios.put(`telefonos/${id}`, params).then(resp =>{
      console.log('Telefono actualizado');
      reset()
      getTelefonos()
      show.value = false
      update.value =false
    })
  } catch (error) {
    console.log(`Error:${error.message}`);
  }

}



const getTelefono = async(id) =>{

try {
  await axios.get(`telefonos/${id}`).then(resp=>{
    Id.value = id
    modelo.value = resp.data.modelo
    marca.value  = resp.data.marca
    procesador.value = resp.data.procesador
    ram_gb.value = resp.data.ram_gb
    almacenamiento_gb.value = resp.data.almacenamiento_gb
    crear.value = false
    update.value = true
  })
} catch (error) {
  console.log(`Error: ${error.message}`);
}
}


const deleteTelefono = async(id)=>{

  try {
    await axios.delete(`telefonos/${id}`).then(resp =>{
      console.log('Telefono eliminado');
      reset()
      getTelefonos()
      confirmar.value=false
      update.value =false
    })
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

getTelefonos()

const reset = () =>{
  modelo.value = ''
  marca.value  = ''
  procesador.value = ''
  ram_gb.value = null
  almacenamiento_gb.value = null
}

</script>

<template>
  <v-container fluid class="pa-10">
    <v-row class="d-flex justify-center">
      <h3 class="text-h4 text-title my-10 text-center">Información de telefonos</h3>
    </v-row>
    <!--info moviles-->
    <template v-if="xs">
      <v-row class="d-flex justify-center">
        <v-expansion-panels variant="accordion">
          <v-expansion-panel
          v-for="telefono in telefonos"
          :value="telefono.value"
          :key="telefono.value"
          elevation="0">
            <v-expansion-panel-title>
              <h6 class="text-overline text-primary">{{ telefono.modelo }}</h6>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <span class="text-caption"> <strong>Id:</strong> {{ telefono.id }}</span>
              <br>
              <span class="text-caption"> <strong>Marca:</strong>{{ telefono.marca }}</span>
              <br>
              <span class="text-caption"> <strong>Procesador:</strong> {{ telefono.procesador }}</span>
              <br>
              <span class="text-caption"> <strong>Ram:</strong> {{ telefono.ram_gb }} gb</span>
              <br>
              <span class="text-caption"> <strong>Almacenamiento:</strong> {{ telefono.almacenamiento_gb }} gb</span>
              <br>
              <div style="width:100%" class="d-flex justify-end mt-5">
                <v-icon icon="fa fa-solid fa-pen" color="secondary" size="small" class="mx-2" @click="getTelefono(telefono.id);show = true; update=true"></v-icon>
                <v-icon icon="fa fa-solid fa-trash-can" color="red" size="small" class="mx-2" @click="getTelefono(telefono.id); confirmar =true"></v-icon>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </template>
    <template v-else>
      <v-table
      height="450"
      fixed-header
      >
        <thead class="bg-body">
          <th class="text-center text-overline text-white">Id</th>
          <th class="text-center text-overline text-white">Modelo</th>
          <th class="text-center text-overline text-white">Marca</th>
          <th class="text-center text-overline text-white">Procesador</th>
          <th class="text-center text-overline text-white">Ram</th>
          <th class="text-center text-overline text-white">Almacenamiento</th>
          <th class="text-center text-overline text-white">Acciones</th>
        </thead>
        <tbody>
          <tr
          v-for="telefono in telefonos"
          :value="telefono.value"
          :key="telefono.value">
            <td class="text-center text-body-2">{{ telefono.id }}</td>
            <td class="text-center text-body-2">{{ telefono.modelo }}</td>
            <td class="text-center text-body-2">{{ telefono.marca }}</td>
            <td class="text-center text-body-2">{{ telefono.procesador }}</td>
            <td class="text-center text-body-2">{{ telefono.ram_gb }} gb</td>
            <td class="text-center text-body-2">{{ telefono.almacenamiento_gb }} gb</td>
            <td class="d-flex justify-center align-center">
              <v-icon icon="fa fa-solid fa-pen" color="secondary" size="x-small" class="mx-2" @click="getTelefono(telefono.id);show = true"></v-icon>
              <v-icon icon="fa fa-solid fa-trash-can" color="red" size="x-small" class="mx-2" @click="getTelefono(telefono.id); confirmar =true"></v-icon>
            </td>
          </tr>
        </tbody>
      </v-table>
    </template>
    <VLayoutItem model-value position="bottom" class="text-end" size="88">
      <div class="ma-4">
        <VBtn icon="fa fa-solid fa-plus" size="large" color="primary" elevation="8" @click="openCreate"/>
      </div>
    </VLayoutItem>
  </v-container>
  <v-dialog v-model="show">
    <v-card width="100%" max-width="500" class="mx-auto pa-5" height="auto">
      <v-row class="d-flex justify-center">
        <h6 class="text-h6 text-title">Llene los almacenamiento_gb</h6>
      </v-row>
      <v-row class="d-flex justify-center">
        <div class="pa-0" style="width: 80%;">
          <span class="text-caption text-title">Modelo</span>
          <v-text-field variant="outlined" v-model="modelo" color="secondary" density="comfortable"></v-text-field>
        </div>
      </v-row>
      <v-row class="d-flex justify-center">
        <div class="pa-0" style="width: 80%;">
          <span class="text-caption text-title">Marca</span>
          <v-text-field variant="outlined" v-model="marca" color="secondary" density="comfortable"></v-text-field>
        </div>
      </v-row>
      <v-row class="d-flex justify-center">
        <div class="pa-0" style="width: 80%;">
          <span class="text-caption text-title">Procesador</span>
          <v-text-field variant="outlined" v-model="procesador" color="secondary" density="comfortable"></v-text-field>
        </div>
      </v-row>
      <v-row class="d-flex justify-center">
        <div class="pa-0" style="width: 80%;">
          <span class="text-caption text-title">Ram GB</span>
          <v-text-field variant="outlined" v-model="ram_gb" color="secondary" density="comfortable"></v-text-field>
        </div>
      </v-row>
      <v-row class="d-flex justify-center">
        <div class="pa-0" style="width: 80%;">
          <span class="text-caption text-title">Almacenamiento GB</span>
          <v-text-field variant="outlined" v-model="almacenamiento_gb" color="secondary" density="comfortable"></v-text-field>
        </div>
      </v-row>
      <v-row class="d-flex justify-center mb-5">
        <v-btn v-if="crear" color="primary" class="rounded-xl" style="width: 100%; max-width: 200px;" @click="createTelefono">Crear</v-btn>
        <v-btn v-else-if="update" color="primary" class="rounded-xl" style="width: 100%; max-width: 200px;" @click="updateTelefono(Id)">Actualizar</v-btn>
      </v-row>
    </v-card>

  </v-dialog>
  <v-dialog v-model="confirmar">
    <v-card width="100%" max-width="500" class="mx-auto pa-5" height="auto">
      <v-row class="d-flex justify-center">
        <h6 class="text-h6 text-title">¿Está seguro?</h6>
      </v-row>
      <v-row class="d-flex justify-center mb-5">
        <v-btn color="red" class="mx-2" @click="deleteTelefono(Id)">Sí</v-btn>
        <v-btn color="primary" class="mx-2" @click="confirmar = false">No</v-btn>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.v-expansion-panel >>> .v-expansion-panel-title__icon {
  color: #A5D7E8;
}
</style>
