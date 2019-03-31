//Flot Line Chart

var lol = ecuacionDef;

$(document).ready(function() {

    var cabecera = document.getElementById("cabecera");
    cabecera.innerHTML = "A continuacion se presenta la grafica de f(x) = "+lol;
    var offset = 0;
    //console.log(lol);
    plot();

    $('#btn-agregar').click(function() { //no hace falta que validemos, porque la ecuacion no cambiara mientras no se ingrese algo bueno
        lol = ecuacionDef;
        cabecera.innerHTML = "A continuacion se presenta la grafica de g(x) = "+lol;
        plot();
      });
    
    function evaluar(i){

        var value = i;

        var ecuacionStr = lol.replace(/\x/g,value); //se usa /\x/g para reemplazar globalmente todas las coincidencias

        resultado = math.eval(ecuacionStr);

        //console.log(ecuacionStr);
        return resultado;
    }

    function plot() {

        var f = [],
            Identidad = [],
            ejex = [],
            ejey = [];
        for (var i = -8; i < 8; i += 0.5) {
            f.push([i, (evaluar(i))]); // aqui hay una f(x)
            
        }

        Identidad.push([-8,-10]);
        Identidad.push([8,10]);

        ejex.push([-8,0]);
        ejex.push([8,0]);

        ejey.push([0,-11]);
        ejey.push([0,11]);


        var options = {
            series: {
                lines: {
                    show: true
                },
                points: {
                    show: true
                }
            },
            grid: {
                hoverable: true //IMPORTANT! this is needed for tooltip to work
            },
            yaxis: {
                min: -8,
                max: 8
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s vale %y.4 cuando X vale %x.1",  //muestra los puntos.  %s -> descripcion; %x.1 -> valor en x con un decimal; etc.
                shifts: {
                    x: -60,
                    y: 25
                }
            }
        };

        var plotObj = $.plot($("#flot-line-chart"), [{
                data: f,
                label: "g(x)"
            }, {
                data: Identidad,
                label: "Identidad"
            }, {
                data: ejex,
                label: "Eje X"
            }, {
                data: ejey,
                label: "Eje Y"
            }],
            options);
    }
});