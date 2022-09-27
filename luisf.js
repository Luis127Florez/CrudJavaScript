let formularioVista = document.querySelector("#formulario");
let listaActividVista = document.getElementById("listaActividades");
let arrayActividades = [];

let insertaritem = (activity) => {
  let item = {
    actividad: activity,
    estado: false,
  };
  let ready = true;

  arrayActividades.forEach(element => {
    if(activity === element.actividad ){
        ready = false;
    }
  });
  if (ready) {
  arrayActividades.push(item);
    
  }else{
    alert('la actividad ya existe');
  }

};

const guardarLs = () => {
  localStorage.setItem("rutina", JSON.stringify(arrayActividades));
  cargarls();
};
const cargarls = () => {
  listaActividVista.innerHTML = "";
  arrayActividades = JSON.parse(localStorage.getItem("rutina"));
  if (arrayActividades === null) {
    arrayActividades = [];
  } else {
    arrayActividades.forEach((element) => {
        if (element.estado) {
            listaActividVista.innerHTML += `<div class="alert alert-primary" role="alert"><span class="material-symbols-outlined float-left mr-2">settings_accessibility</span><b>${element.actividad}</b>-${element.estado}<span style="float: right"><span class="material-symbols-outlined">clear</span><span class="material-symbols-outlined">delete_sweep</span></span></div>`;
        } else {
            listaActividVista.innerHTML += `<div class="alert alert-danger" role="alert"><span class="material-symbols-outlined float-left mr-2">settings_accessibility</span><b>${element.actividad}</b>-${element.estado}<span style="float: right"><span class="material-symbols-outlined">check_small</span><span class="material-symbols-outlined">delete_sweep</span></span></div>`;
        }
    });
  }
};

const eliminarls = (actividad) => {
  let indexarray;
  arrayActividades.forEach((element, index) => {
    if (element.actividad === actividad) {
      indexarray = index;
    }
  });

  arrayActividades.splice(indexarray,1);
  guardarLs();
};


const editarls =(actividad)=>{
    let indexarray = arrayActividades.findIndex((element)=> element.actividad === actividad );
    if (arrayActividades[indexarray].estado === true) {
      arrayActividades[indexarray].estado = false;
    }else{
      arrayActividades[indexarray].estado = true;
    }
 
 guardarLs();
}

formularioVista.addEventListener("submit", (e) => {
  e.preventDefault();
  let actividad = document.querySelector("#actividad").value;
  if(actividad === ''){
    alert('Por favor escriba una actividad')
  }else{
    insertaritem(actividad);
  guardarLs();
  formularioVista.reset();
  }
  
});

listaActividVista.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    e.target.innerHTML === "check_small" ||
    e.target.innerHTML === "delete_sweep" ||
    e.target.innerHTML === "clear"
  ) {
    if (e.target.innerHTML === "delete_sweep") {
      eliminarls(e.path[2].childNodes[1].innerHTML);
    }
    if (e.target.innerHTML === "clear" || e.target.innerHTML === 'check_small'){
      editarls(e.path[2].childNodes[1].innerHTML);
    }
   /*  if (e.target.innerHTML === 'check_small') {
        editarls(e.path[2].childNodes[1].innerHTML);            
    } */
  }
});

document.addEventListener("DOMContentLoaded", cargarls);
