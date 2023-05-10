import axios from 'axios'

//prueba local
const baseURL = 'http://localhost:9000/uadyfon/api/'

axios.defaults.baseURL = baseURL

axios.defaults.headers.common['Content-type'] = 'application/json'

let token = localStorage.getItem('tokenAuth')

if(token){
  axios.defaults.headers.common['Authorization'] = `Bearer${token}`
}
