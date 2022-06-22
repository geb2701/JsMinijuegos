var numeroGuardado=0;
var numeroPedido=0;
var auxiliar=0;
var noIfnormar=0;
var stringAccion;


//Comenzar();


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


function genera_tablaBM(cantidadFilas, cantidadColumnas, cantidadMinas) {

    var body = document.getElementById("content");
    var tabla   = document.createElement("table");
    var tblBody = document.createElement("tbody");
    var auxiliar=0;

    tabla.setAttribute("class", "tableBM");
    
    var minas = new Array;
    for (var i = 0; i < cantidadMinas; i++){
        minas[i]=new Array (Math.floor(getRandomArbitrary(0,cantidadFilas)), Math.floor(getRandomArbitrary(0,cantidadColumnas)));
    }

    //borrar
    console.log(minas)
    var minasAxuliar


    for (var i = 0; i < cantidadFilas; i++) {
        var fila = document.createElement("tr");

        for (var j = 0; j < cantidadColumnas; j++) {
            for (var x = 0; x < minas.length; x++){
                minasAxuliar= minas[x]
                if ((i==minasAxuliar[0]) && (j==minasAxuliar[1])){
                    auxiliar=1;
                }
            }
            var celda = document.createElement("td");
            var botonCelda = document.createElement("a");
            var contenidoCelda = document.createElement("div");
            
            if (auxiliar==1){
                botonCelda.setAttribute("href", 'javascript:alert("Bomba")');
                contenidoCelda.setAttribute("class", "BombaBM");
                auxiliar=0;
            }
            else{
                botonCelda.setAttribute("href", 'javascript:alert("Libre")');
                contenidoCelda.setAttribute("class", "casillaBM");
            }
            



            botonCelda.appendChild(contenidoCelda);
            celda.appendChild(botonCelda);
            fila.appendChild(celda);
        }

        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(fila);
    }
  
    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tabla);
    // modifica el atributo "border" de la tabla y lo fija a "2";
    tabla.setAttribute("border", "2");
  }

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }