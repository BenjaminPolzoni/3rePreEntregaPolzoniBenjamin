

let BBDD = [
    {
        nombre:'alejandro',
        gmail:'ale@gmail.com',
        contraseña:'123453',
        edad:'21',
        direccion:{
            altura:'1300',
            calle:'antonio',
            codigoPostal:'200'
        }
    }
]

localStorage.getItem('BaseDeDatos') || localStorage.setItem('BaseDeDatos',JSON.stringify(BBDD))
export{BBDD};
