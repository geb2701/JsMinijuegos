//funcion ramdom con minimo maximo
function getRandomArbitrary(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

let casillas  = new Array;
let casillasLibres=[0,0]
let casillaBandera = new Array;
let casillaBomba = new Array;
let Ccolumnas 
let Cfilas
let Cminas

//funcion para crear nueva partida si se pulsa repetir juego
window.onload = RecargarNuevaPartida()
function RecargarNuevaPartida(){
    Ccolumnas = sessionStorage.getItem("Ccolumnas")
    Cfilas = sessionStorage.getItem("Cfilas")
    Cminas = sessionStorage.getItem("Cminas")

    sessionStorage.setItem("Cfilas", 0)
    sessionStorage.setItem("Cminas", 0)
    sessionStorage.setItem("Ccolumnas", 0)

    //Guardo variables de la ultima partida
    sessionStorage.setItem("UltCfilas", Ccolumnas)
    sessionStorage.setItem("UltCminas", Cfilas)
    sessionStorage.setItem("UltCcolumnas", Cminas)

    if ((Ccolumnas>0) && (Cfilas>0) && (Cminas>0)){
        document.getElementById("TablaEntrada").setAttribute("hidden",true)
        genera_tablaBM(Cfilas,Ccolumnas,Cminas)
    }
}

//funcion recuperar Variables de html
function RecuperarMinas(){
    Ccolumnas = document.getElementById("Ccolumnas").value
    Cfilas = document.getElementById("Cfilas").value
    Cminas = document.getElementById("Cminas").value
    if ((Ccolumnas<=0) || (Cfilas<=0) || (Cminas<=0)){
        Swal.fire(
            'No se puede Generar esta Partida',
            'Ningun Valor puede ser 0 o menor',
            'question'
        )
    }
    else if(Cminas >= Ccolumnas * Cfilas){
        Swal.fire(
            'No se puede Generar esta partida',
            'Tienen que haber menos Minas que Casillas',
            'question'
        )
    }
    else{
        genera_tablaBM(Cfilas,Ccolumnas,Cminas)
    }
}

//funcion generar buscaminas
function genera_tablaBM(cantidadFilas, cantidadColumnas, cantidadMinas) {
    document.getElementById("TablaEntrada").setAttribute("hidden",true)
    // seteo variables
    let contenido = document.getElementById("content");
    let tabla   = document.createElement("table");
    let tblBody = document.createElement("tbody");
    document.getElementById("cajaBandera").removeAttribute("hidden")
    //clase a la tabla
    tabla.setAttribute("class", "tableBM");
    
    //genero casillas
    for (let i = 0; i < cantidadFilas * cantidadColumnas; i++){
        casillas[i]="vacio";
    }
    casillasLibres[0]=casillas.length-cantidadMinas

    if (casillas.length > cantidadMinas){
        //random minas
        for (let i = 0, ramdom=0; i < cantidadMinas; i++){
            ramdom=getRandomArbitrary(0,casillas.length-1)
            if (casillas[ramdom] == "bomba"){
                i--
            }
            else{
                casillas[ramdom]="bomba";
                casillaBomba.push(ramdom)
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
            //crear columna
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
    let total
    //variables para saber en que pocicion me encentro parado en la tabla
    let columna=1
    let fila=1

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

            casillas[i]=total
        }
        //avanzo una posicion en la tabla
        columna++
        if (columna > cantidadColumnas){
            fila++
            columna=1
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
    if (bandera==1){
        cambiarBandera(id)
    }
    else if (bandera==0){
        if (document.getElementById("casilla"+id).innerHTML==''){
            revelar(id)
        }
    }
    
}

//funcion para borrar y poner banderas
function cambiarBandera(id){
    let ubicacion = document.getElementById("casilla"+id)
    if (ubicacion.innerHTML=='🚩'){
        ubicacion.innerHTML=''
        let posicionArray = casillaBandera.indexOf(id)
        casillaBandera.splice(posicionArray)
    } 
    else {
        ubicacion.innerHTML='🚩'
        casillaBandera.push(id)
        casillaBandera.sort();
    }
    audio("audioBandera")
    if (casillaBandera.length==casillaBomba.length){
        let verificar=0
        for (i = 0; i < casillaBandera.length; i++){
            if(casillaBandera[i]!=casillaBomba[i]){
                verificar=1
                i=casillaBandera.length;
            }
        }
        if (verificar==0){
            finDePartirda("victoria")
        }
        
    }
}


//funcion para revelar casiila
function revelar(id){
    let casilla = casillas[id]
    let ubicacion = document.getElementById("casilla"+id)
    if (casilla == "bomba"){
        ubicacion.innerHTML='💣';
        audio("audioBomba")
        finDePartirda("derrota")
    }
    else{
        ubicacion.innerHTML= casilla
        casillasLibres[1]++
        audio("audioClick")
        if (casillasLibres[0]<=casillasLibres[1]){
            finDePartirda("victoria")
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
function finDePartirda(tipo, ubicacion){
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

        Swal.fire({
            title: 'Has Perdido',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Volver a Jugar',
            denyButtonText: `Nueva Partida`,
            cancelButtonText: `Ver Mapa`,
        }).then((result) => {
            if (result.isConfirmed) {
                //compruebo uno pq no puede seguir el sistema con un valor erroneo
                if (document.getElementById("Ccolumnas").value == 0){
                    sessionStorage.setItem("Ccolumnas", sessionStorage.getItem("UltCfilas", Ccolumnas))
                    sessionStorage.setItem("Cfilas", sessionStorage.getItem("UltCminas", Cfilas))
                    sessionStorage.setItem("Cminas", sessionStorage.getItem("UltCcolumnas", Cminas))
                    window.location.reload()
                }
                else {
                    Cfilas = document.getElementById("Cfilas").value
                    Cminas = document.getElementById("Cminas").value
                    Ccolumnas = document.getElementById("Ccolumnas").value
                }
                sessionStorage.setItem("Ccolumnas", Ccolumnas)
                sessionStorage.setItem("Cfilas", Cfilas)
                sessionStorage.setItem("Cminas", Cminas)
                window.location.reload()
                
            } else if (result.isDenied) {
                window.location.reload()
            }
        })
    }
    else if (tipo=="victoria"){
        audio("audioVictoria")
        Swal.fire({
            title: 'Has Ganado',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Volver a Jugar',
            denyButtonText: `Nueva Partida`,
            cancelButtonText: `Ver Mapa`,
        }).then((result) => {
            if (result.isConfirmed) {
                //compruebo uno pq no puede seguir el sistema con un valor erroneo
                if (document.getElementById("Ccolumnas").value == 0){
                    sessionStorage.setItem("Ccolumnas", sessionStorage.getItem("UltCfilas", Ccolumnas))
                    sessionStorage.setItem("Cfilas", sessionStorage.getItem("UltCminas", Cfilas))
                    sessionStorage.setItem("Cminas", sessionStorage.getItem("UltCcolumnas", Cminas))
                    window.location.reload()
                }
                else {
                    Cfilas = document.getElementById("Cfilas").value
                    Cminas = document.getElementById("Cminas").value
                    Ccolumnas = document.getElementById("Ccolumnas").value
                }
                sessionStorage.setItem("Ccolumnas", Ccolumnas)
                sessionStorage.setItem("Cfilas", Cfilas)
                sessionStorage.setItem("Cminas", Cminas)
                window.location.reload()
                
            } else if (result.isDenied) {
                window.location.reload()
            }
        })
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

fetch('../Js/partidas.json')
.then((response) => response.json())
.then((data) => {
    const ubicacion = document.getElementById("partidasPrearmadas")
    data.forEach(valor => {
        
        let td = document.createElement("td");
        let boton = document.createElement("buttom");
        
        boton.setAttribute("type","button");
        
        boton.setAttribute("onclick","genera_tablaBM(" + `${valor.filas}` + "," + `${valor.columnas}` + "," + `${valor.minas}` + ")");
        boton.innerHTML = `${valor.dificultad}`;
        td.appendChild(boton);
        ubicacion.appendChild(td);
    });
})