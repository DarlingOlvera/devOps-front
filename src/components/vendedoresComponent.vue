<script setup>
import axios from 'axios'
import { useDisplay } from 'vuetify'
import {ref} from 'vue'

const {xs} =useDisplay()
const vendedores = ref([])
const crear = ref(false)
const update = ref(false)
const confirmar = ref(false)

const nombre = ref('')
const email = ref('')
const ventas = ref(0)
const entrada = ref('')
const salida = ref('')
const Id = ref(null)
const show = ref(false)


const openCreate =() =>{
  reset()
  show.value = true
  crear.value = true
}


const getVendedores = async()=>{
  try {
    await axios.get('vendedores').then(resp =>{
      vendedores.value = resp.data
      console.log(vendedores.value);
    })
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

const createVendedores = async()=>{
  let params = {nombre:nombre.value,email:email.value,num_ventas:ventas.value, hora_entrada:entrada.value,hora_salida:salida.value}
  try {
    await axios.post('vendedores',params).then(resp =>{
      console.log('vendedor creado');
      reset()
      getVendedores()

      show.value = false
      crear.value =false
    })
  } catch (error) {
    console.log('Error: ' + error.message);
  }

}


const updateVendedor = async(id)=>{
  let params = {nombre:nombre.value,email:email.value,num_ventas:ventas.value, hora_entrada:entrada.value,hora_salida:salida.value}
  try {
    await axios.put(`vendedores/${id}`, params).then(resp =>{
      console.log('vendedor actualizado');
      reset()
      getVendedores()
      show.value = false
      update.value =false
    })
  } catch (error) {
    console.log(`Error:${error.message}`);
  }

}



const getVendedor = async(id) =>{

try {
  await axios.get(`vendedores/${id}`).then(resp=>{
    Id.value = id
    nombre.value = resp.data.nombre
    email.value = resp.data.email
    ventas.value = resp.data.num_ventas
    entrada.value = resp.data.hora_entrada
    salida.value = resp.data.hora_salida
    crear.value = false
    update.value = true
  })
} catch (error) {
  console.log(`Error: ${error.message}`);
}
}


const deleteVendedor = async(id)=>{

  try {
    await axios.delete(`vendedores/${id}`).then(resp =>{
      console.log('Vendedor eliminado');
      reset()
      getVendedores()
      confirmar.value=false
      update.value =false
    })
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

getVendedores()

const reset = () =>{
  nombre.value = ''
  email.value = ''
  ventas.value = 0
  entrada.value = ''
  salida.value = ''
}

</script>

<template>
  <v-container fluid class="pa-10">
    <v-row class="d-flex justify-center">
      <h3 class="text-h4 text-title my-10 text-center">Información de vendedores</h3>
    </v-row>
    <!--info moviles-->
    <template v-if="xs">
      <v-row class="d-flex justify-center">
        <v-expansion-panels variant="accordion">
          <v-expansion-panel
          v-for="vendedor in vendedores"
          :value="vendedor.value"
          :key="vendedor.value"
          elevation="0">
            <v-expansion-panel-title>
              <h6 class="text-overline text-primary">{{ vendedor.nombre }}</h6>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <span class="text-caption"> <strong>Id:</strong> {{ vendedor.id }}</span>
              <br>
              <span class="text-caption"> <strong>Email:</strong> {{ vendedor.email }}</span>
              <br>
              <span class="text-caption"> <strong>No. ventas:</strong> {{ vendedor.num_ventas }}</span>
              <br>
              <span class="text-caption"> <strong>Entrada:</strong> {{ vendedor.hora_entrada }}</span>
              <br>
              <span class="text-caption"> <strong>Salida:</strong> {{ vendedor.hora_salida }}</span>
              <br>
              <div style="width:100%" class="d-flex justify-end mt-5">
                <v-icon icon="fa fa-solid fa-pen" color="secondary" size="small" class="mx-2" @click="getVendedor(vendedor.id);show = true; update=true"></v-icon>
                <v-icon icon="fa fa-solid fa-trash-can" color="red" size="small" class="mx-2" @click="getVendedor(vendedor.id); confirmar =true"></v-icon>
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
          <th class="text-center text-overline text-white">Email</th>
          <th class="text-center text-overline text-white">No. Ventas</th>
          <th class="text-center text-overline text-white">Entrada</th>
          <th class="text-center text-overline text-white">Salida</th>
          <th class="text-center text-overline text-white">Acciones</th>
        </thead>
        <tbody>
          <tr
          v-for="vendedor in vendedores"
          :value="vendedor.value"
          :key="vendedor.value">
            <td class="text-center text-body-2">{{ vendedor.id }}</td>
            <td class="text-center text-body-2">{{ vendedor.nombre }}</td>
            <td class="text-center text-body-2">{{ vendedor.email }}</td>
            <td class="text-center text-body-2">{{ vendedor.num_ventas }}</td>
            <td class="text-center text-body-2">{{ vendedor.hora_entrada }}</td>
            <td class="text-center text-body-2">{{ vendedor.hora_salida }}</td>
            <td class="d-flex justify-center align-center">
              <v-icon icon="fa fa-solid fa-pen" color="secondary" size="x-small" class="mx-2" @click="getVendedor(vendedor.id);show = true"></v-icon>
              <v-icon icon="fa fa-solid fa-trash-can" color="red" size="x-small" class="mx-2" @click="getVendedor(vendedor.id); confirmar =true"></v-icon>
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
          <span class="text-caption text-title">Email</span>
          <v-text-field variant="outlined" v-model="email" color="secondary" density="comfortable"></v-text-field>
        </div>
      </v-row>
      <v-row class="d-flex justify-center">
        <div class="pa-0" style="width: 80%;">
          <span class="text-caption text-title">No. Ventas</span>
          <v-text-field variant="outlined" v-model="ventas" color="secondary" density="comfortable"></v-text-field>
        </div>
      </v-row>
      <v-row class="d-flex justify-center">
        <div class="pa-0" style="width: 80%;">
          <span class="text-caption text-title">Hora de entrada</span>
          <v-text-field variant="outlined" v-model="entrada" color="secondary" density="comfortable"></v-text-field>
        </div>
      </v-row>
      <v-row class="d-flex justify-center">
        <div class="pa-0" style="width: 80%;">
          <span class="text-caption text-title">Hora de salida</span>
          <v-text-field variant="outlined" v-model="salida" color="secondary" density="comfortable"></v-text-field>
        </div>
      </v-row>
      <v-row class="d-flex justify-center mb-5">
        <v-btn v-if="crear" color="primary" class="rounded-xl" style="width: 100%; max-width: 200px;" @click="createVendedores">Crear</v-btn>
        <v-btn v-else-if="update" color="primary" class="rounded-xl" style="width: 100%; max-width: 200px;" @click="updateVendedor(Id)">Actualizar</v-btn>
      </v-row>
    </v-card>

  </v-dialog>
  <v-dialog v-model="confirmar">
    <v-card width="100%" max-width="500" class="mx-auto pa-5" height="auto">
      <v-row class="d-flex justify-center">
        <h6 class="text-h6 text-title">¿Está seguro?</h6>
      </v-row>
      <v-row class="d-flex justify-center mb-5">
        <v-btn color="red" class="mx-2" @click="deleteVendedor(Id)">Sí</v-btn>
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
