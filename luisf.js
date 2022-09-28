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
            listaActividVista.innerHTML += `<div class="alert alert-primary" role="alert"><span class="material-symbols-outlined float-left mr-2">settings_accessibility</span><b>${element.actividad}</b>-${element.estado}<span style="float: right"><span class="material-symbols-outlined">edit</span><span class="material-symbols-outlined">clear</span><span class="material-symbols-outlined">delete_sweep</span></span></div> <div id="ventanaModal" class="modal"><div class="contenido-modal"><span class="cerrar">&times;</span><h3>Actividad</h3><form id="formulario1" name="formulario1"><input type="text" id="actividad1" name="actividad1" class="form-control my-3"><button type="submit" class="btn btn-primary">Guardar</button></form></div><div>`;
        } else {
            listaActividVista.innerHTML += `<div class="alert alert-danger" role="alert"><span class="material-symbols-outlined float-left mr-2">settings_accessibility</span><b>${element.actividad}</b>-${element.estado}<span style="float: right"><span class="material-symbols-outlined">edit</span><span class="material-symbols-outlined">check_small</span><span class="material-symbols-outlined">delete_sweep</span></span></div><div id="ventanaModal" class="modal"><div class="contenido-modal"><span class="cerrar">&times;</span><h3>Actividad</h3><form id="formulario1" name="formulario1"><input type="text" id="actividad1" name="actividad1" class="form-control my-3"><button type="submit" class="btn btn-primary">Guardar</button></form></div></div>`;
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

 const editar1 =(actividad, cambio)=>{
  let indexarray = arrayActividades.findIndex((element)=> element.actividad === actividad );
  arrayActividades[indexarray].actividad = cambio;

guardarLs();
} 



const insertar = (actividad)=>{
  //$("#actividad1").val(actividad);
  let actividad1 = document.getElementById("actividad1");
  actividad1.value = actividad;
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
  if (
    e.target.innerHTML === "check_small" ||
    e.target.innerHTML === "delete_sweep" ||
    e.target.innerHTML === "clear"||
    e.target.innerHTML === "edit"||
    e.target.innerHTML == "×"
  ) {
    if (e.target.innerHTML === "delete_sweep") {
      eliminarls(e.path[2].childNodes[1].innerHTML);
    }
    if (e.target.innerHTML === "clear" || e.target.innerHTML === 'check_small'){
      editarls(e.path[2].childNodes[1].innerHTML);
    }
    if (e.target.innerHTML === 'edit') {
      let modal = document.getElementById("ventanaModal"); 
      modal.style.display = "block"; 
      let envio = e.path[2].childNodes[1].innerHTML;
      insertar(envio);

      let formularioVista1 = document.querySelector('#formulario1');


          formularioVista1.addEventListener("submit", (e) => {
          e.preventDefault();
          let actividad = document.querySelector("#actividad1").value;
          if(actividad === ''){
            alert('Por favor escriba una actividad')
          }else{
            editar1(envio, actividad);
          guardarLs();
          formularioVista.reset();
          } 
          });
     
    }
    if (e.target.innerHTML == '×') {
      let modal = document.getElementById("ventanaModal"); 
      modal.style.display = "none";  
      }
  }
});

document.addEventListener("DOMContentLoaded", cargarls);
