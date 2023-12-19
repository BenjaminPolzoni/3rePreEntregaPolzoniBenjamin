
const hayUser = JSON.parse(localStorage.getItem('UserLog'))

if(hayUser){
    //Muestro nombre de usuario si ya esta registrado
    const nombreDelUsuario = document.querySelector('.NombreUsuario')
    nombreDelUsuario.innerText = 'Binvenido '+ hayUser.nombre

}else{// Lo redirijo a la pagina donde se debera registrar de nuevo
    window.location.href = './page/loginUser.html'
}

/*
function TraerApi(){
    fetch('https://dummyjson.com/products')
        .then(res => {return res.json()})
        .then(data => {
            console.log(data)
        })    
}
            
TraerApi()
*/