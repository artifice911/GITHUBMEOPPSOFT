let url = "../datos.csv";
let info;
//CONOCER LA PANTALLA ACTIVA PARA RESETEAR EL SOFT SI NO HAY ACTIVIDAD DESPUES DE 4 MINUTOS
let pantallaActiva = "intro";

var timeoutInMiliseconds = 60000;
var timeoutId;

mostrarModal();

function startTimer() {
  // window.setTimeout returns an Id that can be used to start and stop a timer
  timeoutId = window.setTimeout(doInactive, timeoutInMiliseconds);
}

function resetTimer() {
  window.clearTimeout(timeoutId);
  startTimer();
}

function doInactive() {
  console.log("reinicio de seguridad")
  location.reload();
  // does whatever you need it to actually do - probably signs them out or stops polling the server for info
}


//window.onload = setupTimers();

document.body.addEventListener("click", resetTimer)

//CHEQUEA SI EXISTE LA KEY USUARIOS EN EL LOCALSTORAGE
if (localStorage.key(0) == "usuarios") {
  info = JSON.parse(localStorage.getItem("usuarios"));
}
//CREA LA KEY "USUARIOS" EN EL LOCALSTORAGE SI ES LA PRIMERA VEZ QUE INICIA EL PROGRAMA Y CARGA LA INFO DEL ARCHIVO CSV
else {
  upload();
}

let calentamiento = false;
let usuario;
let actividad = "";
let dolor;

let tiempoIntro = 5;
let srcActual;

const timerEjercicios = [10, 15, 25];
let timerEjercicioActual;

//CARGAR LA DATA DEL ARCHIVO LOCAL CSV Y GUARDARLA EN EL LOCAL STORAGE
function upload() {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      const lines = data.split("\n");
      const headers = lines[0].split(",");
      const result = [];
      for (let i = 0; i < lines.length; i++) {
        lines[i] = lines[i].replace("\r", "");
      }
      for (let i = 0; i < headers.length; i++) {
        headers[i] = headers[i].replace("\r", "");
      }
      for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentline = lines[i].split(",");

        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j];
        }

        result.push(obj);
      }
      let json = JSON.stringify(result);

      localStorage.setItem("usuarios", json);

      let infoT = JSON.parse(localStorage.getItem("usuarios"));

      info = infoT;
    })
    .catch((error) => console.log(error));
  console.log("carga ok");
}

//SETEAR PANTALLAS VISIBLES AL COMIENZO DEL SOFTWARE
const introS = document.querySelectorAll("#intro");
const loginS = (document.getElementById("login").style.display = "none");
const pausaS = (document.getElementById("pausasActivas").style.display =
  "none");
const calentamientoS = (document.getElementById("calentamiento").style.display =
  "none");

const mainS = (document.getElementById("main").style.display = "none");
const ejercicioS = (document.getElementById("ejercicios").style.display =
  "none");
const previaS = (document.getElementById("previa").style.display = "none");
const preparacionS = (document.getElementById("preparacion").style.display =
  "none");

const actividadS = (document.getElementById("actividad").style.display =
  "none");

const conclusionS = (document.getElementById("conclusion").style.display =
  "none");

//--------CREACION DE CLASE USUARIO PRINCIPAL-----------
class Usuario {
  constructor(
    dni,
    nombre,
    apellido,
    edad,
    empresa,
    puntos,
    cuello1,
    dolorcuello1,
    cuello2,
    dolorcuello2,
    cuello3,
    dolorcuello3,
    hombros1,
    dolorhombros1,
    hombros2,
    dolorhombros2,
    hombros3,
    dolorhombros3,
    hombros4,
    dolorhombros4,
    lumbar1,
    dolorlumbar1,
    lumbar2,
    dolorlumbar2,
    rodilla1,
    dolorrodilla1,
    rodilla2,
    dolorrodilla2,
    visual,
    dolorvisual
  ) {
    this.dni = dni;
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.empresa = empresa;
    this.puntos = puntos;
    this.cuello1 = cuello1;
    this.dolorcuello1 = dolorcuello1;
    this.cuello2 = cuello2;
    this.dolorcuello2 = dolorcuello2;
    this.cuello3 = cuello3;
    this.dolorcuello3 = dolorcuello3;
    this.hombros1 = hombros1;
    this.dolorhombros1 = dolorhombros1;
    this.hombros2 = hombros2;
    this.dolorhombros2 = dolorhombros2;
    this.hombros3 = hombros3;
    this.dolorhombros3 = dolorhombros3;
    this.hombros4 = hombros4;
    this.dolorhombros4 = dolorhombros4;
    this.lumbar1 = lumbar1;
    this.dolorlumbar1 = dolorlumbar1;
    this.lumbar2 = lumbar2;
    this.dolorlumbar2 = dolorlumbar2;
    this.rodilla1 = rodilla1;
    this.dolorrodilla1 = dolorrodilla1;
    this.rodilla2 = rodilla2;
    this.dolorrodilla2 = dolorrodilla2;
    this.visual = visual;
    this.dolorvisual = dolorvisual;
  }
}

