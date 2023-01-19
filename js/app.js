//Variables
const textarea = document.querySelector('.textarea-mensaje');
const encriptarBtn = document.querySelector('#encriptar');
const desencriptarBtn = document.querySelector('#desencriptar');
const copiarBtn = document.querySelector('#copiar');
const form = document.querySelector('#form');

//Valida acentos y mayusculas
const validarTexto = /^[a-z-ñ,.!¿?¡\u0300-\u036f\s]+$/;


//Addeventlisteners
addEventListeners();
function addEventListeners() {
    textarea.addEventListener('input', validarTextarea)
    encriptarBtn.addEventListener('click', validarInformacion);
    desencriptarBtn.addEventListener('click', validarInformacion);
    copiarBtn.addEventListener('click', copiarTexto);
}

//Funciones

function validarTextarea(e) {
    //Habilita o deshabilita los botones si no encuentra texto
    if(e.target.value) {
        encriptarBtn.classList.remove('boton-desactivado');
        desencriptarBtn.classList.remove('boton-desactivado');

        encriptarBtn.disabled = false;
        desencriptarBtn.disabled = false;
    } else {
        encriptarBtn.classList.add('boton-desactivado');
        desencriptarBtn.classList.add('boton-desactivado');

        encriptarBtn.disabled = true;
        desencriptarBtn.disabled = true;
    }

}
function validarInformacion(e) {
    e.preventDefault();
    const texto = textarea.value;
    //Valida las mayusculas y acentos del texto
    if(validarTexto.test(texto)) {
        if(e.target.id === 'encriptar') {
            encriptarTexto(texto);
        } else {
            desencriptarTexto(texto);
        }
    } else {
        mostrarMensaje('El texto solo puede ir en minúscula y sin acentos', 'error')
    }
}

//Funciones para encriptar y desencriptar texto
function encriptarTexto(mensaje) {
    const encriptado = mensaje.split('e').join('enter').split('i').join('imes').split('a').join('ai').split('o').join('ober').split('u').join('ufat');
    mostrarTexto(encriptado);
}
function desencriptarTexto(mensaje) {
    const desencriptado = mensaje.split('enter').join('e').split('imes').join('i').split('ai').join('a').split('ober').join('o').split('ufat').join('u');
    mostrarTexto(desencriptado);
}
//Muestra el texto encriptado en el HTML
function mostrarTexto(mensaje) {
    //Elimina la imagen y el texto de ningun mensaje fue encontrado
    const sinInformacion = document.querySelector('.sin-informacion');
    
   if(sinInformacion) {
        sinInformacion.remove();
   }
    
   //Ajusta el texto arriba a la izquierda
   const leftText = document.querySelector('.area-informacion');
   leftText.classList.remove('flex-center');
   leftText.classList.add('flex-start');

   //cambia la visibilidad del parrafo donde va el texto
   document.querySelector('.mensaje-final').style.display = 'block';

   //Muestra el boton copiar en el html
   copiarBtn.style.display = 'block';

    //Muestra el texto encriptado en el HTML
    document.querySelector('.mensaje-resultado').textContent = mensaje;
    
}


function mostrarMensaje(mensaje, error) {
    //Crea el div para mostrar el mensaje
    const divMensaje = document.createElement('DIV');
    divMensaje.textContent = mensaje;
    divMensaje.classList.add('mensaje')
    
    if(error === 'error') {
        divMensaje.classList.add('error');
    } else {
        divMensaje.classList.add('success');
    }

    //Inserta el mensaje en el HTML
    document.querySelector('.main-derecha').insertBefore(divMensaje, form);

    //Despues de 3 segundos se quita
    setTimeout(()=> {
        divMensaje.remove();
    }, 3000)

}

function copiarTexto() {
    //Selecciona el contenido a copiar
    const textoCopiado = document.querySelector('.mensaje-resultado').textContent;
    //Copia el texto al portapapeles
    navigator.clipboard.writeText(textoCopiado);
    //Imprime un mensaje
    mostrarMensaje('Texto copiado correctamente');
}