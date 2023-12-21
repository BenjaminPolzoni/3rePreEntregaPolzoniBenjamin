
const hayUser = JSON.parse(localStorage.getItem('UserLog'))

if(!hayUser){
    window.location.href = './page/loginUser.html'
}


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
                <p class="card-text rounded-md w-full text-center ">$${element.price}</p>
                <p class=" w-full text-center">${element.description}</p>
                <a href="#" class="btn btn-info">sumar al carrito</a>
            </div>
        </div>`
        AgarrarDiv.appendChild(creoDiv)
    });


}
// Tomo los datos de la API y le quito el asincronismo ya que necesito los datos en el momento

async function TraerApi(){
    //Guardamos los datos de forma sincronica
    const responde = await fetch('https://dummyjson.com/products/')
    const data = await responde.json()
    console.log(data.products)
    pintarProductos(data.products)
    
}
            
TraerApi()


