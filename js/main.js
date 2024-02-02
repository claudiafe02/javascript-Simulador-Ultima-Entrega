localStorage.clear();
// Extrae el año, mes y día de la fecha actual y lo transforma en string
const ANIOHOY =new Date().getFullYear().toString();
const MESHOY = new Date().getMonth()+1;
const MESSHOY = MESHOY.toString();
const DIAHOY = new Date().getDate().toString();

// Fecha actual para cálculo
const FECHAHOY1 = new Date(ANIOHOY+"-"+MESSHOY+"-"+DIAHOY).getTime();

const tiposPF = [{ item: 1, nombre: "$-Regulado por BCRA", valortasa: 110 },
{ item: 2, nombre: "$-Tradicional clientes", valortasa: 110 },
{ item: 3, nombre: "U$$-Tradicional clientes", valortasa: 0.10 }];


// Función que calcula los días de plazo desde la Fecha actual Hasta la Fecha de vencimiento ingresada por el usuario 

const diasPlazo = (fV,fH) => parseInt((fV - fH)/(1000*60*60*24))+ 1;
 
//Función que calcula los intereses con los días de plazo y la tasa
const intereses = (dias,tasa) => dias * (tasa/100)/365;

//Constructor para los datos simulados
class datosSimuladosPF {
    constructor (importe,cantDias,nombre,tasa,intereses){
        this.importe = importe;
        this.cantDias = cantDias;
        this.nombre = nombre;
        this.tasa = tasa;
        this.intereses = intereses;
    }
}
//Clase con constructor para los datos ingresados en pantalla
class datosFormularioPF {
    constructor (importe,dd,mm,aa,opcion){
        this.importe = importe;
        this.dd = dd;
        this.mm = mm;
        this.aa = aa;
        this.opcion = opcion;
     }
    //Función para determinar la fecha para cálculo 
    fechaVencimientoCalculo () {
        return new Date(this.aa+"-"+this.mm+"-"+this.dd).getTime();
    };
    //Función para extraer la tasa de acuerdo a la opción elegida
    extraerTasa () {
        for ( const tipoPF of tiposPF ){
            if (tipoPF.item == this.opcion){
                tasa = tipoPF.valortasa;
                nombre = tipoPF.nombre;
                break;
            }
        }    
    };
    // Controla los datos ingresados al formulario
    verificarDatos(){
        datoIncorrecto = false;
        if ( isNaN(this.importe) || this.importe <= "0" ){
            datoIncorrecto = true;
        }
        if ( isNaN(this.dd) || this.dd <= "0" || this.dd >= "32" || (this.dd.length > 2) ){
            datoIncorrecto = true;
        }
        if ( isNaN(this.mm) || this.mm <= "0" || this.mm >= "13" || (this.mm.length > 2) ){
            datoIncorrecto = true;
        }
        if ( isNaN(this.aa) || this.aa <= "0" || (this.aa.length > 4) || this.aa < ANIOHOY ){
            datoIncorrecto = true;
        } 
    }    
}
// --------------------------------------------
// Contenedor principal
let container = document.createElement("div");
document.body.append(container);
container.classList.add("container");

let containerHeader = document.createElement("div");
containerHeader.classList.add("header");
containerHeader.innerHTML = "<h1>Simulador plazo fijo</h1>";
container.append(containerHeader);

let containerMain = document.createElement("div")
containerMain.classList.add("main");
container.append(containerMain);

let containerForm = document.createElement("div")
containerForm.classList.add("containerForm");
containerMain.append(containerForm);

// Formulario
let formularioPF = document.createElement("form")
formularioPF.classList.add("formPF");
formularioPF.setAttribute('id',"formulario");
formularioPF.innerHTML = "<h3>Tipo de plazo fijo</h3>";
containerForm.append(formularioPF);

let menuplazofijo = document.createElement("select");
menuplazofijo.classList.add("menu");
menuplazofijo.setAttribute('id',"pfselect");
for (const tipoPF of tiposPF) {
     menuplazofijo.innerHTML += `<option value=${tipoPF.item}> ${tipoPF.nombre}</option>`
};
formularioPF.append(menuplazofijo);

