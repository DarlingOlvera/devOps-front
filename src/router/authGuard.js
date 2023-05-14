
const authGuard = async(to, from, next) =>{

  const authenticated = localStorage.getItem("logged")

  if (authenticated === 'true') next()
  else next({name:'home'})



}

export default authGuard
