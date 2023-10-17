class Prenda {
    constructor(id, prenda, talle, precio, imagen) {
        this.id = id;
        this.prenda = prenda;
        this.talle = talle;
        this.precio = precio;
        this.imagen = imagen;
    }

    mostrarInfoPrenda() {
        console.log(`${this.prenda} de talle ${this.talle} su precio es ${this.precio}`);
    }

    exponerEnCatalogo() {
        console.log(this.id, this.prenda, this.talle, this.precio);
    }
}
const prenda1 = new Prenda(1, "Remera Oversize", "XL", 5800, "REMERA-OVERSIZE.webp");
const prenda2 = new Prenda(2, "Remera Regular", "L", 5500, "REMERA-REGULAR.webp");
const prenda3 = new Prenda(3, "Camisa", "L", 4800, "camisa.webp");
const prenda4 = new Prenda(4, "Pantalón Cargo", "40", 14000, "pantalon-cargo.webp");
const prenda5 = new Prenda(5, "Pantalón joggin", "42", 12500, "pantalón-joggin.webp");
const prenda6 = new Prenda(6, "Pantalón corto", "40", 8000, "pantalón-corto.webp");

// DOM
let containerPrendas = document.getElementById("prendas");
let formCargarPrenda = document.getElementById("formCargarPrenda");
let guardarPrendaBtnModal = document.getElementById("guardarPrendaBtnModal");
let selectOrden = document.getElementById("selectOrden");
let buscador = document.getElementById("buscador");
let coincidenciasDiv = document.getElementById("coincidencias");
let modalBodyCarrito = document.getElementById("modal-bodyCarrito");
let botonCarrito = document.getElementById("botonCarrito");
let precioTotal = document.getElementById("precioTotal");
let prenda = document.getElementById("prendaInput");
let talle = document.getElementById("talleInput");
let precio = document.getElementById("precioInput");
let estanteria = [prenda1, prenda2, prenda3, prenda4, prenda5, prenda6];
let productosCarrito = cargarDatosDesdeLocalStorage("carrito") || [];

// FUNCTIONS:
function cargarDatosDesdeLocalStorage(clave) {
    try {
        const datos = localStorage.getItem(clave);
        return datos ? JSON.parse(datos) : null;
    } catch (error) {
        console.error(`Error al cargar datos desde ${clave} en localStorage:`, error);
        return null;
    }
}

// Función para guardar datos en localStorage
function guardarDatosEnLocalStorage(clave, datos) {
    try {
        localStorage.setItem(clave, JSON.stringify(datos));
    } catch (error) {
        console.error(`Error al guardar datos en ${clave} en localStorage:`, error);
    }
}

function mostrarCatalogoDOM(array) {
    containerPrendas.innerHTML = "";

    for (let p of array) {
        let prendaNuevaDiv = document.createElement("div");
        prendaNuevaDiv.className = "col-12 col-md-6 col-lg-4 my-2";
        prendaNuevaDiv.innerHTML = `
            <div id="${p.id}" class="card" style="width: 18rem;">
                <img class="card-img-top img-fluid" style="height: 200px;" src="assets/${p.imagen}" alt="${p.prenda} ${p.talle}">
                <div class="card-body">
                    <h4 class="card-title"></h4>
                    <p>${p.prenda}</p>
                    <p>${p.talle}</p>
                    <p class="${p.precio <= 5000 ? 'oferta' : ''}">Precio: $${p.precio}</p>
                    <button id="agregarBtn${p.id}" class="btn btn-outline-success">Agregar al carrito</button>
                </div>
            </div> `;
        containerPrendas.append(prendaNuevaDiv);
        let agregarBtn = document.getElementById(`agregarBtn${p.id}`);
        agregarBtn.addEventListener("click", () => {
            agregarAlCarrito(p);
        });
    }
}

function agregarAlCarrito(elemento) {
    let prendaAgregada = productosCarrito.find((prenda) => prenda.id == elemento.id);

    if (prendaAgregada === undefined) {
        productosCarrito.push(elemento);
        localStorage.setItem("carrito", JSON.stringify(productosCarrito));
        // Mostrar SweetAlert para producto agregado
        Swal.fire({
            title: '¡Producto Agregado!',
            text: `Has agregado ${elemento.prenda} al carrito.`,
            icon: 'success',
            confirmButtonText: 'Continuar'
        });
        // Luego puedes actualizar la vista del carrito, si es necesario
        mostrarProductosEnCarrito();
    } else {
        // Mostrar SweetAlert para producto repetido
        Swal.fire({
            title: 'Producto Repetido',
            text: `La prenda seleccionada ${elemento.prenda} ya existe en el carrito.`,
            icon: 'info',
            confirmButtonText: 'Continuar'
        });
    }
}