let clave;

let baseDatos;

function volverIntro() {
  const introS = (document.getElementById("intro").style.display = "flex");
  const loginS = (document.getElementById("login").style.display = "none");
  const dni = document.getElementById("consola");
  dni.innerText = "";
  pantallaActiva = "intro";
}

//--------FUNCIONES DE BOTONES--------------
function agregarNum(boton) {
  const dni = document.getElementById("consola");
  let str = dni.textContent;
  if (str.length <= 7) {
    var text = document.createTextNode(boton.id);
    dni.appendChild(text);
  }
}

function borrarNum() {
  const dni = document.getElementById("consola");
  let str = dni.textContent;
  if (str.length >= 1) {
    str = str.substring(0, str.length - 1);
    dni.innerText = str;
  }
}

//LOGIN CON DNI Y CARGA DE DATOS DEL USUARIO LOGUEADO
function verificarDatos(clave) {
  const dni = document.getElementById("consola");
  let str = dni.textContent;
  if (str.length == 7 || str.length == 8) {
    clave = str;
    let contador = 0;
    for (let i = 0; i < info.length; i++) {
      contador++;
      if (info[i].dni == parseInt(clave)) {
        usuario = new Usuario(
          info[i].dni,
          info[i].nombre,
          info[i].apellido,
          info[i].edad,
          info[i].empresa,
          info[i].puntos,
          info[i].cuello1,
          info[i].dolorcuello1,
          info[i].cuello2,
          info[i].dolorcuello2,
          info[i].cuello3,
          info[i].dolorcuello3,
          info[i].hombros1,
          info[i].dolorhombros1,
          info[i].hombros2,
          info[i].dolorhombros2,
          info[i].hombros3,
          info[i].dolorhombros3,
          info[i].hombros4,
          info[i].dolorhombros4,
          info[i].lumbar1,
          info[i].dolorlumbar1,
          info[i].lumbar2,
          info[i].dolorlumbar2,
          info[i].rodilla1,
          info[i].dolorrodilla1,
          info[i].rodilla2,
          info[i].dolorrodilla2,
          info[i].visual,
          info[i].dolorvisual
        );
        console.log(usuario);
        console.log("contraseña ok");
        mostrarPausas();
        break;
      } else if (contador == info.length) {
        console.log("constraseña incorrecta");
      }
    }
  } else {
    alert("verifica tus datos para poder ingresar");
  }
}

function mostrarLogin() {
  const loginS = (document.getElementById("login").style.display = "flex");
  const introS = (document.getElementById("intro").style.display = "none");
  pantallaActiva = "login";
}

function volverLogin() {
  const loginS = (document.getElementById("login").style.display = "flex");
  const mainS = (document.getElementById("main").style.display = "none");
  usuario = "";
  pantallaActiva = "login";
}

function accesoInvitado() {
  usuario = new Usuario(
    "",
    "INVITADO",
    "DE EJERCICIOS",
    "",
    "MEOPP",
    0,
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0"
  );
  mostrarPausas();
}

function mostrarPausas() {
  const dni = document.getElementById("consola");
  dni.innerText = "";
  const loginS = (document.getElementById("login").style.display = "none");
  const pausaS = (document.getElementById("pausasActivas").style.display =
    "flex");
  pantallaActiva = "pausasActivas";
}

function mostrarPrecalentamiento() {
  const pausaS = (document.getElementById("pausasActivas").style.display =
    "none");
  const calentamientoS = (document.getElementById(
    "calentamiento"
  ).style.display = "flex");
  pantallaActiva = "precalentamiento";
}

