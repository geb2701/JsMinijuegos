let datos = [["cPartidas","partidasJugadas"],["casillasCorrectas","casillas"],["cVictoria","victoria"],["cDerrota","derrota"]]

//funcion para escribir el texto en la pantalla
function recuperarEstadisticas(){
    datos.forEach(element => {
        if ((localStorage.getItem(element[1])!== null) && (localStorage.getItem(element[1])!== NaN)){
            document.getElementById(element[0]).innerHTML=localStorage.getItem(element[1])
        }
        else{
            document.getElementById(element[0]).innerHTML="0"
        }
    }); 
}

//funcion para reiniciar las estadisticas
function Reiniciar(){
    localStorage.clear()
    datos.forEach(element => {
        localStorage.setItem(element[1], 0)
    });
    recuperarEstadisticas()
}

//lo ejecutamos al comenzar
window.onload = recuperarEstadisticas()