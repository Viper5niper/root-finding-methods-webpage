var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
var FuncionZ = document.getElementById("FuncionZ");

output.innerHTML = "Variables de funcion Z= " + slider.value; // Display the default slider value
FuncionZ.innerHTML = "Z tendra variables cuando deslice";



// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = "Variables de funcion Z= " + this.value;

  var zFunction = '<div class="col-xs-2">'
                                +'<div class="form-group input-group">'
                                  +'  <input class="form-control" placeholder="Z">'
                                    +'<span class="input-group-addon"> = </span>'
                                +'</div>'
                                +'</div>';

  for(var i = 0; i < this.value; i++){



  	zFunction += '<div class="col-xs-2">'
                                + '<div class="form-group input-group">'
                                    +'<input class="form-control" maxlength="4" size="4" placeholder="">'
                                    +'<span class="input-group-addon">X'+(i+1)+'</span>'
                                +'</div>'
                                +'</div>';

  }

  FuncionZ.innerHTML = zFunction;


} 