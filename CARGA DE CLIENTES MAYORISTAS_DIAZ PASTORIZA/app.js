const LIMITE_CUENTA = 500000; 
let cuentas = []; 
let cuenta = undefined;

//Inputs
const titular = document.getElementById('titular');
const codigo = document.getElementById('codigo');
const saldo = document.getElementById('saldo');
const zona = document.getElementById('zona');

//Botón Registrar
const registrar = document.getElementById('registrar');

//Formulario
const formRegistrar = document.getElementById('form-registro');

//Botón Registrar addEventListener
registrar.addEventListener('click', (evento) => {
    evento.preventDefault(); 
    cuentas.push(new Item(titular.value, codigo.value, +saldo.value, zona.value, LIMITE_CUENTA)); 
    alert('sus datos fueron registrados con exito!');
    localStorage.setItem('cuentas',JSON.stringify(cuentas)); 
    console.log(cuentas);
    limpiarForm(formRegistrar);
});



//FUNCION para que el LocalStorage almacene los Métodos
function obtenerCuentas() {
    cuentas = JSON.parse(localStorage.getItem('cuentas')) || []; 
    cuentas = cuentas.map((cuenta) => new Item(cuenta.titular,cuenta.codigo,cuenta.saldo,cuenta.zona,LIMITE_CUENTA));
 }

/// AddEventListerer, DOMContntentLoaded
document.addEventListener('DOMContentLoaded', () => {
    obtenerCuentas();
});

//Consultar datos cliente

const inputTitular = document.getElementById('titular-consulta');
const botonConsulta = document.getElementById('consultar');

//addeventlistener para el boton consultar
botonConsulta.addEventListener('click', (evento) => {
    evento.preventDefault();
    const nombreTitular = inputTitular.value; 
    const cuentaEncontrada = buscarCuenta(nombreTitular);
    if (cuentaEncontrada) {
        titular.value = cuentaEncontrada.titular;
        codigo.value = cuentaEncontrada.codigo;
        saldo.value = cuentaEncontrada.saldo;
        zona.value = cuentaEncontrada.zona;
    } 
    else {
        alert('No existe el cliente');
        limpiarForms();
    }
});

//Function para buscar la cuenta del Cliente en el array
function buscarCuenta(nombreTitular) {
   return cuentas.find((cuenta) => cuenta.titular === nombreTitular.toLowerCase()); 
}

///obtener elementos
const inputMonto = document.getElementById('agregarPago');
const btnDepositar = document.getElementById('depositar');


//Agregar Pago
//AddEventListener Boton depositar
btnDepositar.addEventListener('click', (evento) => {
    evento.preventDefault();
    cuenta = buscarCuenta(inputTitular.value);
    if (cuenta) {
        const resultado = cuenta.depositarDinero(+inputMonto.value);
        if (resultado) {
            alert('Operacion realizada con exito, para ver tu saldo reflejado clikea en Consultar!');
        }
        else {
            alert('Operacion denegada');
        }
    }
});

//Function Limpiar Formulario
function limpiarForm(form) {
    form.reset(); 
} 
//Limpiar todos los Formularios
function limpiarForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach((form) => {
        form.reset(); ///reseteo el formulario
    });
}