function mostrarMain() {
  pantallaActiva = "main";
  const admin = (document.getElementById("adminBTNS").style.display = "none");
  const calentamientoS = (document.getElementById(
    "calentamiento"
  ).style.display = "none");
  const pausaS = (document.getElementById("pausasActivas").style.display =
    "none");
  const mainS = (document.getElementById("main").style.display = "flex");
  const loginS = (document.getElementById("login").style.display = "none");
  const nombre = (document.getElementById("nombre").innerHTML =
    usuario.nombre + " " + usuario.apellido);

  const puntosPlus = (document.getElementById("puntos").innerText =
    usuario.puntos);
  const empresa = (document.getElementById("empresa").innerHTML =
    usuario.empresa);
  //SE LE DA PERMISO A NICO Y A GONZA PARA ACCEDER A LA CARGA Y DESCARGA DE DATOS NUEVOS
  if (usuario.dni == "33618543" || usuario.dni == "35124036") {
    const adminBTNS = (document.getElementById("adminBTNS").style.display =
      "flex");
  }
  console.log(usuario.dni);
}

function mostrarEjercicios(boton) {
  pantallaActiva = "ejercicios";
  const mainS = (document.getElementById("main").style.display = "none");
  const ejercicioS = (document.getElementById("ejercicios").style.display =
    "flex");
  if (boton.id === "visuales") {
    const visuales = (document.getElementById("categoria").innerText =
      "visuales");
    const evisuales = (document.getElementById("evisuales").style.display =
      "flex");
    const einferiores = (document.getElementById("einferiores").style.display =
      "none");
    const esuperiores = (document.getElementById("esuperiores").style.display =
      "none");
  } else if (boton.id === "inferior") {
    const inferior = (document.getElementById("categoria").innerText =
      "inferior");
    const evisuales = (document.getElementById("evisuales").style.display =
      "none");
    const einferiores = (document.getElementById("einferiores").style.display =
      "flex");
    const esuperiores = (document.getElementById("esuperiores").style.display =
      "none");
  } else if (boton.id === "superior") {
    const superior = (document.getElementById("categoria").innerText =
      "superior");
    const evisuales = (document.getElementById("evisuales").style.display =
      "none");
    const einferiores = (document.getElementById("einferiores").style.display =
      "none");
    const esuperiores = (document.getElementById("esuperiores").style.display =
      "flex");
  }
}

function volverMain() {
  pantallaActiva = "main";
  const mainS = (document.getElementById("main").style.display = "flex");
  const loginS = (document.getElementById("ejercicios").style.display = "none");
  const previaS = (document.getElementById("previa").style.display = "none");
  const actividadS = (document.getElementById("actividad").style.display =
    "none");
  const conclusionS = (document.getElementById("conclusion").style.display =
    "none");
  let imagen = (document.getElementById("ejercicioID").src =
    "../images/ejercicios/default.png");
}

function previaEjercicio(boton) {
  pantallaActiva = "previa";
  const ejerciciosS = (document.getElementById("ejercicios").style.display =
    "none");
  const previaS = (document.getElementById("previa").style.display = "flex");
  const cuelloS = (document.getElementById("cuello").style.display = "none");
  const hombroS = (document.getElementById("hombros").style.display = "none");
  const lumbarS = (document.getElementById("lumbar").style.display = "none");
  const rodillaS = (document.getElementById("rodilla").style.display = "none");
  const visualS = (document.getElementById("visualE").style.display = "none");
  const comenzarBTN = (document.getElementById("comenzarDiv").style.display =
    "none");
  switch (boton.id) {
    case "btnrodillas":
      const rodilla = (document.getElementById("rodilla").style.display =
        "flex");
      break;
    case "btnvisuales":
      const visual = (document.getElementById("visualE").style.display =
        "flex");
      break;
    case "btncervical":
      const cuello = (document.getElementById("cuello").style.display = "flex");
      break;
    case "btncolumna":
      const lumbar = (document.getElementById("lumbar").style.display = "flex");
      break;
    case "btnhombros":
      const hombro = (document.getElementById("hombros").style.display =
        "flex");
      break;
  }
}

