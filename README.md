# highcharts-singleseries
Single Series plugin for Highcharts
![](http://lazut.in/img/github-singleseries.png)

This plugin adds a hyperlink to every legend item clicking on which will hide all other series. Clicking the link again will show all series again.

To enable, include `singleseries.js` after the `highcharts.js` script declaration and set `singleSeriesEnabled` to `true` in legend properties.

Other options are:  
`singleSeriesWord` - sets the contents of the hyperlink. Defaults to "Only"  
`singleSeriesSeparator` - sets the separator between the legend item name and the hyperlink. Defaults to `<br>` for horizontal legends and `&nbsp;` for vertical.
