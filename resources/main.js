window.onload = iniciar;

var tablaMostrar;
var informacion;
var res;
var sideMenu;
var EspGrafica;

var _An;
var _Bn;
var _es;
var _imax;
var _ecuacion;
var ecuacionDef; //la ecuacion definitiva que usaremos

function iniciar(){

  //console.log(math.eval('(cos('+0+'))')); // i will just leave this stuff
  //special thanks to math.js
 
 tablaMostrar = document.getElementById("tablaFB");
 informacion = document.getElementById("informacion");
 res = document.getElementById("res");
 sideMenu = document.getElementById("side-menu");
 EspGrafica = document.getElementById("EspacioGrafica");


}

function AgregarFuncion(){ // ya funciona. Valida que la funcion sea prospera y bonita

  _ecuacion = document.getElementById("ecuacion").value;

  var ecuacionStr = _ecuacion.replace(/\x/g,1);

  resultado = math.eval(ecuacionStr);

  if(typeof(resultado) === 'number'){

    console.log("si furula");

    ecuacionDef = document.getElementById("ecuacion").value;

    localStorage.setItem("ecuacion",ecuacionDef);

  }
  else{

    console.log("no furula");

    ecuacionDef = "";

    console.log("La grafica no es valida!");
  }



}

function Ejecutar(){
//tomamos todos los valores necesarios
 _An = document.getElementById("An").value;
 _Bn = document.getElementById("Bn").value;
 _es = document.getElementById("es").value;
 _imax = document.getElementById("imax").value;
 



//convertimos las cadenas de texto a valores numericos
 var An = parseFloat(_An);
 var Bn = parseFloat(_Bn);
 var es = parseFloat(_es);
 var imax = parseFloat(_imax);

 console.log(ecuacionDef);

 if(_An != "" && _Bn != "" && es > 0 && imax > 0 && ecuacionDef != ""){ //si se completaron todos los datos, entonces haremos la biseccion

Bisceccion(An,Bn,es,imax);

 }
else{ //sino, mostraremos un mensaje de alerta

  informacion.innerHTML = '<div class="alert alert-danger text-center col-lg-12 bannerInfo"><strong>Asegurese de introducir datos validos!</strong><p>Tenga en cuenta:</p><p>-> Haber llenado todos los campos</p><p>-> Haber ingresado una ecuacion adecuada</p><p>-> El error sea mayor que cero</p><p>-> Escoger un numero razonable de iteraciones</p></div>';

}


}


function Bisceccion(An, Bn, es, imax)
{
var Tabla = "";
var _res = "";
var Infor = '<div class="alert alert-success text-center col-lg-12 bannerInfo"><strong>Se encontraron resultados!</strong></div>'

//An es el inicio del intervalo
//Bn es el final del intervalo
//P_ant es valor aproximado anterior. Solo se usa para sacar el error (relativo y abs)
//es  = error seleccionado para aprobar
//imax es el maximo de iteraciones
//Pn es Pn o valor aproximado
//n es el contador de iteraciones
//ea es el error que se encuentra en cada iteracion

var n = 0;
var Pn = (An + Bn)/2;
var ea = 100;
var P_ant;
var fn;
var test;
var fi = ecuacion(An); //guardamos la primera evaluacion para mas tarde

do{ //el algoritmo funciona perfecto xd

P_ant = Pn; //guardamos la aproximacion actual
Pn = (An + Bn)/2; //encontramos Pn
fn = ecuacion(Pn) //evaluamos la funcion en Pn

n++; //le añadimos al iterador xd

if(n>1){

ea = (Math.abs((Pn - P_ant)/Pn) * 100); //encontramos el valor absoluto con la P anterior

Tabla += anadirLinea(n,An,Bn,Pn,fn,ea); //si ya hay un error relativo existente, lo añadimos a la tabla

}
else{

Tabla += anadirLinea(n,An,Bn,Pn,fn,"- ");//si no lo hay, pues ni maiz.

}

test = (fi*fn);//buscamos el signo que domina

if(test<0)
{Bn = Pn;}//si el signo es negativo, Bn sera Pn xd

else if(test>0){
  An = Pn; 
  fi = fn;
}//sino, An sera Pn

else if(test == 0)
{ea = 0;}//si es cero, entonces ya llegamos a nuestro resultado.


} while (n <= imax && ea > es);

if(ecuacion(Pn)<=-0.01 || ecuacion(Pn)>=0.01){ // si no se llega ni cerca de un cero, entonces mandamos una alerta

Infor = '<div class="alert alert-warning text-center col-lg-12 bannerInfo"><strong>No se encuentra ninguna raiz en el intervalo dado!</strong><p>Consulte la grafica de la funcion para escoger un intervalo adecuado</p></div>';

}
else{ // si se llego a un cero, generamos resultados con la info obtenida

_res = generarRes(Pn,ea,n,ecuacionDef);

}

tablaMostrar.innerHTML = Tabla; //añadimos todos los datos a la tabla
informacion.innerHTML = Infor; // mostramos un mensajito
res.innerHTML = _res;





}

function ecuacion(x){ //En e3ta funci6n 3e pone la ecuacion 

var value = x;

var ecuacionStr = ecuacionDef.replace(/\x/g,value); //se usa /\x/g para reemplazar globalmente todas las coincidencias

resultado = math.eval(ecuacionStr);

  return resultado;  //aqui hay otra f(x)
}

function anadirLinea(n, An, Bn, Pn, Fn, ER){

  var linea = 
  "<tr>"+
    "<td>"+n+"</td>"+
    "<td>"+An+"</td>"+
    "<td>"+Bn+"</td>"+
    "<td>"+Pn+"</td>"+
    "<td>"+Fn+"</td>"+
    "<td>"+ER+"%</td>"+
  "</tr>";

return linea;

}

function generarRes(Pn,ER,n,ecuacion){

  var resultados = 
  '<div class="col-xs-3">'+
          '<div class="form-group">'+
              '<label>Raiz Encontrada:</label>'+
              '<input class="form-control" value="'+Pn+'" readonly>'+
          '</div>'+
  '</div>'+

  '<div class="col-xs-3">'+
     '<div class="form-group">'+
          '<label>Error Relativo:</label>'+
          '<input class="form-control" value="'+ER+'" readonly>'+
      '</div>'+
  '</div>'+

  '<div class="col-xs-2">'+
      '<div class="form-group">'+
          '<label>Iteraciones:</label>'+
          '<input class="form-control" value="'+n+'" readonly>'+
      '</div>'+
  '</div>'+

  '<div class="col-xs-4">'+
      '<div class="form-group">'+
          '<label>Funcion utilizada:</label>'+
          '<input class="form-control" value="'+ecuacion+'" readonly>'+
      '</div>'+
  '</div>';
           
  return resultados;                     


}