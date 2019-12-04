
function anadirLineaHist(ecuacion, GdeX, raiz, err, iter, vi, tol, iterM ,id){//esta funcion añade una linea para la tabla
//fue creada con el fin de encapsular y no hacer tanto bulto xd
  var linea = 
  "<tr>"+
    "<td>"+ecuacion+"</td>"+
    "<td>"+raiz+"</td>"+
    "<td>"+err+"</td>"+
    "<td>"+iter+"</td>"+
    '<td>'+
    '<button class="btn btn-primary form-control" onclick="ejecutarHistorial(\'' + ecuacion + '\',\'' + GdeX + '\','+vi+','+tol+', '+iterM+' );" '+
    ' >'+
    '<i class="glyphicon glyphicon-search"></i>'+
    '</button>'+
    '<button class="btn btn-danger form-control" onclick="borrar(\''+id+'\')">'+
    '<i class="glyphicon glyphicon-trash"></i>'+
    '</button>'+
    '</td>'+
  "</tr>";

return linea;

}

function setValid(input){

input.classList.add("is-valid");

}

function ejecutarHistorial(ec, GdeX, vi, tol, iterM){

inpEcua = document.getElementById("ecuacion");
inpGdeX = document.getElementById("GdeX");
inpVi = document.getElementById("Vi");
inpTol = document.getElementById("es");
inpIterM = document.getElementById("imax");

document.getElementById("Derivada").value = "";

inpEcua.value = ec;
inpEcua.classList.add("success");
    //AgregarEcuacion();

inpGdeX.value = GdeX;
inpVi.value = vi;
inpTol.value = tol;
inpIterM.value= iterM;

	//Ejecutar();

var $modal = $('#dialogo3');
//when hidden
$modal.on('hidden.bs.modal', function(e) { 
  return this.render(); //DOM destroyer
});

$modal.modal('hide');

var element = document.querySelector("#datos");
element.scrollIntoView({ behavior: 'smooth', block: 'end'});



}

function cargarTabla(){

	document.getElementById("tablaHist").innerHTML = "";

	var operaciones = firebase.database().ref("/PuntoFijo");
	operaciones.on("child_added" , function(data){
		var auxOp = data.val();
		document.getElementById("tablaHist").innerHTML += anadirLineaHist(auxOp.ecuacion,
																		  auxOp.GdeX,
																		  auxOp.raiz,
																		  auxOp.error,
																		  auxOp.iter,
																		  auxOp.valorInicial,
																		  auxOp.tolerancia,
																		  auxOp.iterMax,
																		  data.key);
		//console.log(data.key);
	});


}

function borrar(id){

	var op = firebase.database().ref("PuntoFijo/" + id);
	op.remove();
	location.reload();

}