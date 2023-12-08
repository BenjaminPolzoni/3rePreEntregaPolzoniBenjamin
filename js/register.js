import { BBDD } from "./baseDeDatos.js";
// Creamos una clase llamada UsuarioAIngresar
class usuarioAIngresar {
    constructor(nombre, gmail, contraseña, edad, dirección) {
      this.nombre = nombre;
      this.gmail = gmail;
      this.contraseña = contraseña;
      this.edad = edad;
      this.dirección = dirección;
    }
}
  
//Funciones

// Creamos una función que nos pide los datos por entrada
function crearUsuario(nom, mail, contra, ed, altura, calle, cp) {
    
    // Usamos la función prompt para pedir los datos al usuario y los guardamos en variables
    let nombre = nom    
    let email = mail
    let contraseña = contra
    let edad = ed
  
    // Creamos un objeto vacío llamado dirección 
    let dirección = {};
    // Pedimos los datos de la dirección al usuario y los guardamos en el objeto dirección
    dirección.altura = altura || 'No se ha agregado'
    dirección.calle = calle || 'No se ha agregado'
    dirección.codigoPostal = cp || 'No se ha agregado'
  
    // Creamos un objeto de tipo Usuario con los datos que ingresó el usuario
    let usuario = new usuarioAIngresar(nombre, email, contraseña, edad, dirección);
  
    // Agregamos el objeto usuario a la BBDD
    BBDD.push(usuario);
}
function cambiarSiExiste(){
  //Cambio la sombra a rojo
  const contenedorForm = document.querySelector('.contenedorLogin') 
  contenedorForm.classList.add('contenedorLoginError')
  const tituloLog = document.querySelector(".login_titulo")
    tituloLog.innerText = 'Este Mail ya esta registrado, intente de nuevo'
    tituloLog.classList.add('login_titulo_error')
}

//Guardamos el local storage
const datosDePersonas = JSON.parse(localStorage.getItem('BaseDeDatos'))

const datosUsuario = {
  newUserName:'',
  newUserMail:'',
  newUserPassword:'',
  newUserAge:'',
  newUserAltura:'',
  newUserCalle:'',
  newUserCP:''
}


//Agarro los datos de los inputs 

const inputs = document.querySelectorAll('.inputs')
inputs.forEach((elemen) =>{
  elemen.addEventListener("input", (event) =>{
    
    //Destructoro el e.target.value [Si, me copie un poco del profe :( ]
    const {id, value} = event.target
    // accedo a los objetos sin repetir el codigo
    datosUsuario[id] = value
  })
})

const botonSubir = document.querySelector('.boton')

botonSubir.addEventListener('click', () =>{
  
  const userExist = datosDePersonas.some((element) =>{ return (element.gmail === datosUsuario.newUserMail);}) || false
  console.log(userExist)

  if(!userExist){
    const {newUserName, newUserMail, newUserPassword, newUserAge, newUserAltura, newUserCalle, newUserCP} = datosUsuario
    crearUsuario(newUserName, newUserMail, newUserPassword, newUserAge, newUserAltura, newUserCalle, newUserCP)
    
    datosDePersonas.push(BBDD[BBDD.length-1])

    localStorage.setItem("BaseDeDatos", JSON.stringify(datosDePersonas))

    window.location.href = './loginUser.html'

  }else{
    console.log('este usuario ya existe')
    cambiarSiExiste()
  }
})





