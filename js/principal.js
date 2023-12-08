
// Login---------------------------------------------------------------------

// Funciones-----------------------------------------------------------------

// funcion que lee las entradas de inpus
function cargaInputs(elemento1, elemento2){
    elemento1.addEventListener("input", (e)=>{
        console.log(e.target.value)
        usuarioValidar.nombre = e.target.value
    })
    elemento2.addEventListener("input", (e)=>{
        console.log(e.target.value)
        usuarioValidar.password = e.target.value
    })
}

function cambiarSiNoExiste(){
    //Cambio la sombra a rojo
    const contenedorForm = document.querySelector('.contenedorLogin') 
    contenedorForm.classList.add('contenedorLoginError')
    

    const tituloLog = document.querySelector(".login_titulo")
    tituloLog.innerText = 'Su nombre y contraseña no coinciden'
    tituloLog.classList.add('login_titulo_error')
}
function cambiarSiExiste (){
    window.location.href = "../index.html"
}

const usuarioValidar = {
    nombre: '',
    password:''
}

// Agarro las entradas y las guarado en las variables
const userName = document.querySelector("#input_nombre")
const userPassword = document.querySelector("#input_password")
const boton = document.querySelector(".botonIndex")

//Invoco la funcion que me permite guardar los datos cargados
cargaInputs(userName, userPassword)

// Ahora creo el evento del boton
boton.addEventListener("click", ()=>{

    // llamo a la base de datos del local storage
    const baseDeDatos = JSON.parse(localStorage.getItem('BaseDeDatos'))

    console.log(baseDeDatos)
    const userExist = baseDeDatos.some((element) =>{ return (element.nombre === usuarioValidar.nombre && element.contraseña === usuarioValidar.password);})

    if(userExist){
        console.log('Existe')
        localStorage.setItem("UserLog", JSON.stringify(usuarioValidar))
        window.location.href = '../index.html'
    }else{
        cambiarSiNoExiste()
        console.log('no esxiste')
    }
})
