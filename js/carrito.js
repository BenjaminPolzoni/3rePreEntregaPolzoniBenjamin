console.log('carritooooo')

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function pintarCarrito(){
    carrito.forEach(element => {
        const cajaDelCarrito = document.querySelector('.carritoDeCompras');
        const creoDiv = document.createElement('div');
        creoDiv.setAttribute("class", "flex ");

        creoDiv.innerHTML = `
            <div class="card mb-3">
                <img src="${element.images[0]}" class="card-img-top" alt="...">
                <div class="card-body backdrop-blur-md flex flex-column items-center justify-around">
                    <h5 class="card-title rounded-md w-full text-center">${element.title}</h5>
                    <p class="card-text w-full text-center">${element.description}</p>
                    <p class="card-text rounded-md w-full text-center m-1">$${element.price * element.cantidad}</p>
                    <p class="card-text w-full text-center">Cantidad: ${element.cantidad}</p>
                </div>
            </div>
        `;
        cajaDelCarrito.appendChild(creoDiv);
    });
}
// Función para limpiar el carrito
function limpiarCarrito() {
    const botonLimpiarCarrito = document.querySelector('#limpiarCarrito')
    botonLimpiarCarrito.addEventListener('click', ()=>{
        localStorage.removeItem('carrito');
        carrito = []; // Limpiar el array local también
        const cajaDelCarrito = document.querySelector('.carritoDeCompras');
        cajaDelCarrito.innerHTML = ``
        
    })
}
// Función para compar
function comprar(){
    const botonCOmprar = document.querySelector('#RealizarCopra')
    botonCOmprar.addEventListener('click', ()=>{
        let precioTotal = 0
        carrito.forEach((element)=>{
            precioTotal += (element.price * element.cantidad)
        })

        Swal.fire({
            title: "Comprar?",
            text: "El total de la compra es de $" + precioTotal ,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Comprar",
            denyButtonText: `Cancelar`
          }).then((result) => {

            if (result.isConfirmed) {
              Swal.fire("Compra Exitosa!!", "", "success",);
              localStorage.removeItem('carrito');
              carrito = []; // Limpiar el array local también
              const cajaDelCarrito = document.querySelector('.carritoDeCompras');
              cajaDelCarrito.innerHTML = ``
              
            } else if (result.isDenied) {
              Swal.fire("Compra cancelada", "", "error");
            }
          });
    })
}


pintarCarrito();
limpiarCarrito()
comprar()

