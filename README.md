# Single Series plugin for Highcharts

## Update 2023-03-22:
Due to significant API changes, the plugin no longer works with recent versions of Highcharts.
The next best solution I could come up with is showing a single series using ctrl-click on the series name in the legend. This does not require a plugin and can be achieved through Highcharts configuration:

```
plotOptions: {
    series: {
        events: {
            legendItemClick: function (e) {
                if (e.browserEvent.ctrlKey) {
                    if (window.singleSeriesShown == null || window.singleSeriesShown != e.target.index) {
                        // if all the series are visible, hide the ctrl-clicked one and remember which one it was:
                        window.singleSeriesShown = e.target.index;
                        for (var i = 0; i < e.target.chart.series.length; i++) {
                            if (i == e.target.index) {
                                e.target.chart.series[i].setVisible(true);

                            } else {
                                e.target.chart.series[i].setVisible(false)
                            }
                        }
                    } else {
                        // if this is the second click and we are already showing only one series, return to showing all:
                        window.singleSeriesShown = null;
                        for (var i = 0; i < e.target.chart.series.length; i++) {
                            e.target.chart.series[i].setVisible(true);
                        }
                    }
                    e.preventDefault();
                } else {
                    // if we started clicking without ctrl again, reset single series so as not to cause confusion:
                    window.singleSeriesShown = null;
                }
            }
        }
    }
}
```

See demo here: https://jsfiddle.net/8ub1wrfc/

---

## Outdated:

This plugin adds a hyperlink to every legend item clicking on which will hide all other series. Clicking the link again will show all series again.

This only works for if `useHTML` for the legend is set to `true`.  

To enable, include `singleseries.js` after the `highcharts.js` script declaration and set `singleSeriesEnabled` to `true` in legend properties.

Other options are:  
`singleSeriesWord` - sets the contents of the hyperlink. Defaults to "Only".  
`singleSeriesSeparator` - sets the separator between the legend item name and the hyperlink. Defaults to `<br>` for horizontal legends and `&nbsp;` for vertical.

Demo: https://jsfiddle.net/wfmy20sn/