function mostrarAct(boton) {
  let imagen;
  switch (boton.id) {
    case "cuello1":
      actividad = boton.id;
      dolor = "dolor" + actividad;
      imagen = document.getElementById("ejercicioID").src =
        "../images/ejercicios/cuello1.png";
      srcActual = "../images/ejercicios/cuello1.png";
      break;
    case "cuello2":
      actividad = boton.id;
      dolor = "dolor" + actividad;
      imagen = document.getElementById("ejercicioID").src =
        "../images/ejercicios/cuello2.png";
      srcActual = "../images/ejercicios/cuello2.png";
      break;
    case "cuello3":
      actividad = boton.id;
      dolor = "dolor" + actividad;
      imagen = document.getElementById("ejercicioID").src =
        "../images/ejercicios/cuello3.png";
      srcActual = "../images/ejercicios/cuello3.png";
      break;
    case "hombros1":
      actividad = boton.id;
      dolor = "dolor" + actividad;
      imagen = document.getElementById("ejercicioID").src =
        "../images/ejercicios/hombros1.png";
      srcActual = "../images/ejercicios/hombros1.png";
      break;
    case "hombros2":
      actividad = boton.id;
      dolor = "dolor" + actividad;
      imagen = document.getElementById("ejercicioID").src =
        "../images/ejercicios/hombros2.png";
      srcActual = "../images/ejercicios/hombros2.png";
      break;
    case "hombros3":
      actividad = boton.id;
      dolor = "dolor" + actividad;
      imagen = document.getElementById("ejercicioID").src =
        "../images/ejercicios/hombros3.png";
      srcActual = "../images/ejercicios/hombros3.png";
      break;
    case "hombros4":
      actividad = boton.id;
      dolor = "dolor" + actividad;
      imagen = document.getElementById("ejercicioID").src =
        "../images/ejercicios/hombros4.png";
      srcActual = "../images/ejercicios/hombros4.png";
      break;
    case "lumbar1":
      actividad = boton.id;
      dolor = "dolor" + actividad;
      imagen = document.getElementById("ejercicioID").src =
        "../images/ejercicios/lumbar1.png";
      srcActual = "../images/ejercicios/lumbar1.png";
      break;
    case "lumbar2":
      actividad = boton.id;
      dolor = "dolor" + actividad;
      imagen = document.getElementById("ejercicioID").src =
        "../images/ejercicios/lumbar2.png";
      srcActual = "../images/ejercicios/lumbar2.png";
      break;
    case "rodilla1":
      actividad = boton.id;
      dolor = "dolor" + actividad;
      imagen = document.getElementById("ejercicioID").src =
        "../images/ejercicios/rodilla1.png";
      srcActual = "../images/ejercicios/rodilla1.png";
      break;
    case "rodilla2":
      actividad = boton.id;
      dolor = "dolor" + actividad;
      imagen = document.getElementById("ejercicioID").src =
        "../images/ejercicios/rodilla2.png";
      srcActual = "../images/ejercicios/rodilla2.png";
      break;
    case "visual":
      actividad = boton.id;
      dolor = "dolor" + actividad;
      imagen = document.getElementById("ejercicioID").src =
        "../images/ejercicios/visual.png";
      srcActual = "../images/ejercicios/visual.png";
      break;
    default:
      break;
  }
  const comenzarBTN = (document.getElementById("comenzarDiv").style.display =
    "flex");
}

function comenzarAct() {
  pantallaActiva = "preparacion";
  const previaS = (document.getElementById("previa").style.display = "none");
  const conclusionS = (document.getElementById("conclusion").style.display =
    "none");
  const preparacionS = (document.getElementById("preparacion").style.display =
    "flex");

  tiempoIntro = 5;
  let imagen = (document.getElementById("ejercicioID").src =
    "../images/ejercicios/default.png");
  timer();
}

function timer() {
  let tempo;
  let relojito = document.getElementById("timer");
  if (tiempoIntro > 0) {
    relojito.innerHTML = tiempoIntro--;
    tempo = setTimeout(timer, 1000);
  } else {
    relojito.innerHTML = tiempoIntro;
    comenzarEjercicio();
    clearTimeout(tempo);
  }
}

