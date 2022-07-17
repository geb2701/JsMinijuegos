//funcion ramdom con minimo maximo
function getRandomArbitrary(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

//funcion recuperar Variables de html
function RecuperarMinas(){
    let Ccolumna = document.getElementById("Ccolumnas").value
    let Cfilas = document.getElementById("Cfilas").value
    let Cminas = document.getElementById("Cminas").value
    
    if ((Ccolumna<=0) || (Cfilas<=0) || (Cminas<=0)){
        alert("Ningun Valor puede ser 0 o menor")
    }
    else if(Cminas >= Ccolumna * Cfilas){
        alert("No pueden haber mas minas que casillas")
    }
    else{
        document.getElementById("TablaEntrada").setAttribute("hidden",true)
        genera_tablaBM(Cfilas,Ccolumna,Cminas)
    }
    
}

//funcion generar buscaminas

function genera_tablaBM(cantidadFilas, cantidadColumnas, cantidadMinas) {

    // seteo variables
    let contenido = document.getElementById("content");
    let tabla   = document.createElement("table");
    let tblBody = document.createElement("tbody");;
    let casillas  = new Array;

    //clase a la tabla
    tabla.setAttribute("class", "tableBM");
    
    //genero casillas
    for (let i = 0; i < cantidadFilas * cantidadColumnas; i++){
        casillas[i]="vacio";
    }

    if (casillas.length >= cantidadMinas){
        //random minas
        for (let i = 0, ramdom=0; i < cantidadMinas; i++){
            ramdom=getRandomArbitrary(0,casillas.length-1)
            if (casillas[ramdom] == "bomba"){
                i--
            }
            else{
                casillas[ramdom]="bomba";
            }
        }
    }
    // evitar for infinito
    else{
        alert("Partida Imposible")
    }
 
    //funcion para saber cantidad de bombas al aldo de cada casilla
    casillas = numerosCasillas(casillas, cantidadFilas, cantidadColumnas)

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
            if (casillas[i*cantidadColumnas+j]=="bomba"){
                botonCelda.setAttribute("href", 'javascript:alert("Bomba")');
                contenidoCelda.setAttribute("class", "BombaBM");
            }
            else{
                botonCelda.setAttribute("href", 'javascript:alert("'+ casillas[i*cantidadColumnas+j] +'")');
                contenidoCelda.setAttribute("class", "casillaBM");
            }
            //asignar los objetos
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

    ayuda(casillas)
}

//funcion para saber cuantas bombas hay al rededor de cada casilla
function numerosCasillas(casillas, cantidadFilas, cantidadColumnas) {
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
            if ((casillas[i-cantidadFilas+1]=="bomba") && (fila!=1) && (columna < cantidadColumnas)) total++;
            
            // Vemos si hay bomba en la casilla anterior de la fila anterior
            if ((casillas[i-cantidadFilas-1]=="bomba") && (fila!=1) && (columna!=1)) total++;

            // Vemos si hay bomba en la casilla inferior
            if ((casillas[i+cantidadFilas]=="bomba") && (fila < cantidadFilas)) total++;

            // Vemos si hay bomba en la casilla siguiente de la fila siguiente
            if ((casillas[i+cantidadFilas+1]=="bomba") && (fila < cantidadFilas) && (columna < cantidadColumnas)) total++;
            
            // Vemos si hay bomba en la casilla anterior de la fila siguiente
            if ((casillas[i+cantidadFilas-1]=="bomba") && (fila < cantidadFilas) && (columna!=1)) total++;

            casillas[i]=total
        }
        //avanzo una posicion en la tabla
        columna++
        if (columna > cantidadColumnas){
            fila++
            columna=1
        }
        
    }
    return casillas;
}

function ayuda(casillas){
    let ayuda  = new Array;
    for (let i=1; i < 9; i++){
        ayuda[0]=casillas.filter(element => element == i);
        ayuda[i]=ayuda[0].length;
        if(ayuda[i]!=0){
            console.log("Hay " + ayuda[i] + " casillas con "  + i + " bombas a su alrededor");
        }
    }
}