
const hayUser = JSON.parse(localStorage.getItem('UserLog'))

if(!hayUser){
    window.location.href = './page/loginUser.html'
}

// Funciones Del programa
function pintarProductos(resultados){
    resultados.forEach(element => {
        const AgarrarDiv = document.querySelector('.productos')
        const creoDiv = document.createElement('div')
        creoDiv.setAttribute("class", "flex ")
        
        creoDiv.innerHTML = `
        <div class="card flex flex-column justify-center items-center" >
            <img src="${element.images[0]}" class="card-img-top img-carta" alt='${element.title}'>
            <div class="card-body backdrop-blur-md flex flex-column items-center justify-around">
                <h5 class="card-title rounded-md w-full text-center">${element.title}</h5>
                <p class="card-text rounded-md w-full text-center ">${element.price}</p>
                <p class="card-descripion w-full text-center">${element.description}</p>
                <a href="#" class="btn btn-info boton-sumar-carrito">sumar al carrito</a>
            </div>
        </div>`
        AgarrarDiv.appendChild(creoDiv)
    });
}

function deslogear(){
    const deslog = document.querySelector('.deslogear')

    deslog.addEventListener('click', ()=>{
        localStorage.removeItem('UserLog')
        window.location.href = './page/loginUser.html'
    })    
}

function limpiarYFiltrar (filtro){
    const AgarrarDiv = document.querySelector('.productos');
    AgarrarDiv.innerHTML = ""; // Limpiar el contenido actual
    pintarProductos(filtro);
}

// Tomo los datos de la API y le quito el asincronismo ya que necesito los datos en el momento
function FiltrarObjetos(Datos) {
    
    // Agarro los filtros de la lista
    const filtros = document.querySelectorAll('.list-group-item');
    
    // Agarro la entrada por titulo
    const busqueda = document.querySelector('.busqueda')
    const botonBusqueda = document.querySelector('.boton-busqueda')

    // Recorro los filtros y muestro los objetos en base a su category
    filtros.forEach(filtro => {
        filtro.addEventListener('click', () => {

            // Valido que cuando toque mostrar todo, muestre todos los datos=
            if (filtro.classList.contains('MostrarTodos')) {
                pintarProductos(Datos);
            } else {

                // Si se hace clic en otro filtro, filtra y muestra productos correspondientes
                let categoriaFiltro = filtro.textContent.toLowerCase();
                let categoriaFiltrada;
                
                switch (categoriaFiltro) {
                    case 'fragancias':
                        categoriaFiltrada = 'fragrances';
                        break;
                    case 'comestibles':
                        console.log('Entro a comestibles');
                        categoriaFiltrada = 'groceries';
                        break;
                    case 'decoracion de hogar':
                        console.log('Entro a decoracion de hogar');
                        categoriaFiltrada = 'home-decoration';
                        break;
                    default:
                        // Si no hay una categoría en el switch, usar la categoría original
                        categoriaFiltrada = categoriaFiltro;
                }

                const datosFiltrados = Datos.filter(element => {
                    return element.category.toLowerCase() === categoriaFiltrada;
                });

                limpiarYFiltrar(datosFiltrados)
            }
        })
    })

    let textoBuscar = ''
    busqueda.addEventListener('input', (e) =>{
        textoBuscar = e.target.value
    })

    botonBusqueda.addEventListener('click', ()=>{
        
        const datosbusqueda = Datos.filter((element)=>{
            return element.title === textoBuscar || element.brand === textoBuscar
        })
        datosbusqueda && limpiarYFiltrar(datosbusqueda)
    })
}

function sumarCarrito(){
    const botonSumar = document.querySelectorAll('.boton-sumar-carrito')

    botonSumar.forEach(element => {
        element.addEventListener('click', e=>{
            console.log('soy un boton y funciono ')

        })
    })
}
async function TraerApi(){
    //Guardamos los datos de forma sincronica
    const responde = await fetch('https://dummyjson.com/products/')
    const data = await responde.json()
    console.log(data.products)
    pintarProductos(data.products)
    FiltrarObjetos(data.products)
    sumarCarrito()
}

deslogear()
TraerApi()



