<script setup>
import axios from 'axios'
import { useDisplay } from 'vuetify'
import {ref} from 'vue'

const {xs} =useDisplay()
const planes = ref([])
const crear = ref(false)
const update = ref(false)
const confirmar = ref(false)

const nombre = ref('')
const costo = ref(null)
const duracion = ref('')
const redes_gratuitas = ref('')
const datos = ref(null)
const Id = ref(null)
const show = ref(false)


const openCreate =() =>{
  reset()
  show.value = true
  crear.value = true
}


const getPlanes = async()=>{
  try {
    await axios.get('planes').then(resp =>{
      planes.value = resp.data
    })
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

const createPlan = async()=>{
  let params = {nombre:nombre.value,costo:costo.value,duracion:duracion.value,redes_gratuitas:redes_gratuitas.value,datos:datos.value}
  try {
    await axios.post('planes',params).then(resp =>{
      console.log('Plan creado');
      reset()
      getPlanes()

      show.value = false
      crear.value =false
    })
  } catch (error) {
    console.log('Error: ' + error.message);
  }

}


const updatePlan = async(id)=>{
  let params = {nombre:nombre.value,costo:costo.value,duracion:duracion.value,redes_gratuitas:redes_gratuitas.value,datos:datos.value}
  try {
    await axios.put(`planes/${id}`, params).then(resp =>{
      console.log('Plan actualizado');
      reset()
      getPlanes()
      show.value = false
      update.value =false
    })
  } catch (error) {
    console.log(`Error:${error.message}`);
  }

}



const getPlan = async(id) =>{

try {
  await axios.get(`planes/${id}`).then(resp=>{
    Id.value = id
    nombre.value = resp.data.nombre
    costo.value  = resp.data.costo
    duracion.value = resp.data.duracion
    redes_gratuitas.value = resp.data.redes_gratuitas
    datos.value = resp.data.datos
    crear.value = false
    update.value = true
  })
} catch (error) {
  console.log(`Error: ${error.message}`);
}
}


const deletePlan = async(id)=>{

  try {
    await axios.delete(`planes/${id}`).then(resp =>{
      console.log('Plan eliminado');
      reset()
      getPlanes()
      confirmar.value=false
      update.value =false
    })
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

getPlanes()

const reset = () =>{
  nombre.value = ''
  costo.value  = ''
  duracion.value = ''
  redes_gratuitas.value = null
  datos.value = null
}

</script>

<template>
  <v-container fluid class="pa-10">
    <v-row class="d-flex justify-center">
      <h3 class="text-h4 text-title my-10 text-center">Información de planes</h3>
    </v-row>
    <!--info moviles-->
    <template v-if="xs">
      <v-row class="d-flex justify-center">
        <v-expansion-panels variant="accordion">
          <v-expansion-panel
          v-for="plan in planes"
          :value="plan.value"
          :key="plan.value"
          elevation="0">
            <v-expansion-panel-title>
              <h6 class="text-overline text-primary">{{ plan.nombre }}</h6>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <span class="text-caption"> <strong>Id:</strong> {{ plan.id }}</span>
              <br>
              <span class="text-caption"> <strong>Costo:</strong>${{ plan.costo }}</span>
              <br>
              <span class="text-caption"> <strong>Duración:</strong> {{ plan.duracion }}</span>
              <br>
              <span class="text-caption"> <strong>Redes Gratuitas:</strong> {{ plan.redes_gratuitas }}</span>
              <br>
              <span class="text-caption"> <strong>Datos:</strong> {{ plan.datos }} gb</span>
              <br>
              <div style="width:100%" class="d-flex justify-end mt-5">
                <v-icon icon="fa fa-solid fa-pen" color="secondary" size="small" class="mx-2" @click="getPlan(plan.id);show = true; update=true"></v-icon>
                <v-icon icon="fa fa-solid fa-trash-can" color="red" size="small" class="mx-2" @click="getPlan(plan.id); confirmar =true"></v-icon>
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
          <th class="text-center text-overline text-white">Costo</th>
          <th class="text-center text-overline text-white">Duración</th>
          <th class="text-center text-overline text-white">Redes Gratuitas</th>
          <th class="text-center text-overline text-white">Datos</th>
          <th class="text-center text-overline text-white">Acciones</th>
        </thead>
        <tbody>
          <tr
          v-for="plan in planes"
          :value="plan.value"
          :key="plan.value">
            <td class="text-center text-body-2">{{ plan.id }}</td>
            <td class="text-center text-body-2">{{ plan.nombre }}</td>
            <td class="text-center text-body-2">${{ plan.costo }}</td>
            <td class="text-center text-body-2">{{ plan.duracion }}</td>
            <td class="text-center text-body-2">{{ plan.redes_gratuitas }}</td>
            <td class="text-center text-body-2">{{ plan.datos }} gb</td>
            <td class="d-flex justify-center align-center">
              <v-icon icon="fa fa-solid fa-pen" color="secondary" size="x-small" class="mx-2" @click="getPlan(plan.id);show = true"></v-icon>
              <v-icon icon="fa fa-solid fa-trash-can" color="red" size="x-small" class="mx-2" @click="getPlan(plan.id); confirmar =true"></v-icon>
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
          <span class="text-caption text-title">Costo</span>
          <v-text-field variant="outlined" v-model="costo" color="secondary" density="comfortable"></v-text-field>
        </div>
      </v-row>
      <v-row class="d-flex justify-center">
        <div class="pa-0" style="width: 80%;">
          <span class="text-caption text-title">Duración</span>
          <v-text-field variant="outlined" v-model="duracion" color="secondary" density="comfortable"></v-text-field>
        </div>
      </v-row>
      <v-row class="d-flex justify-center">
        <div class="pa-0" style="width: 80%;">
          <span class="text-caption text-title">Redes Gratuitas</span>
          <v-text-field variant="outlined" v-model="redes_gratuitas" color="secondary" density="comfortable"></v-text-field>
        </div>
      </v-row>
      <v-row class="d-flex justify-center">
        <div class="pa-0" style="width: 80%;">
          <span class="text-caption text-title">Datos</span>
          <v-text-field variant="outlined" v-model="datos" color="secondary" density="comfortable"></v-text-field>
        </div>
      </v-row>
      <v-row class="d-flex justify-center mb-5">
        <v-btn v-if="crear" color="primary" class="rounded-xl" style="width: 100%; max-width: 200px;" @click="createPlan">Crear</v-btn>
        <v-btn v-else-if="update" color="primary" class="rounded-xl" style="width: 100%; max-width: 200px;" @click="updatePlan(Id)">Actualizar</v-btn>
      </v-row>
    </v-card>

  </v-dialog>
  <v-dialog v-model="confirmar">
    <v-card width="100%" max-width="500" class="mx-auto pa-5" height="auto">
      <v-row class="d-flex justify-center">
        <h6 class="text-h6 text-title">¿Está seguro?</h6>
      </v-row>
      <v-row class="d-flex justify-center mb-5">
        <v-btn color="red" class="mx-2" @click="deletePlan(Id)">Sí</v-btn>
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