function comenzarEjercicio() {
  pantallaActiva = "actividad";
  const preparacionS = (document.getElementById("preparacion").style.display =
    "none");
  const actividadS = (document.getElementById("actividad").style.display =
    "flex");
  const nombreEjercicio = (document.getElementById(
    "nombreEjercicio"
  ).innerHTML = actividad);
  let titulo;
  switch (actividad) {
    case "cuello1":
      titulo = document.getElementById("nombreEjercicio").innerHTML = actividad;
      break;
    case "cuello2":
      titulo = document.getElementById("nombreEjercicio").innerHTML = actividad;
      break;
    case "cuello3":
      titulo = document.getElementById("nombreEjercicio").innerHTML = actividad;
      break;
    case "hombros1":
      titulo = document.getElementById("nombreEjercicio").innerHTML = actividad;
      break;
    case "hombros2":
      titulo = document.getElementById("nombreEjercicio").innerHTML = actividad;
      break;
    case "hombros3":
      titulo = document.getElementById("nombreEjercicio").innerHTML = actividad;
      break;
    case "hombros4":
      titulo = document.getElementById("nombreEjercicio").innerHTML = actividad;
      break;
    case "lumbar1":
      titulo = document.getElementById("nombreEjercicio").innerHTML = actividad;
      break;
    case "lumbar2":
      titulo = document.getElementById("nombreEjercicio").innerHTML = actividad;
      break;
    case "rodilla1":
      titulo = document.getElementById("nombreEjercicio").innerHTML = actividad;
      break;
    case "rodilla2":
      titulo = document.getElementById("nombreEjercicio").innerHTML = actividad;
      break;
    case "visual":
      titulo = document.getElementById("nombreEjercicio").innerHTML = actividad;
      break;
    case "":
      alert("ELIGE UNA ACTIVIDAD PARA COMENZAR");
      break;
    default:
      break;
  }

  const ejercicioActual = (document.getElementById("ejercicioActual").src =
    srcActual);
  let temporizador = new TiempoEjercicio("tiempoAct", 3, -1);
  temporizador.conteoSegundos();
}

class TiempoEjercicio {
  constructor(id, inicio, final) {
    this.id = id;
    this.inicio = inicio;
    this.final = final;
    this.contador = this.inicio;

    this.conteoSegundos = function () {
      if (this.contador == this.final) {
        this.conteoSegundos = null;
        conclusionAct();
        return;
      }
      document.getElementById("tiempoAct").innerHTML = this.contador--;
      setTimeout(this.conteoSegundos.bind(this), 1000);
    };
  }
}

function conclusionAct() {
  pantallaActiva = "conclusion";
  const actividadS = (document.getElementById("actividad").style.display =
    "none");
  const grillaS = (document.getElementById("grilla").style.display = "flex");
  const conclusionS = (document.getElementById("conclusion").style.display =
    "flex");
  const botoneS = (document.getElementById("botones").style.display = "none");
}

function dolorBTN(boton) {
  switch (dolor) {
    case "dolorcuello1":
      usuario.dolorcuello1 = boton.id;
      break;
    case "dolorcuello2":
      usuario.dolorcuello2 = boton.id;
      break;
    case "dolorcuello3":
      usuario.dolorcuello3 = boton.id;
      break;
    case "dolorhombros1":
      usuario.dolorhombros1 = boton.id;
      break;
    case "dolorhombros2":
      usuario.dolorhombros2 = boton.id;
      break;
    case "dolorhombros3":
      usuario.dolorhombros3 = boton.id;
      break;
    case "dolorhombros4":
      usuario.dolorhombros4 = boton.id;
      break;
    case "dolorlumbar1":
      usuario.dolorlumbar1 = boton.id;
      break;
    case "dolorlumbar2":
      usuario.dolorlumbar2 = boton.id;
      break;
    case "dolorrodilla1":
      usuario.dolorrodilla1 = boton.id;
      break;
    case "dolorrodilla2":
      usuario.dolorrodilla2 = boton.id;
      break;
    case "dolorvisual":
      usuario.dolorvisual = boton.id;
      break;

    default:
      break;
  }
  const botoneS = (document.getElementById("botones").style.display = "flex");
  const grillaS = (document.getElementById("grilla").style.display = "none");
}

