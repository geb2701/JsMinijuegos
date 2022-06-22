var numeroGuardado=0;
var numeroPedido=0;
var auxiliar=0;
var noIfnormar=0;
var stringAccion;


Comenzar();


function Comenzar(){
    alert("Calculadora Basica con JS");
    solicitarPrimerNumero();
    InformarPantalla();
}

function accion(accion){

    accion = parseInt(accion);
    
    if (accion==1){
        solicitarNumero();
        numeroGuardado += numeroPedido;
    }
    else if (accion==2){
        solicitarNumero();
        numeroGuardado -= numeroPedido;
    }
    else if (accion==3){
        solicitarNumero();
        numeroGuardado = numeroPedido * numeroGuardado;
    }
    else if (accion==4){
        solicitarNumero();
        numeroGuardado =numeroGuardado/ numeroPedido ;
    }
    else if (accion==5){
        solicitarNumero();
        auxiliar=numeroGuardado
        for (var i=0; i<numeroPedido; i++){
            numeroGuardado = numeroGuardado*auxiliar
        }
        auxiliar=0
    }
    else if (accion==6){
        solicitarNumero();
        auxiliar=numeroGuardado
        for (var i=0; i<numeroPedido; i++){
            numeroGuardado = numeroGuardado*auxiliar
        }
        auxiliar=0
    }
    else{
        alert("Accion Ingresa Incorrecta Ingrese Nuevamente");
        noIfnormar=1;
    }
    Resultado()
}

function Resultado(){
    if(noIfnormar!=0){
        alert("Accion Ingresa Incorrecta Ingrese Nuevamente");
    }
    else{
        alert("Su numero es:" + numeroGuardado);
    }
    InformarPantalla()
}
function InformarPantalla(){
    document.getElementById("numero").textContent="Su Numero es:"+ numeroGuardado;
}

function solicitarNumero(){
    if (accion==1){
        stringAccion= (numeroGuardado + "+ X"); 
    }
    if (accion==2){
        stringAccion= (numeroGuardado + "- X"); 
    }
    if (accion==3){
        stringAccion= (numeroGuardado + "* X"); 
    }
    if (accion==4){
        stringAccion= (numeroGuardado + "/ X"); 
    }
    if (accion==5){
        stringAccion= (numeroGuardado + "multiplicado X cantidad de veces"); 
    }
    if (accion==6){
        stringAccion= (numeroGuardado + "dividido X cantidad de veces"); 
    }
    numeroPedido = parseInt(prompt("Numero Actual:" + numeroGuardado + "\n Ingrese su numero","0"));
    
}
function solicitarPrimerNumero(){
    numeroGuardado = parseInt(prompt("Ingrese su numero inicial","0"));
    
}