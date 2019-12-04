window.onload = iniciar;
//Karlamejia1027@gmail.com, correo de la lic xd

var firebaseConfig = {
  apiKey: "AIzaSyAXgVqki8x1AQGnevwEcW28bzVwXV6yiy4",
  authDomain: "metnumeriocos.firebaseapp.com",
  databaseURL: "https://metnumeriocos.firebaseio.com",
  projectId: "metnumeriocos",
  storageBucket: "metnumeriocos.appspot.com",
  messagingSenderId: "162445858871",
  appId: "1:162445858871:web:035c9de5182dbce9f2c7b2",
  measurementId: "G-83LJ4CW1C1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


var EspGrafica;
var tablaMostrar;//tabla donde pondremos las iteraciones
var informacion;//cuadro de dialogo de advertencias e informacion
var res;//espacio para mostrar los resultados

var _ecuacion;
var _GdeX;
var _Derivada;   //hace falta aplicar el algoritmo y personalizar el ingreso de datos

var DefaultEq = "(e)^(-x)"

var ecuacionDef = DefaultEq; //la ecuacion definitiva que usaremos

function iniciar(){

//  localStorage.setItem("ecuacion","(x)^2 - 3*x - 4");

  //console.log(math.eval('(cos('+0+'))')); // i will just leave this stuff
  //special thanks to math.js
 
 tablaMostrar = document.getElementById("tablaFB");
 informacion = document.getElementById("informacion");
 res = document.getElementById("res");
 EspGrafica = document.getElementById("EspacioGrafica");

}


function arrayJSON(ecuacion, GdeX, raiz, err, iter, vi, tol, iterM){

  var EnviarBD = {
    ecuacion: ecuacion,
    GdeX: GdeX,
    raiz: raiz,
    error: err,  
    iter: iter,
    valorInicial: vi,
    tolerancia: tol,
    iterMax: iterM,

  }

  return EnviarBD;
}

function agregarBD(JSONarray){

  var aux;

  const db = firebase.database();
  const refOperaciones = db.ref().child("PuntoFijo"); //tomamos una referencia hacia "biseccion"

  var operacion = db.ref("PuntoFijo/" + ecuacionDef);
   operacion.set(JSONarray);
  
}

function AgregarFunciones(){ // ya funciona. Valida que la funcion sea prospera y bonita

  _ecuacion = document.getElementById("ecuacion").value;
 _GdeX = document.getElementById("GdeX").value;
 _Derivada = math.derivative(_GdeX,'x').toString();

  var ecuacionStr = _ecuacion.replace(/\x/g,1);
  var GdeXStr = _GdeX.replace(/\x/g,1);
  var DerivadaStr = _Derivada.replace(/\x/g,1);

  var EvalEcuacion = math.eval(ecuacionStr);
  var EvalGdeX = math.eval(GdeXStr);
  var EvalDerivada = math.eval(DerivadaStr);

  console.log(_Derivada);

  if(typeof(EvalEcuacion) === 'number' && typeof(EvalDerivada) === 'number' && typeof(EvalGdeX) === 'number'){

    swal("Ecuaciones Insertadas","Las ecuaciones fueron añadidas con exito, revise la grafica.","success");

    ecuacionDef = document.getElementById("GdeX").value;
    document.getElementById("Derivada").value = _Derivada;

    //localStorage.setItem("ecuacion",ecuacionDef);

  }
  else{

    swal("Ecuaciones invalidas!","Revise la ecuacion, puede ver mas sugerencias en el apartado de 'ayuda'","error");

    ecuacionDef = DefaultEq;
    document.getElementById("Derivada").value ="-";

  }



}

function Ejecutar(){
//tomamos todos los valores necesarios

 var _Xi = document.getElementById("Vi").value;
 var _es = document.getElementById("es").value;
 var _imax = document.getElementById("imax").value;


//convertimos las cadenas de texto a valores numericos
 var Xi = parseFloat(_Xi);
 var es = parseFloat(_es);
 var imax = parseFloat(_imax);

 console.log(_Xi + "-" + es + "-" + imax);

 if(_Xi != "" && es > 0 && imax > 0 && ecuacionDef != "" && _ecuacion != ""){ //si se completaron todos los datos, entonces haremos la biseccion

var confianza = ecuacion(Xi,_Derivada);

    if(confianza < 1 && confianza > -1){
    PuntoFijo(Xi,es,imax);
    }else{
    swal("La prueba de punto fijo divergera!","La derivada de la funcion nos dice que divergera!. Elija otro punto inicial, o utilice el metodo de biseccion.","warning");
    }

}
else{ //sino, mostraremos un mensaje de alerta

  informacion.innerHTML = '<div class="alert alert-danger text-center col-lg-12 bannerInfo"><strong>Asegurese de introducir datos validos!</strong><p>Tenga en cuenta:</p><p>-> Haber llenado todos los campos</p><p>-> Haber ingresado una ecuacion adecuada</p><p>-> El error sea mayor que cero</p><p>-> Escoger un numero razonable de iteraciones</p></div>';

  swal("Datos invalidos!","Revise los datos ingresados, puede ver mas sugerencias en el apartado de 'ayuda'","error");
}


}


function PuntoFijo(Xi, es, imax)
{
var Tabla = "";
var _res = "";
var Infor = '<div class="alert alert-success text-center col-lg-12 bannerInfo"><strong>Se encontraron resultados!</strong></div>';

//An es el inicio del intervalo
//Bn es el final del intervalo
//P_ant es valor aproximado anterior. Solo se usa para sacar el error (relativo y abs)
//es  = error seleccionado para aprobar
//imax es el maximo de iteraciones
//Pn es Pn o valor aproximado
//n es el contador de iteraciones
//ea es el error que se encuentra en cada iteracion

var n = 0;
var X = Xi;
var Xant;
var ea = 100;

do{ //el algoritmo funciona perfecto xd

Xant = X; //guardamos el valor actual
X = ecuacion(X,ecuacionDef); //encontramos una X nueva

n++;

if(n>1){

ea = (Math.abs((X - Xant)/X) * 100); //encontramos el valor absoluto con la P anterior

Tabla += anadirLinea(n,Xant,X,ea); //si ya hay un error relativo existente, lo añadimos a la tabla

}
else{

Tabla += anadirLinea(n,Xant,X,"- ");//si no lo hay, pues ni maiz.

}


} while (n <= imax && ea > es);

if(ecuacion(X,_ecuacion)<=-0.01 || ecuacion(X,_ecuacion)>=0.01){ // si no se llega ni cerca de un cero, entonces mandamos una alerta

Infor = '<div class="alert alert-warning text-center col-lg-12 bannerInfo"><strong>No se encuentra ninguna raiz en el intervalo dado!</strong><p>Consulte la grafica de la funcion para escoger un intervalo adecuado</p></div>';

}
else{ // si se llego a un cero, generamos resultados con la info obtenida

_res = generarRes(X,ea,n,_ecuacion);

swal("Se encontro una raiz!","El programa genero resultados con exito!","success");

var arrayData = arrayJSON(_ecuacion,_GdeX,X,ea,n,Xi,es,imax);

agregarBD(arrayData);

}

tablaMostrar.innerHTML = Tabla; //añadimos todos los datos a la tabla
informacion.innerHTML = Infor; // mostramos un mensajito
res.innerHTML = _res;





}

function ecuacion(x,EcuaStr){ //En e3ta funci6n 3e pone la ecuacion 

var value = x;

var ecuacionStr = EcuaStr.replace(/\x/g,value); //se usa /\x/g para reemplazar globalmente todas las coincidencias

resultado = math.eval(ecuacionStr);

  return resultado;  //aqui hay otra f(x)
}

function anadirLinea(n,X,fx,ER){//esta funcion añade una linea para la tabla
//fue creada con el fin de encapsular y no hacer tanto bulto xd
  var linea = 
  "<tr>"+
    "<td>"+n+"</td>"+
    "<td>"+X+"</td>"+
    "<td>"+fx+"</td>"+
    "<td>"+ER+"</td>"+
  "</tr>";

return linea;

}

function generarRes(X,ER,n,ecuacion){//genera campos con los resultados

  var resultados = 
  '<div class="col-sm-3">'+
          '<div class="form-group">'+
              '<label>Raiz Encontrada:</label>'+
              '<input class="form-control" value="'+X+'" readonly>'+
          '</div>'+
  '</div>'+

  '<div class="col-sm-3">'+
     '<div class="form-group">'+
          '<label>Error Relativo:</label>'+
          '<input class="form-control" value="'+ER+'" readonly>'+
      '</div>'+
  '</div>'+

  '<div class="col-sm-2">'+
      '<div class="form-group">'+
          '<label>Iteraciones:</label>'+
          '<input class="form-control" value="'+n+'" readonly>'+
      '</div>'+
  '</div>'+

  '<div class="col-sm-4">'+
      '<div class="form-group">'+
          '<label>Funcion utilizada:</label>'+
          '<input class="form-control" value="'+ecuacion+'" readonly>'+
      '</div>'+
  '</div>';
           
  return resultados;                     


}
