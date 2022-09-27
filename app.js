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
        arrayActividades.forEach(element => {
            listaActividadesUI.innerHTML += `<div class="alert alert-primary" role="alert">
            <span class="material-symbols-outlined float-left mr-2">
                settings_accessibility
            </span>
            <b>${element.actividad}</b> - ${element.estado}
    
            <span style="float: right">
                <span class="material-symbols-outlined">
                    check_small
                </span>
                        
                <span class="material-symbols-outlined">
                    delete
                </span>
            </span>
        </div>`
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