formularioPF.innerHTML += "<h3>Importe</h3>";

let importeplazofijo = document.createElement("input");
importeplazofijo.classList.add("importe")
importeplazofijo.setAttribute('type',"text");
importeplazofijo.setAttribute('value',"");
importeplazofijo.setAttribute('id',"importePF");
importeplazofijo.setAttribute('style',"importe"); 
formularioPF.append(importeplazofijo);

formularioPF.innerHTML += "<h3>Fecha Vencimiento</h3>";
// Día
let fechaDia = document.createElement("input");
fechaDia.classList.add("fecha");
fechaDia.setAttribute('type',"text");
fechaDia.setAttribute('value',"");
fechaDia.setAttribute('id',"dia");
fechaDia.setAttribute('placeholder',"dd");
fechaDia.setAttribute('style',"fecha")
formularioPF.append(fechaDia);
//Mes
let fechaMes = document.createElement("input");
fechaMes.classList.add("fecha");
fechaMes.setAttribute('type',"text");
fechaMes.setAttribute('value',"");
fechaMes.setAttribute('id',"mes");
fechaMes.setAttribute('placeholder',"mm");
fechaMes.setAttribute('style',"fecha");
formularioPF.append(fechaMes);
//Año
let fechaAnio = document.createElement("input");
fechaAnio.classList.add("fecha");
fechaAnio.setAttribute('type',"text");
fechaAnio.setAttribute('value',"");
fechaAnio.setAttribute('id',"anio");
fechaAnio.setAttribute('placeholder',"aaaa");
fechaAnio.setAttribute('style',"fecha");
formularioPF.append(fechaAnio);

let botonSimular = document.createElement("button");
botonSimular.classList.add("boton");
botonSimular.innerHTML = "Simular";
botonSimular.setAttribute('type',"submit");
botonSimular.setAttribute('id',"simular");
botonSimular.setAttribute('style',"boton");
formularioPF.append(botonSimular);

let containerSimul = document.createElement("div");
containerSimul.classList.add("containerSimul");
containerMain.append(containerSimul);

let containerVer = document.createElement("div");
containerVer.classList.add("containerVer");
containerVer.setAttribute('id',"containerBotones");
containerSimul.append(containerVer);

let simulacionesAnt = document.createElement("div");
simulacionesAnt.classList.add("registros");
simulacionesAnt.setAttribute('id',"registros");
containerSimul.append(simulacionesAnt);

let botonVerSA = document.createElement("button");
botonVerSA.classList.add("verSA");
botonVerSA.innerHTML = "Simulaciones anteriores";
botonVerSA.setAttribute('id',"verSimulAnt");
botonVerSA.setAttribute('style',"boton");
containerVer.append(botonVerSA);

let botonVerTasas = document.createElement("button");
botonVerTasas.classList.add("verT");
botonVerTasas.innerHTML = "Tasas";
botonVerTasas.setAttribute('id',"verTasas");
botonVerTasas.setAttribute('style',"boton");
containerVer.append(botonVerTasas);

let tasa,nombre,datoIncorrecto,interesPorTipoPF;
let simulaciones = [];

//Si hay contenido en el LocalStorage con la clave "simulaciones" lo guardo en "simulacion" para luego agregarlo al array simulaciones[].
if (localStorage.getItem('simulaciones')) {
    let simulacion = JSON.parse(localStorage.getItem('simulaciones'));
    /* guardo los elementos de "simulacion" en simulaciones[] con push */
    for (let i = 0; i < simulacion.length; i++) {
      simulaciones.push(simulacion[i]);
    }
}

