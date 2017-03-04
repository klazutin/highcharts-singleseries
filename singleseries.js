/**
 * Single series plugin for Highcharts
 * Author: Konstantin Lazutin
 * Version: 0.1.1 (2017-03-01)
 */

(function (H) {
    H.wrap(H.Chart.prototype, 'init', function (proceed) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        chart = this;
        separator = chart.legend.options.singleSeriesSeparator || getSeparator();
        onlyWord = chart.legend.options.singleSeriesWord || "Only";
        if (chart.legend.options.singleSeriesEnabled){
            console.log('enabled');
            for (var i = 0; i < chart.legend.allItems.length; i++){
                if (separator.includes('<br>')) {chart.legend.allItems[i].name += separator}; // reserve the second line of text in the legend to prevent it from jumping up and down
                setEvents(i);
            }
        }
    });
}(Highcharts));

function getSeparator(){
    if (chart.legend.options.layout == 'horizontal') {
        return '<br>&#8203'
    } else {
        return '&nbsp;'
    }
}

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
    separator.includes('<br>')
        ? chart.legend.allItems[i].name = chart.legend.allItems[i].options.name + separator
        : chart.legend.allItems[i].name = chart.legend.allItems[i].options.name;
}

function processLegendItem(index){
    event.stopPropagation();
    if (!chart.legend.allItems[index].onlySet){
        for (var i = 0; i < chart.legend.allItems.length; i++){
            if (i == index){
                chart.legend.allItems[i].onlySet = true;
                chart.series[i].setVisible(true, false);
                setName(i);
                removeEvents(i);
            } else {
                chart.legend.allItems[i].onlySet = false;
                chart.series[i].setVisible(false, false);
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
    chart.redraw();
}