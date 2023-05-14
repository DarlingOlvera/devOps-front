<script setup>
import axios from 'axios'
import { Field, Form } from 'vee-validate';
import {ref} from 'vue'
import { useDisplay } from 'vuetify';
import { useRouter } from 'vue-router';

const username = ref('')
const email = ref('')
const password = ref('')
const telefono = ref('')
const edad = ref(null)
const {xs} = useDisplay()
const router = useRouter()
const schema ={
  username:'required',
  email:'email|required',
  password:'required',
  edad:'required'
}

const onSubmit = async() =>{
  let params = {username:username.value, email:email.value, password:password.value,telefono:telefono.value,edad:edad.value*1}

  try {
    await axios.post('/usuarios/signup',params).then(resp=>{
      console.log('Cuenta creada');
      username.value = ''
      email.value = ''
      password.value = ''
      telefono.value = ''
      edad.value = ''
      router.push({name:'login'})
    })
  } catch (error) {
    console.log('Ocurrio un error al crear la cuenta',error);
  }
}

</script>

<template>
  <v-container fluid class="pa-5 ma-0">
      <v-row class="d-flex justify-center my-10">
        <h1 class="text-h2 text-title">Crear cuenta</h1>
      </v-row>
      <v-row class="d-flex justify-center">
        <v-card
        class="pa-10 rounded-xl"
        :class="xs ? 'elevation-0' : 'elevation-5'"
        width="100%"
        max-width="500"
        height="auto">
          <Form
          name="signupForm"
          ref="obs"
          :validation-schema="schema"
          @submit ="onSubmit">
          <v-row class="d-flex justify-center">
            <div class="pa-0" style="width: 100%;">
              <h3 class="text-caption text-secondary">Nombre de usuario</h3>
              <Field
              as="div"
              name="username"
              v-slot="{errorMessage,field}">
                <v-text-field
                variant="outlined"
                color="secondary"
                placeholder="Username"
                density="compact"
                v-model="username"
                v-bind="field"
                :error-messages="errorMessage"></v-text-field>
              </Field>
            </div>
          </v-row>
          <v-row class="d-flex justify-center">
            <div class="pa-0" style="width: 100%;">
              <h3 class="text-caption text-secondary">Correo</h3>
              <Field
              as="div"
              name="email"
              v-slot="{errorMessage,field}">
                <v-text-field
                variant="outlined"
                color="secondary"
                placeholder="Email"
                density="compact"
                v-model="email"
                v-bind="field"
                :error-messages="errorMessage"></v-text-field>
              </Field>
            </div>
          </v-row>
          <v-row class="d-flex justify-center">
            <div class="pa-0" style="width: 100%;">
              <h3 class="text-caption text-secondary">Contraseña</h3>
              <Field
              as="div"
              name="password"
              v-slot="{errorMessage,field}">
                <v-text-field
                variant="outlined"
                color="secondary"
                placeholder="Password"
                density="compact"
                v-model="password"
                v-bind="field"
                :error-messages="errorMessage"></v-text-field>
              </Field>
            </div>
          </v-row>
          <v-row class="d-flex align-center justify-space-between">
            <v-col cols="12" sm="5" md="5" class="d-flex justify-center pa-0">
              <div class="pa-0" style="width: 100%;">
              <h3 class="text-caption text-secondary">Telefono</h3>
              <Field
              as="div"
              name="telefono"
              v-slot="{errorMessage,field}">
                <v-text-field
                variant="outlined"
                color="secondary"
                placeholder="Phone number"
                density="compact"
                v-model="telefono"
                v-bind="field"
                :error-messages="errorMessage"></v-text-field>
              </Field>
            </div>
            </v-col>
            <v-col cols="12" sm="5" md="5" class="d-flex justify-center pa-0">
              <div class="pa-0" style="width: 100%;">
              <h3 class="text-caption text-secondary">Edad</h3>
              <Field
              as="div"
              name="edad"
              v-slot="{errorMessage,field}">
                <v-text-field
                variant="outlined"
                color="secondary"
                placeholder="Age"
                density="compact"
                v-model="edad"
                v-bind="field"
                :error-messages="errorMessage"></v-text-field>
              </Field>
            </div>
            </v-col>
          </v-row>
          <v-row class="d-flex justify-center my-10">
            <v-btn
            color="primary"
            class="rounded-xl boton"
            type="submit">Crear cuenta</v-btn>
          </v-row>
          </Form>
        </v-card>
      </v-row>
  </v-container>
</template>

<style scoped>
.boton{
  width: 80%;
  height: 40px;
}
</style>