function ejercicioCompletado() {
  usuario.puntos = parseInt(usuario.puntos) + 10;
  switch (dolor) {
    case "dolorcuello1":
      usuario.cuello1 = parseInt(usuario.cuello1) + 1;
      break;
    case "dolorcuello2":
      usuario.cuello2 = parseInt(usuario.cuello2) + 1;
      break;
    case "dolorcuello3":
      usuario.cuello3 = parseInt(usuario.cuello3) + 1;
      break;
    case "dolorhombros1":
      usuario.hombros1 = parseInt(usuario.hombros1) + 1;
      break;
    case "dolorhombros2":
      usuario.hombros2 = parseInt(usuario.hombros2) + 1;
      break;
    case "dolorhombros3":
      usuario.hombros3 = parseInt(usuario.hombros3) + 1;
      break;
    case "dolorhombros4":
      usuario.hombros4 = parseInt(usuario.hombros4) + 1;
      break;
    case "dolorlumbar1":
      usuario.lumbar1 = parseInt(usuario.lumbar1) + 1;
      break;
    case "dolorlumbar2":
      usuario.lumbar2 = parseInt(usuario.lumbar2) + 1;
      break;
    case "dolorrodilla1":
      usuario.rodilla1 = parseInt(usuario.rodilla1) + 1;
      break;
    case "dolorrodilla2":
      usuario.rodilla2 = parseInt(usuario.rodilla2) + 1;
      break;
    case "dolorvisual":
      usuario.visual = parseInt(usuario.visual) + 1;
      break;

    default:
      break;
  }

  let imagen = (document.getElementById("ejercicioID").src =
    "../images/ejercicios/default.png");
  actividad = "";
  dolor = "";
  tiempoIntro = 5;
  console.log(usuario);
  for (let i = 0; i < info.length; i++) {
    if (info[i].dni == usuario.dni) {
      (info[i].puntos = usuario.puntos),
        (info[i].cuello1 = usuario.cuello1),
        (info[i].dolorcuello1 = usuario.dolorcuello1),
        (info[i].cuello2 = usuario.cuello2),
        (info[i].dolorcuello2 = usuario.dolorcuello2),
        (info[i].cuello3 = usuario.cuello3),
        (info[i].dolorcuello3 = usuario.dolorcuello3),
        (info[i].hombros1 = usuario.hombros1),
        (info[i].dolorhombros1 = usuario.dolorhombros1),
        (info[i].hombros2 = usuario.hombros2),
        (info[i].dolorhombros2 = usuario.dolorhombros2),
        (info[i].hombros3 = usuario.hombros3),
        (info[i].dolorhombros3 = usuario.dolorhombros3),
        (info[i].hombros4 = usuario.hombros4),
        (info[i].dolorhombros4 = usuario.dolorhombros4),
        (info[i].lumbar1 = usuario.lumbar1),
        (info[i].dolorlumbar1 = usuario.dolorlumbar1),
        (info[i].lumbar2 = usuario.lumbar2),
        (info[i].dolorlumbar2 = usuario.dolorlumbar2),
        (info[i].rodilla1 = usuario.rodilla1),
        (info[i].dolorrodilla1 = usuario.dolorrodilla1),
        (info[i].rodilla2 = usuario.rodilla2),
        (info[i].dolorrodilla2 = usuario.dolorrodilla2),
        (info[i].visual = usuario.visual),
        (info[i].dolorvisual = usuario.dolorvisual);
    }
  }
  infoEnJSON = JSON.stringify(info);

  localStorage.setItem("usuarios", infoEnJSON);

  const mainS = (document.getElementById("main").style.display = "flex");

  const puntosPlus = (document.getElementById("puntos").innerText =
    usuario.puntos);
  const conclusionS = (document.getElementById("conclusion").style.display =
    "none");
  pantallaActiva = "main";
}

function download() {
  const data = JSON.parse(localStorage.getItem("usuarios"));

  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += Object.keys(data[0]).join(",") + "\r\n";

  for (let index = 0; index < data.length; index++) {
    const values = Object.values(data[index]);
    const row = values.map((value) => `${value}`).join(",");
    if (index != data.length - 1) {
      csvContent += row + "\r\n";
    } else if (index == data.length - 1) {
      csvContent += row;
    }
  }

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "datos.csv");
  document.body.appendChild(link);
  link.click();
}

//--------SONIDOS------------

function sonidoTap(){
  var tap= new Audio("audio/fxTap.mp3");
  tap.play();
}

function sonidoError(){
  var error= new Audio("audio/beep-warning.mp3");
  error.play();
}

function bienvenida(){
  xaudio= document.querySelector("#saludo").play();
}

function datos(){
  var ingresa= new Audio("audio/meopper/ingresaTusDatos.mp3");
  ingresa.play();
}

function pausaActiva(){
  var pausa= new Audio("audio/meopper/pausasActivas.mp3");
  pausa.play();
}



// When the user clicks on the button, open the modal
function mostrarModal() {
var modal = document.getElementById("myModal");
  modal.style.display = "flex";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    var adentro= document.querySelector(".adentro");
  if (event.target == modal || event.target == adentro) {
    modal.style.display = "none";
    bienvenida();
    document.getElementById('ambient').play();
    
  }
}