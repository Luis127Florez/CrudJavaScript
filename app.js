// variables globales

const formularioUI = document.querySelector('#formulario');
const listaActividadesUI = document.getElementById('listaActividades');
let arrayActividades = [];

// funciones
const CrearItem = (actividad) => {
    let item = {
        actividad: actividad,
        estado: false
    }
    arrayActividades.push(item);
    return item;
}
const GuardarDB = () => {
    localStorage.setItem('rutina',JSON.stringify(arrayActividades));
    PintarDB();
}
const PintarDB = () => {
    listaActividadesUI.innerHTML = '';
    arrayActividades = JSON.parse(localStorage.getItem('rutina'));
    if(arrayActividades === null){
        arrayActividades = [];
    }else{
        arrayActividades.array.forEach(element => {
            listaActividadesUI.innerHTML += ``
        });
    }
}
//eventlistener
formularioUI.addEventListener('submit', (e) =>{

    e.preventDefault();
    let ActividadesUI = document.querySelector('#actividad').value;

    CrearItem(ActividadesUI);
    GuardarDB();

    formularioUI.reset(); 
});

document.addEventListener('DOMContentLoaded', PintarDB);