function cargarProductosCarrito(array) {
    modalBodyCarrito.innerHTML = "";
    array.forEach((productoCarrito) => {
        modalBodyCarrito.innerHTML += `
            <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
                 <img class="card-img-top" height="300px" src="assets/${productoCarrito.imagen}" alt="">
                 <div class="card-body">
                        <h4 class="card-title">${productoCarrito.prenda}</h4>
                        <p class="card-text">${productoCarrito.talle}</p>
                         <p class="card-text">$${productoCarrito.precio}</p> 
                         <button class="btn btn-danger eliminar-producto" data-id="${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
                 </div>    
            </div>
        `;
    });

    
    const botonesEliminar = document.querySelectorAll('.eliminar-producto');
    botonesEliminar.forEach((boton) => {
        boton.addEventListener('click', (event) => {
            const idProductoEliminar = parseInt(event.target.getAttribute('data-id'));
            eliminarProductoCarrito(idProductoEliminar);
        });
    });

    calcularTotal(array);
}

function eliminarProductoCarrito(id) {
    const productoEliminarIndex = productosCarrito.findIndex((producto) => producto.id === id);

    if (productoEliminarIndex !== -1) {
        productosCarrito.splice(productoEliminarIndex, 1);
        guardarDatosEnLocalStorage('carrito', productosCarrito);
        cargarProductosCarrito(productosCarrito);
    } else {
        console.error(`El producto con ID ${id} no existe en el carrito.`);
    }
}

function calcularTotal(array) {
    const totalReduce = array.reduce(
        (acumulador, prenda) => {
            return acumulador + prenda.precio;
        },
        0
    );
    totalReduce > 0 ? (precioTotal.innerHTML = `<strong>El total de su compra es: $${totalReduce}</strong>`) : (precioTotal.innerHTML = `No hay productos en el carrito`);
}

document.getElementById("botonFinalizarCompra").addEventListener("click", () => {
    // Lógica para finalizar la compra, calcular el total, etc.

    Swal.fire({
        title: 'Compra Finalizada',
        text: '¡Gracias por tu compra! Tu pedido ha sido procesado con éxito.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
});


function agregarPrenda(array) {
    const nuevaPrenda = new Prenda(
        array.length + 1,
        document.getElementById("prendaInput").value,
        document.getElementById("talleInput").value,
        parseInt(document.getElementById("precioInput").value),
        "img/REMERA-REGULAR.jpg"
    );
    array.push(nuevaPrenda);
    prenda.value = "";
    talle.value = "";
    precio.value = "";
    localStorage.setItem("estanteria", JSON.stringify(estanteria));
}

function ordenarMayorMenor(array) {
    let arrayMayorMenor = array.concat();

    arrayMayorMenor.sort(
        (par1, par2) => par2.precio - par1.precio
    );
    mostrarCatalogoDOM(arrayMayorMenor);
}

function ordenarMenorMayor(ar) {
    let arrMenor = ar.concat();
    arrMenor.sort(
        (a, b) => a.precio - b.precio
    );
    mostrarCatalogoDOM(arrMenor);
}

function ordenarPorTalle(array) {
    let ordenadoAlf = array.concat();
    ordenadoAlf.sort(
        (a, b) => {
            if (a.prenda > b.prenda) {
                return 1;
            }
            if (a.prenda < b.prenda) {
                return -1;
            }

            return 0;
        }
    );
    mostrarCatalogoDOM(ordenadoAlf);
}

function buscarInfo(buscado, array) {
    let coincidencias = array.filter(
        (prenda) => {
            return prenda.prenda.toLowerCase().includes(buscado.toLowerCase()) || prenda.talle.toLowerCase().includes(buscado.toLowerCase());
        }
    );
    coincidencias.length > 0 ? (mostrarCatalogoDOM(coincidencias), coincidenciasDiv.innerHTML = "") : (mostrarCatalogoDOM(array), coincidenciasDiv.innerHTML = `<h3>No hay coincidencias con su búsqueda, este es nuestro catálogo completo</h3>`);
}

buscador.addEventListener("input", () => {
    console.log(buscador.value);
    buscarInfo(buscador.value, estanteria);
});

guardarPrendaBtnModal.addEventListener("click", () => {
    agregarPrenda(estanteria);
    mostrarCatalogoDOM(estanteria);
});

selectOrden.addEventListener("change", () => {

    console.log(selectOrden.value);
    switch (selectOrden.value) {
        case "1":
            ordenarMayorMenor(estanteria);
            break;
        case "2":
            ordenarMenorMayor(estanteria);
            break;
        case "3":
            ordenarPorTalle(estanteria);
            break;
        default:
            mostrarCatalogoDOM(estanteria);
            break;
    }
});

botonCarrito.addEventListener("click", () => {
    cargarProductosCarrito(productosCarrito);
});

mostrarCatalogoDOM(estanteria);

// sweetalert
const btn = document.querySelector('#myBtn')
btn.addEventListener('click', () => {

    Swal.fire({
        title: 'Contactanos',
        text: 'Tel: 000-000000 Ig: juan._pisani', 
        icon: 'success',
        confirmButtonText: 'Gracias por su visita'
})
})
