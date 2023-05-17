<script setup>
import axios from 'axios'
import { useDisplay } from 'vuetify'
import {ref} from 'vue'

const {xs} =useDisplay()
const clientes = ref([])
const crear = ref(false)
const update = ref(false)
const confirmar = ref(false)

const nombre = ref('')
const edad = ref(null)
const telefono = ref('')
const tipo_compra = ref('')
const fecha_compra = ref(null)
const Id = ref(null)
const show = ref(false)


const openCreate =() =>{
  reset()
  show.value = true
  crear.value = true
}


const getClientes = async()=>{
  try {
    await axios.get('clientes').then(resp =>{
      clientes.value = resp.data
    })
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

const createCliente = async()=>{
  let params = {nombre:nombre.value,edad:edad.value,telefono:telefono.value,tipo_compra:tipo_compra.value,fecha_compra:fecha_compra.value}
  try {
    await axios.post('clientes',params).then(resp =>{
      console.log('cliente creado');
      reset()
      getClientes()

      show.value = false
      crear.value =false
    })
  } catch (error) {
    console.log('Error: ' + error.message);
  }

}


const updateCliente = async(id)=>{
  let params = {nombre:nombre.value,edad:edad.value,telefono:telefono.value,tipo_compra:tipo_compra.value,fecha_compra:fecha_compra.value}
  try {
    await axios.put(`clientes/${id}`, params).then(resp =>{
      console.log('cliente actualizado');
      reset()
      getClientes()
      show.value = false
      update.value =false
    })
  } catch (error) {
    console.log(`Error:${error.message}`);
  }

}



const getCliente = async(id) =>{

try {
  await axios.get(`clientes/${id}`).then(resp=>{
    Id.value = id
    nombre.value = resp.data.nombre
    edad.value = resp.data.edad
    telefono.value = resp.data.telefono
    tipo_compra.value = resp.data.tipo_compra
    fecha_compra.value = resp.data.fecha_compra
    crear.value = false
    update.value = true
  })
} catch (error) {
  console.log(`Error: ${error.message}`);
}
}


const deleteCliente = async(id)=>{

  try {
    await axios.delete(`clientes/${id}`).then(resp =>{
      console.log('Cliente eliminado');
      reset()
      getClientes()
      confirmar.value=false
      update.value =false
    })
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

getClientes()

const reset = () =>{
  nombre.value = ''
  edad.value = ''
  telefono.value = ''
  tipo_compra.value = ''
  fecha_compra.value = ''
}

</script>

<template>
  <v-container fluid class="pa-10">
    <v-row class="d-flex justify-center">
      <h3 class="text-h4 text-title my-10 text-center">Información de clientes</h3>
    </v-row>
    <!--info moviles-->
    <template v-if="xs">
      <v-row class="d-flex justify-center">
        <v-expansion-panels variant="accordion">
          <v-expansion-panel
          v-for="cliente in clientes"
          :value="cliente.value"
          :key="cliente.value"
          elevation="0">
            <v-expansion-panel-title>
              <h6 class="text-overline text-primary">{{ cliente.nombre }}</h6>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <span class="text-caption"> <strong>Id:</strong> {{ cliente.id }}</span>
              <br>
              <span class="text-caption"> <strong>Edad:</strong> {{ cliente.edad }}</span>
              <br>
              <span class="text-caption"> <strong>Telefono:</strong> {{ cliente.telefono }}</span>
              <br>
              <span class="text-caption"> <strong>Tipo de compra:</strong> {{ cliente.tipo_compra }}</span>
              <br>
              <span class="text-caption"> <strong>Fecha de compra:</strong> {{ cliente.fecha_compra }}</span>
              <br>
              <div style="width:100%" class="d-flex justify-end mt-5">
                <v-icon icon="fa fa-solid fa-pen" color="secondary" size="small" class="mx-2" @click="getCliente(cliente.id);show = true; update=true"></v-icon>
                <v-icon icon="fa fa-solid fa-trash-can" color="red" size="small" class="mx-2" @click="getCliente(cliente.id); confirmar =true"></v-icon>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </template>
    <template v-else>
      <v-table fixed-header height="500">
        <thead class="bg-body">
          <th class="text-center text-overline text-white">Id</th>
          <th class="text-center text-overline text-white">Nombre</th>
          <th class="text-center text-overline text-white">Edad</th>
          <th class="text-center text-overline text-white">Telefono</th>
          <th class="text-center text-overline text-white">Tipo de compra</th>
          <th class="text-center text-overline text-white">Fecha de compra</th>
          <th class="text-center text-overline text-white">Acciones</th>
        </thead>
        <tbody>
          <tr
          v-for="cliente in clientes"
          :value="cliente.value"
          :key="cliente.value">
            <td class="text-center text-body-2">{{ cliente.id }}</td>
            <td class="text-center text-body-2">{{ cliente.nombre }}</td>
            <td class="text-center text-body-2">{{ cliente.edad }}</td>
            <td class="text-center text-body-2">{{ cliente.telefono }}</td>
            <td class="text-center text-body-2">{{ cliente.tipo_compra }}</td>
            <td class="text-center text-body-2">{{ cliente.fecha_compra }}</td>
            <td class="d-flex justify-center align-center">
              <v-icon icon="fa fa-solid fa-pen" color="secondary" size="x-small" class="mx-2" @click="getCliente(cliente.id);show = true"></v-icon>
              <v-icon icon="fa fa-solid fa-trash-can" color="red" size="x-small" class="mx-2" @click="getCliente(cliente.id); confirmar =true"></v-icon>
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
        <h6 class="text-h6 text-title">Llene los datos</h6>
      </v-row>
      <v-row class="d-flex justify-center">
        <div class="pa-0" style="width: 80%;">
          <span class="text-caption text-title">Nombre</span>
          <v-text-field variant="outlined" v-model="nombre" color="secondary" density="comfortable"></v-text-field>
        </div>
      </v-row>
      <v-row class="d-flex justify-center">
        <div class="pa-0" style="width: 80%;">
          <span class="text-caption text-title">Edad</span>
          <v-text-field variant="outlined" v-model="edad" color="secondary" density="comfortable"></v-text-field>
        </div>
      </v-row>
      <v-row class="d-flex justify-center">
        <div class="pa-0" style="width: 80%;">
          <span class="text-caption text-title">telefono</span>
          <v-text-field variant="outlined" v-model="telefono" color="secondary" density="comfortable"></v-text-field>
        </div>
      </v-row>
      <v-row class="d-flex justify-center">
        <div class="pa-0" style="width: 80%;">
          <span class="text-caption text-title">Tipo de compra</span>
          <v-text-field variant="outlined" v-model="tipo_compra" color="secondary" density="comfortable"></v-text-field>
        </div>
      </v-row>
      <v-row class="d-flex justify-center">
        <div class="pa-0" style="width: 80%;">
          <span class="text-caption text-title">Fecha de compra</span>
          <v-text-field variant="outlined" v-model="fecha_compra" color="secondary" density="comfortable"></v-text-field>
        </div>
      </v-row>
      <v-row class="d-flex justify-center mb-5">
        <v-btn v-if="crear" color="primary" class="rounded-xl" style="width: 100%; max-width: 200px;" @click="createCliente">Crear</v-btn>
        <v-btn v-else-if="update" color="primary" class="rounded-xl" style="width: 100%; max-width: 200px;" @click="updateCliente(Id)">Actualizar</v-btn>
      </v-row>
    </v-card>

  </v-dialog>
  <v-dialog v-model="confirmar">
    <v-card width="100%" max-width="500" class="mx-auto pa-5" height="auto">
      <v-row class="d-flex justify-center">
        <h6 class="text-h6 text-title">¿Está seguro?</h6>
      </v-row>
      <v-row class="d-flex justify-center mb-5">
        <v-btn color="red" class="mx-2" @click="deleteCliente(Id)">Sí</v-btn>
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
