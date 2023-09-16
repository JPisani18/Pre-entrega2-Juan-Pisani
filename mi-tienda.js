//PROYECTO Tienda de ropa

alert('Bienvenidos a mi tienda');

class Prenda {
    constructor(id, prenda, talle, precio) {
        this.id = id;
        this.prenda = prenda;
        this.talle = talle;
        this.precio = precio;
    }

    mostrarInfoPrenda() {
        console.log(`La prenda es un/a ${this.prenda}, su talle es ${this.talle} y su precio es ${this.precio}`);
    }
}

class Carrito {
    constructor() {
        this.elementos = [];
    }

    agregarElemento(prenda) {
        this.elementos.push(prenda);
    }

    quitarElemento(id) {
        this.elementos = this.elementos.filter((prenda) => prenda.id !== id);
    }

    mostrarCarrito() {
        let carritoStr = "Contenido del carrito:\n";
        for (let prenda of this.elementos) {
            carritoStr += `ID: ${prenda.id}, Talle: ${prenda.talle}, Prenda: ${prenda.prenda}, Precio: $${prenda.precio}\n`;
        }
        const precioTotal = this.calcularPrecioTotal(); 
        carritoStr += `\nPrecio Total del Carrito: $${precioTotal}`; 
        alert(carritoStr);
    }

    calcularPrecioTotal() {
        let precioTotal = 0;
        for (let prenda of this.elementos) {
            precioTotal += prenda.precio;
        }
        return precioTotal;
    }
}

const prenda1 = new Prenda(1, "Remera Oversize", "XL", 5800);
const prenda2 = new Prenda(2, "Remera Regular", "L", 4500);
const prenda3 = new Prenda(3, "Musculosa", "L", 4800);
const prenda4 = new Prenda(4, "Pantalón Cargo", "42", 14000);
const prenda5 = new Prenda(5, "Pantalón Jogging", "46", 8500);
const prenda6 = new Prenda(6, "Pantalón Corto", "42", 6000);

const catalogo = [prenda1, prenda2, prenda3, prenda4, prenda5, prenda6];
const carrito = new Carrito();

function agregarPrenda() {
    let prenda = prompt("Ingrese la prenda");
    let talle = prompt("Ingrese el talle");
    let precio = parseInt(prompt(`Ingrese el precio de ${prenda}`));

    const nuevaPrenda = new Prenda(catalogo.length + 1, prenda, talle, precio);
    console.log(nuevaPrenda);
    catalogo.push(nuevaPrenda);

    let agregarAlCarrito = prompt("¿Desea agregar esta prenda al carrito? (Sí/No)").toLowerCase();

    if (agregarAlCarrito === "si" || agregarAlCarrito === "sí") {
        carrito.agregarElemento(nuevaPrenda);
        console.log(`Se ha agregado la prenda al carrito.`);
    }
}

function quitarPrenda(array) {
    mostrarCatalogo(array);
    let idEliminar = parseInt(prompt("Observar el catálogo en consola y seleccionar el ID a eliminar"));
    let coincidencia = false;
    for (let elem of array) {
        if (elem.id === idEliminar) {
            let indice = array.indexOf(elem);
            array.splice(indice, 1);
            mostrarCatalogo(array);
            coincidencia = true;
            break;
        }
    }
    if (!coincidencia) {
        console.log(`El ID ${idEliminar} no coincide con ninguna prenda de nuestro catálogo. No se pudo eliminar`);
    }
}

function mostrarCatalogo(array) {
    let catalogoStr = "Nuestro catálogo es:\n";
    for (let prenda of array) {
        catalogoStr += `ID: ${prenda.id}, Talle: ${prenda.talle}, Prenda: ${prenda.prenda}, Precio: $${prenda.precio}\n`;
    }
    alert(catalogoStr);
}

function buscarTalle(array) {
    let talleBuscado = prompt("Ingrese el talle que desea buscar");
    let coincidencias = array.filter(
        (elem) => elem.talle.toLowerCase() === talleBuscado.toLowerCase()
    );

    if (coincidencias.length === 0) {
        console.log(`No se han encontrado prendas con talle ${talleBuscado}`);
    } else {
        console.log("Prendas encontradas:");
        mostrarCatalogo(coincidencias);
    }
}

function buscarPrenda(array) {
    let prendaBuscada = prompt("Ingrese el nombre de la prenda que desea encontrar").toLowerCase();
    let coincidencias = array.filter(
        (prenda) => prenda.prenda.toLowerCase().includes(prendaBuscada)
    );

    if (coincidencias.length === 0) {
        console.log(`No hay coincidencias con ${prendaBuscada}`);
    } else {
        console.log("Prendas encontradas:");
        mostrarCatalogo(coincidencias);
    }
}

function ordenarMenorMayor(array) {
    let arrayMenorMayor = array.concat();
    arrayMenorMayor.sort(
        (par1, par2) => par1.precio - par2.precio
    );
    mostrarCatalogo(arrayMenorMayor);
}

function ordenarMayorMenor(array) {
    let arrayMayorMenor = array.concat();
    arrayMayorMenor.sort(
        (par1, par2) => par2.precio - par1.precio
    );
    mostrarCatalogo(arrayMayorMenor);
}

function agregarPrendaAlCarrito() {
    mostrarCatalogo(catalogo); 
    let idAgregarAlCarrito = parseInt(prompt("Selecciona el ID de la prenda que deseas agregar al carrito:"));

    const prendaSeleccionada = catalogo.find((prenda) => prenda.id === idAgregarAlCarrito);

    if (prendaSeleccionada) {
        carrito.agregarElemento(prendaSeleccionada);
        console.log(`Se ha agregado la prenda al carrito.`);
    } else {
        console.log(`El ID ${idAgregarAlCarrito} no coincide con ninguna prenda en el catálogo.`);
    }
}

function quitarDelCarrito(carrito) {
    carrito.mostrarCarrito();
    let idQuitar = parseInt(prompt("Selecciona la prenda a quitar del carrito"));
    carrito.quitarElemento(idQuitar);
    alert(`Se ha quitado la prenda del carrito.`);
}

function menu() {
    let salirMenu = false;
    do {
        let opcionIngresada = parseInt(prompt(`Ingrese la opción deseada
       1 - Agregar prenda al catálogo  
       2 - Borrar prenda del catálogo
       3 - Ver catálogo
       4 - Buscar por talle
       5 - Buscar por prenda
       6 - Ordenar menor a mayor por precio
       7 - Ordenar mayor a menor por precio
       8 - Agregar prenda al carrito
       9 - Ver carrito
       10 - Quitar del carrito
       0 - Salir del menú`));
        switch (opcionIngresada) {
            case 1:
                agregarPrenda();
                break;
            case 2:
                quitarPrenda(catalogo);
                break;
            case 3:
                mostrarCatalogo(catalogo);
                break;
            case 4:
                buscarTalle(catalogo);
                break;
            case 5:
                buscarPrenda(catalogo);
                break;
            case 6:
                ordenarMenorMayor(catalogo);
                break;
            case 7:
                ordenarMayorMenor(catalogo);
                break;
            case 8:
                agregarPrendaAlCarrito();
                break;
            case 9:
                carrito.mostrarCarrito();
                break;
            case 10:
                quitarDelCarrito(carrito);
                break;
            case 0:
                alert(`Gracias! Vuelva pronto!`);
                salirMenu = true;
                break;
            default:
                console.log("Opción no válida, ingrese alguna presente en el menú");
                alert('Opción no válida, ingrese alguna presente en el menú');
                break;
        }
    } while (!salirMenu);
}

menu();
