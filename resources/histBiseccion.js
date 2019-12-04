
function anadirLineaHist(ecuacion, Pn, err, iter, An, Bn, tol, iterM,id){//esta funcion añade una linea para la tabla
//fue creada con el fin de encapsular y no hacer tanto bulto xd
  var linea = 
  "<tr>"+
    "<td>"+ecuacion+"</td>"+
    "<td>"+Pn+"</td>"+
    "<td>"+err+"</td>"+
    "<td>"+iter+"</td>"+
    '<td>'+
    '<button class="btn btn-primary form-control" onclick="ejecutarHistorial( \'' + ecuacion + '\' ,'+An+','+Bn+','+tol+','+iterM+');" '+
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



function ejecutarHistorial(ec, An, Bn, tol, iterM){

inpEcua = document.getElementById("ecuacion");
inpAn = document.getElementById("An");
inpBn = document.getElementById("Bn");
inpTol = document.getElementById("es");
inpIterM = document.getElementById("imax");

inpEcua.value = ec;
inpEcua.classList.add("success");
    //AgregarEcuacion();

document.getElementById("An").value = An;
document.getElementById("Bn").value = Bn;
document.getElementById("es").value = tol;
document.getElementById("imax").value= iterM;

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

	var operaciones = firebase.database().ref("/Biseccion");
	operaciones.on("child_added" , function(data){
		var auxOp = data.val();
		document.getElementById("tablaHist").innerHTML += anadirLineaHist(auxOp.ecuacion,
																		  auxOp.raiz,
																		  auxOp.error,
																		  auxOp.iter,
																		  auxOp.intervalo.inicio,
																		  auxOp.intervalo.fin,
																		  auxOp.tolerancia,
																		  auxOp.iterMax,
																		  data.key);
		//console.log(data.key);
	});


}

function borrar(id){

	var op = firebase.database().ref("Biseccion/" + id);
	op.remove();
	location.reload();

}