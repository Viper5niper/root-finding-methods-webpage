

var sliderZ = document.getElementById("RangoZ");//slider para la funcion Z

var sliderRest = document.getElementById("RangoRest"); // slider para las restricciones

var outputZ = document.getElementById("demoZ");//mostrara el numero de variables de funcion z
var outputRest = document.getElementById("demoRest");// mostrara el numero de restricciones

var FuncionZ = document.getElementById("FuncionZ");//div donde ira la funcion Z generada
var Restricciones = document.getElementById("Restricciones"); //div donde iran las restricciones


//material desing use it later

var NumVariables;
var NumRest;

  var zFunction = '<span><strong>Z = </strong></span>';

outputZ.innerHTML = "Variables de funcion Z : " + sliderZ.value; // Display the default slider value
outputRest.innerHTML = "Numero de restricciones : " + sliderRest.value;

FuncionZ.innerHTML = zFunction;

// Update the current slider value (each time you drag the slider handle)
sliderZ.oninput = function() {
  
	var i; // guardara el numero de variables en la funcion Z


  outputZ.innerHTML = "Variables de funcion Z : " + this.value;

  zFunction = '<span><strong>Z = </strong></span>';

  for(i = 0; i < this.value; i++){



  	zFunction += '<div class="mdl-textfield mdl-js-textfield smol">'
                +'<input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="Var'+i+'">'
                +'<label class="mdl-textfield__label" for="Var'+i+'"></label>'
                +'<span class="mdl-textfield__error"></span>'
              +'</div>';
    if(i==(this.value-1)){
    	zFunction += '<span>X'+(i+1)+'</span>';
    }
    else{

    	zFunction += '<span>X'+(i+1)+' +    </span>';
    }
              

    
  }

  FuncionZ.innerHTML = zFunction;

  NumVariables = i;

}

function GenerarRest(NV){// funcion que genera restricciones

outputRest.innerHTML = "Numero de restricciones : " + sliderRest.value;

Restricciones.innerHTML = "";

var singleRest = "";

var strRest = "";

var i,j;

for(i = 0; i < sliderRest.value; i++){ //

singleRest = "";

for(j = 0; j < NumVariables; j++){ // hacemos un string con todas las variables en la funcion Z

singleRest += '<div class="mdl-textfield mdl-js-textfield smol">'
                +'<input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="'+i+','+j+'">'
                +'<label class="mdl-textfield__label" for="'+i+','+j+'"></label>'
                +'<span class="mdl-textfield__error"></span>'
              +'</div>';
    if(j==(NumVariables-1)){
    	singleRest += '<span>X'+(j+1)+'     </span>';
    }
    else{

    	singleRest += '<span>X'+(j+1)+' +    </span>';
    }


}

strRest += '<div class="row">'
           
          +singleRest
           
          +'<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label smol">'
                +'<select class="mdl-textfield__input" id="Signo'+i+'" name="octane">'
                  +'<option value="0">=</option>'
                  +'<option value="1"><=</option>'
                  +'<option value="2">>=</option>'
                +'</select>'
                +'<label class="mdl-textfield__label" for="octane"></label>'
              +'</div>'
			

			+'<span>          </span>'	

           +'<div class="mdl-textfield mdl-js-textfield smol">'
                +'<input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="Bi'+i+'">'
                +'<label class="mdl-textfield__label" for="Bi'+i+'"></label>'
                +'<span class="mdl-textfield__error"></span>'
                
              +'</div>'


          +'</div>';




}

Restricciones.innerHTML = strRest;

}

sliderRest.oninput = function(){

	GenerarRest(NumVariables);
};
