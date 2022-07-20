//funcion ramdom con minimo maximo
function getRandomArbitrary(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

//funcion recuperar Variables de html
function RecuperarMinas(){
    let Ccolumna = document.getElementById("Ccolumnas").value;
    let Cfilas = document.getElementById("Cfilas").value;
    let Cminas = document.getElementById("Cminas").value;
    
    if ((Ccolumna<=0) || (Cfilas<=0) || (Cminas<=0)){
        alert("Ningun Valor puede ser 0 o menor");
    }
    else if(Cminas >= Ccolumna * Cfilas){
        alert("No pueden haber mas minas que casillas");
    }
    else{
        document.getElementById("TablaEntrada").setAttribute("hidden",true);
        genera_tablaBM(Cfilas,Ccolumna,Cminas);
    }
    
}
let casillas  = new Array;
let casillasLibres=[0,0];
let casillaBandera = new Array;
let casillaBomba = new Array;

//funcion generar buscaminas
function genera_tablaBM(cantidadFilas, cantidadColumnas, cantidadMinas) {
    // seteo variables
    let contenido = document.getElementById("content");
    let tabla   = document.createElement("table");
    let tblBody = document.createElement("tbody");
    document.getElementById("cajaBandera").removeAttribute("hidden");
    //clase a la tabla
    tabla.setAttribute("class", "tableBM");
    
    //genero casillas
    for (let i = 0; i < cantidadFilas * cantidadColumnas; i++){
        casillas[i]="vacio";
    }
    casillasLibres[0]=casillas.length-cantidadMinas;

    if (casillas.length >= cantidadMinas){
        //random minas
        for (let i = 0, ramdom=0; i < cantidadMinas; i++){
            ramdom=getRandomArbitrary(0,casillas.length-1);
            if (casillas[ramdom] == "bomba"){
                i--;
            }
            else{
                casillas[ramdom]="bomba";
                casillaBomba.push(ramdom);
            }
            
        }
        casillaBomba.sort();
    }
    // evitar for infinito
    else{
        alert("Partida Imposible")
    }
 
    //funcion para saber cantidad de bombas al aldo de cada casilla
    numerosCasillas(cantidadFilas, cantidadColumnas)

    //añadir filas y columnas
    for (let i = 0; i < cantidadFilas; i++) {
        //crear fila
        let fila = document.createElement("tr");
        for (let j = 0; j < cantidadColumnas; j++) {
            //crear columnas
            let celda = document.createElement("td");
            let botonCelda = document.createElement("a");
            let contenidoCelda = document.createElement("div");

            //estilo temporal para programar
            /*if (casillas[i*cantidadColumnas+j]=="bomba"){
                //botonCelda.setAttribute("href", 'javascript:alert("Bomba")');
                contenidoCelda.setAttribute("class", "BombaBM");
            }
            else{
                //botonCelda.setAttribute("href", 'javascript:alert("'+ casillas[i*cantidadColumnas+j] +'")');
                contenidoCelda.setAttribute("class", "casillaBM");
            }*/

            contenidoCelda.setAttribute("class", "casillaBM");

            //asignar los objetos
            botonCelda.setAttribute("class", "casillaA");
            botonCelda.setAttribute("onclick", 'javascript:pulsar(' + (i*cantidadColumnas+j) + ')');
            contenidoCelda.setAttribute("id", "casilla"+(i*cantidadColumnas+j));
            botonCelda.appendChild(contenidoCelda);
            celda.appendChild(botonCelda);
            fila.appendChild(celda);
        }
        //asignar los objetos
        tblBody.appendChild(fila);
    }
    //asignar los objetos
    tabla.appendChild(tblBody);
    contenido.appendChild(tabla);
    //ayuda()
}

//funcion para saber cuantas bombas hay al rededor de cada casilla
function numerosCasillas(cantidadFilas, cantidadColumnas) {
    //total de bombas en la casilla a analizar
    let total;
    //variables para saber en que pocicion me encentro parado en la tabla
    let columna=1;
    let fila=1;

    for (let i=0; i < casillas.length; i++) {
        total=0;
        if (casillas[i]=="vacio"){
            // Vemos si hay bomba en la casilla anterior
            if ((casillas[i-1]=="bomba") && (columna!=1))total++;
            
            // Vemos si hay bomba en la casilla siguiente
            if (casillas[i+1]=="bomba" && (columna < cantidadColumnas))total++;

            // Vemos si hay bomba en la casilla superior
            if ((casillas[i-cantidadFilas]=="bomba")  && (fila!=1)) total++;

            // Vemos si hay bomba en la casilla siguiente de la fila anterior
            if ((casillas[(i-cantidadFilas) +1]=="bomba") && (fila!=1) && (columna < cantidadColumnas)) total++;

            // Vemos si hay bomba en la casilla anterior de la fila anterior
            if ((casillas[(i-cantidadFilas)-1]=="bomba") && (fila!=1) && (columna!=1)) total++;

            // Vemos si hay bomba en la casilla inferior
            if ((casillas[parseInt(i)+parseInt(cantidadFilas)]=="bomba") && (fila < cantidadFilas)) total++;

            // Vemos si hay bomba en la casilla siguiente de la fila siguiente
            if ((casillas[parseInt(i) + parseInt(cantidadFilas) +1]=="bomba") && (fila < cantidadFilas) && (columna < cantidadColumnas)) total++;
            
            // Vemos si hay bomba en la casilla anterior de la fila siguiente
            if ((casillas[parseInt(i)+parseInt(cantidadFilas)-1]=="bomba") && (fila < cantidadFilas) && (columna!=1)) total++;

            casillas[i]=total;
        }
        //avanzo una posicion en la tabla
        columna++
        if (columna > cantidadColumnas){
            fila++;
            columna=1;
        } 
    }
}

//funcion para dar una ayuda al jugador
function ayuda(){
    let ayuda  = new Array;
    for (let i=1; i < 9; i++){
        ayuda[0]=casillas.filter(element => element == i);
        ayuda[i]=ayuda[0].length;
        if(ayuda[i]!=0){
            console.log("Hay " + ayuda[i] + " casillas con "  + i + " bombas a su alrededor");
        }
    }
}

//funcion para eleguir que hacer dependiendo el modo (bandera o no)
function pulsar(id){
    let ubicacion = document.getElementById("casilla"+id);
    if (bandera==1){
        cambiarBandera(ubicacion);
    }
    else if (bandera==0){
        if (document.getElementById("casilla"+id).innerHTML==''){
            revelar(id);
        }
    }
    
}

//funcion para borrar y poner banderas
function cambiarBandera(ubicacion){
    if (ubicacion.innerHTML=='🚩'){
        ubicacion.innerHTML='';
        let posicionArray = casillaBandera.indexOf(id);
        casillaBandera.splice(posicionArray);
        casillaBandera.sort();
    } 
    else {
        ubicacion.innerHTML='🚩'
        casillaBandera.push(id);
        casillaBandera.sort();
    }
    audio("audioBandera")
    if (casillaBandera.length==casillaBomba.length){
        let verificar=0
        for (i = 0; i < casillaBandera.length; i++){
            if(casillaBandera[i]!=casillaBomba[i]){
                verificar=1;
                i=casillaBandera.length;
            }
        }
        if (verificar==0){
            finDePartirda("victoria");
        }
    }
}

//funcion para revelar casiila
function revelar(id){
    let casilla = casillas[id]
    let ubicacion = document.getElementById("casilla"+id);
    if (casilla == "bomba"){
        ubicacion.innerHTML='💣';
        audio("audioBomba");
        finDePartirda("derrota");
    }
    else{
        ubicacion.innerHTML= casilla;
        casillasLibres[1]++;
        audio("audioClick");
        if (casillasLibres[0]<=casillasLibres[1]){
            finDePartirda("victoria");
        }
    }
}

//funcion para cambiar el modo para insertar o no las banderas
var bandera = 0;
function modoBandera(){
    audio("audioBCambio")
    let elemento = document.getElementById("cajaBandera")
    if(bandera==0){
        elemento.removeAttribute("class")
        elemento.setAttribute("class", "cajaBanderaSeleccionada");
        bandera=1
    }
    else if (bandera==1){
        elemento.removeAttribute("class")
        elemento.setAttribute("class", "cajaBandera");
        bandera=0
    }
}

//funcion para terminar la partida
function finDePartirda(tipo){
    var casillasA = document.getElementsByClassName("casillaA")
    for (let i = 0; i < casillas.length; i++){
        casillasA[i].removeAttribute("onclick")
    }
    //esto es temporal
    if(tipo=="derrota"){
        for (let i = 0; i < casillas.length; i++){
            if (casillas[i] == "bomba"){
                document.getElementById("casilla"+i).innerHTML='💣';
            }
        }
        alert("has perdido")
        //window.location.reload()
    }
    else if (tipo=="victoria"){
        audio("audioVictoria")
        alert("has ganado")
        for (let i = 0; i < casillas.length; i++){
            if (casillas[i] == "bomba"){
                document.getElementById("casilla"+i).innerHTML='🚩';
            }
        }
    }
}

//funcion reproducir sonido
function audio(id){
    sonido =  document.getElementById(id);
    if (sonido.paused) {
        sonido.play();
    }else{
        sonido.currentTime = 0
    }
}