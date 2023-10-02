let btnToggle = document.getElementById("btnToggle")
console.log(btnToggle)
if(localStorage.getItem("modoOscuro")){
    //si existe la calve en el storage

}else{
    //no existe la clave en el storage
    console.log("SETEAMOS POR PRIMERA VEZ")
    localStorage.setItem("modoOscuro", false)
}

if(JSON.parse(localStorage.getItem("modoOscuro")) == true){
    document.body.classList.toggle("darkMode")
    btnToggle.innerText = "Light"
}

//funcionamiento del botón
btnToggle.addEventListener("click", () => {
    document.body.classList.toggle("darkMode")
    if(JSON.parse(localStorage.getItem("modoOscuro")) == false){
        //ACA VOY A MODO OSCURO
        btnToggle.innerText = "Light"
        localStorage.setItem("modoOscuro", true)
    }
    else if(JSON.parse(localStorage.getItem("modoOscuro")) == true){
        //VOY A MODO CLARO
        btnToggle.innerText = "Dark"
        localStorage.setItem("modoOscuro", false)
    }
})