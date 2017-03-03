/**
 * Single series plugin for Highcharts
 * Author: Konstantin Lazutin
 * Version: 0.1 (2017-03-01)
 */
 
(function (H) {
    H.wrap(H.Chart.prototype, 'init', function (proceed) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        chart = this;
        chart.legend.options.layout == 'horizontal' ? separator = '<br>&#8203' : separator = '&nbsp;'
        onlyWord = chart.legend.options.onlyWord || "Only";
        if (chart.legend.options.onlyEnabled){
            for (var i = 0; i < chart.legend.allItems.length; i++){
                chart.legend.allItems[i].name += separator; // reserve the second line of text in the legend to prevent it from jumping up and down                    
                setEvents(i);
            }
        }
    });
}(Highcharts));

function setEvents(i){   
    Highcharts.addEvent(chart.legend.allItems[i].legendItem.element, 'mouseenter', function() {
        setName(i);
        chart.legend.render();
    }.bind(i));

    Highcharts.addEvent(chart.legend.allItems[i].legendItem.element, 'mouseleave', function() {
        removeName(i);
        chart.legend.render();
    }.bind(i));    
}

function removeEvents(i){
    Highcharts.removeEvent(chart.legend.allItems[i].legendItem.element, 'mouseenter');    
    Highcharts.removeEvent(chart.legend.allItems[i].legendItem.element, 'mouseleave');    
}

function setName(i){
    chart.legend.allItems[i].name = chart.legend.allItems[i].options.name + separator + "<a onclick='processLegendItem(" + i + ")'>" + onlyWord + "</a>";    
}

function removeName(i){
    chart.legend.allItems[i].name = chart.legend.allItems[i].options.name + separator;  
}

function processLegendItem(index){
    event.stopPropagation();
    if (!chart.legend.allItems[index].onlySet){
        for (var i = 0; i < chart.legend.allItems.length; i++){
            if (i == index){                
                chart.legend.allItems[i].onlySet = true;
                chart.series[i].show();
                setName(i);
                removeEvents(i);
            } else {
                chart.legend.allItems[i].onlySet = false;                  
                chart.series[i].hide();                
                removeName(i);    
                setEvents(i);
            }
        }
    } else {
        for (var i = 0; i < chart.legend.allItems.length; i++){
            chart.legend.allItems[i].onlySet = false;
            chart.series[i].show();     
            removeName(i);
            setEvents(i);
        }
    }
    chart.legend.render();
}