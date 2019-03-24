//Flot Line Chart
$(document).ready(function() {

    var offset = 0;
    plot();

    function plot() {
        var f = [],
            ejex = [],
            ejey = [];
        for (var i = -4; i < 12; i += 0.5) {
            f.push([i, ((i*i) - (3*i) - 4)]);
        }

        ejex.push([-4,0]);
        ejex.push([12,0]);

        ejey.push([0,-7]);
        ejey.push([0,7]);

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
                min: -7,
                max: 7
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
                label: "f(x)"
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