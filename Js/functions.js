//funcion generar buscaminas
function genera_tablaBM(cantidadFilas, cantidadColumnas, cantidadMinas) {

    // seteo variables
    var contenido = document.getElementById("content");
    var tabla   = document.createElement("table");
    var tblBody = document.createElement("tbody");
    var auxiliar;
    var minas = new Array;
    var auxiliarMinas;

    //clase a la tabla
    tabla.setAttribute("class", "tableBM");
    
    //random minas
    for (var i = 0; i < cantidadMinas; i++){
        minas[i]=new Array (Math.floor(getRandomArbitrary(0,cantidadFilas)), Math.floor(getRandomArbitrary(0,cantidadColumnas)));
    }

    //ordenar minas para detectar repetidas
    minas.sort();

    console.log(minas)

    //al encontrar una repetida pongo en la proxima posicion libre
    for (var i = 0; i < cantidadMinas; i++){
        
        console.log("entre")
        
        //comparo las pociones del array "Esta fallando"
        if(minas[i + 1] === minas[i]){

            //tengo que sacar esta variable para no ocupar mas espacio de memoria
            auxiliarMinas=minas[i + 1]

            //detecto si la nueva ubicacion puede ser en la misma columna
            if ((auxiliarMinas[1] + 1 ) > cantidadColumnas){
                //en caso no se pueda sumo 1 en la columna
                auxiliarMinas[0]=auxiliarMinas[0]+1
                auxiliarMinas[1]=0
            }
            //aun no se me ocurrio como salvar esto de manera consisa
            //else if(auxiliarMinas[0] == cantidadFilas){}
            else {
                auxiliarMinas[1]=auxiliarMinas[1]+1
            }
            minas[i+1] = auxiliarMinas;
        }
    }

    //borrar, pruebas
    console.log(minas)
    

    //añadir filas y columnas
    for (var i = 0; i < cantidadFilas; i++) {
        //crear fila
        var fila = document.createElement("tr");
        for (var j = 0; j < cantidadColumnas; j++) {
            //crear columna
            var celda = document.createElement("td");
            var botonCelda = document.createElement("a");
            var contenidoCelda = document.createElement("div");

            //detectar si hay una mina en esa casilla
            for (var x = 0; x < minas.length; x++){
                //tengo que sacar esta variable para no ocupar mas espacio de memoria
                auxiliarMinas= minas[x]
                if ((i==auxiliarMinas[0]) && (j==auxiliarMinas[1])){
                    auxiliar=1;
                }
            }
            
            //estilo temporal para programar
            if (auxiliar==1){
                botonCelda.setAttribute("href", 'javascript:alert("Bomba")');
                contenidoCelda.setAttribute("class", "BombaBM");
                auxiliar=0;
            }
            else{
                botonCelda.setAttribute("href", 'javascript:alert("Libre")');
                contenidoCelda.setAttribute("class", "casillaBM");
            }
            //asignar los objetos
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
    
  }

  //funcion ramdom con minimo maximo
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }