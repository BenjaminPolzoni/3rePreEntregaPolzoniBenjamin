
const hayUser = localStorage.getItem('UserLog')

if(hayUser){
    console.log(hayUser.nombre)
}else{
    window.location.href = './page/loginUser.html'
}