document.addEventListener("DOMContentLoaded", function(e) {

    function limpiarInputs () {
        document.getElementById("importePF").value = "";
        document.getElementById("dia").value = "";
        document.getElementById("mes").value = "";
        document.getElementById("anio").value = "";
    }    

    //Simulación con los datos ingresados
    function submit (e){
        e.preventDefault();

        document.getElementById('registros').value =''
        // Datos ingresados en los inputs
        let opcionElegida = document.querySelector("#pfselect").value;
        let importeIngresado = document.querySelector("#importePF").value.trim();
        let dia = document.querySelector("#dia").value.trim();
        let mes = document.querySelector("#mes").value.trim();
        let anio = document.querySelector("#anio").value.trim();

        const datosFormularioPF1 = new datosFormularioPF(importeIngresado,dia,mes,anio,opcionElegida);

        datosFormularioPF1.verificarDatos();

        if (datoIncorrecto) { 
            Swal.fire({
                title: 'Datos ingresados NO son correctos!',
                text: 'Volvé a ingresarlos',
                icon: 'warning',
                width: 350,
                background: 'rgba(43, 113, 226, 0.967)',
                position: 'bottom-start',
                showConfirmButton: false,
                timer: 2500
            });
            limpiarInputs();      
            return ;
        }
        datosFormularioPF1.extraerTasa();
        interesPorTipoPF = ((intereses(diasPlazo(datosFormularioPF1.fechaVencimientoCalculo(),FECHAHOY1),tasa) * parseFloat(datosFormularioPF1.importe))).toFixed(2);

        const registros = document.getElementById('registros');
            
        registros.innerHTML = `<h4>La tasa del plazo fijo actual es: ${tasa} %<br><br>Los días de plazo, según la fecha ingresada son: ${diasPlazo(datosFormularioPF1.fechaVencimientoCalculo(),FECHAHOY1)}<br><br>Intereses: $ ${interesPorTipoPF}</h4>`
    
        const datosSimuladosPF1 = new datosSimuladosPF(importeIngresado,diasPlazo(datosFormularioPF1.fechaVencimientoCalculo(),
        FECHAHOY1),nombre,tasa,interesPorTipoPF);

        simulaciones.push(datosSimuladosPF1);
        localStorage.setItem('simulaciones',JSON.stringify(simulaciones));
        limpiarInputs();
    }

    const simular = document.getElementById('simular');
    simular.addEventListener("click", submit);

    // Muestra simulaciones Anteriores
    function mostrarRegistros () {
        e.preventDefault();
        if (simulaciones.length !== 0){              
            registros.innerHTML ="<h4>Simulaciones Anteriores</h4>"
            simulaciones.forEach((simulacion) => {
                const registro = document.createElement("div");
                registro.innerHTML = `<p>[ Importe: ${simulacion.importe} - Días de plazo: ${simulacion.cantDias} - 
                Nombre: ${simulacion.nombre} - Tasa: ${simulacion.tasa} - Intereses: ${simulacion.intereses} ]</p>`;
                registros.appendChild(registro);
            })
        }else{
            Swal.fire({
                title: 'NO existen simulaciones anteriores',
                icon: 'info',
                width: 350,
                background: 'rgba(43, 113, 226, 0.967)',
                position: 'bottom-start',
                showConfirmButton: false,
                timer: 2500
            })
        }
    }
    

    const registros = document.getElementById('registros');

    const verS = document.getElementById('verSimulAnt');
    verS.addEventListener("click", mostrarRegistros);

    //Muestra json Tasas

    const verT = document.getElementById('verTasas');
    verT.addEventListener("click", async()=>{  
        try{
            const response = await fetch('./json/tasas.json');
            const tasas = await response.json();

            const registrosTasas = document.getElementById('registros');

            registrosTasas.innerHTML =  "<h2>Tasas vigentes:</h2>";
            tasas.forEach((tasa) => {
                const registroTasa = document.createElement("div");
                // Encabezado de los tres tipos de tasa
                if ( tasa.id == 1 || tasa.id == 9 || tasa.id == 17){ 
                    const registroTasaEnc = document.createElement ("div");
                    registroTasaEnc.innerHTML = `<h4>${tasa.nombre}</h4><br>
                    <p>Plazos(en días)</p>`
                    registrosTasas.appendChild(registroTasaEnc);
                    registroTasa.innerHTML = `<p>${tasa.descripcion}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${tasa.tasa}</p>`;
                    registrosTasas.appendChild(registroTasa);
                }else {
                    registroTasa.innerHTML = `<p>${tasa.descripcion}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    ${tasa.tasa}</p>`;
                    registrosTasas.appendChild(registroTasa);
                }
            });
        }catch(error){
        console.error('error al cargar las tasas',error)
        }
    })    
});



