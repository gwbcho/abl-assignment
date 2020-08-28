import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    /*
    Class to create functionality for the chart located in the app html page. Note that this class
    is declared on page initiation.
    */

    // declare class variables
    title = 'abl-data-app';
    chart: Chart;
    dataSetIndexes: object;
    arrayCap: number;
    config: object;
    socket: WebSocket;

    ngOnInit() {
        const constructorScope = this;  // necessary for nested functions referencing class vars
        // retrieve chart canvas ID
        const ctx = document.getElementById('graphCanvas') || null;
        if (!ctx) {
            return;  // no chart/graph canvas provided
        }
        this.socket = new WebSocket('http://localhost:8080');
        // configuration object for graph animation
        this.config = {
            duration: 800,
            lazy: false,
            easing: 'easeOutBounce'
        };
        /*
        Array length cap (multiply by 3 for the total dataset array cap count). This is necessary
        if you intend to run the app indefinitely as otherwise the data arrays would grow without
        bound, consuming substantial amounts of memory and affecting the performance of the
        computer.
        */
        this.arrayCap = 100;
        // instantiate Chart object
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: 'Data From All (A, B, C) Sources',
                        data: [],
                        backgroundColor: 'black',
                        borderColor: 'black',
                        fill: false
                    },
                    {
                        label: 'Data From Source A',
                        data: [],
                        backgroundColor: 'red',
                        borderColor: 'red',
                        fill: false
                    },
                    {
                        label: 'Data From Source B',
                        data: [],
                        backgroundColor: 'blue',
                        borderColor: 'blue',
                        fill: false
                    },
                    {
                        label: 'Data From Source C',
                        data: [],
                        backgroundColor: 'green',
                        borderColor: 'green',
                        fill: false
                    }
                ]
            }
        });
        // dataset correspondences
        this.dataSetIndexes = {'All': 0, 'A': 1, 'B': 2, 'C': 3};
        // setup socket to listen for server events
        this.socket.addEventListener('message', (event) => {
            let eventDataObj = JSON.parse(event.data);
            if (!eventDataObj || eventDataObj.ts === undefined) {
                return;
            }
            let dataObj = {
                x: eventDataObj.ts,  // timestamp
                y: eventDataObj.val  // value
            }
            let translatedIndex = constructorScope.dataSetIndexes[eventDataObj.sourceName];
            constructorScope.pushChartData(
                constructorScope.chart,
                dataObj,
                translatedIndex,
                constructorScope.arrayCap
            );
        });
    }

    /*
    Function to fully update/replace the entire data item for the chart.

    @param {Chart} chart: chart object (in the case of multiple charts)
    @param {array} dataArray: an array of data points (will completely replace the previous entry)
        [
            {
                x: Date,
                y: float
            }
        ]
    @param {integer} dataSetIntex: index of the data set for replacement
    */
    updateChartData(chart: Chart, dataArray: Array<object>, dataSetIndex: number) {
        chart.data.datasets[dataSetIndex].data = dataArray;
        chart.update();
    }

    /*
    Function to push a new data item into the data set data array. If an array cap value is
    specified then the array will only grow up to a certain limit after which the first item in the
    list is removed to make room for the new data item. This function is assuming that data points
    are provided in order (in terms of the independent variable).

    @param {Chart} chart: chart object
    @param {any} dataItem: data item which must be acceptable to the Chart object:
        {
            x: Date,
            y: float
        }
    @param {integer} dataSetIntex: index of the data set for replacement
    @param {number} arrayCap: array population cap
    */
    pushChartData(chart: Chart, dataItem: object, dataSetIndex: number, arrayCap: number = null) {
        chart.data.datasets[dataSetIndex].data.push(dataItem);
        if (dataSetIndex) {
            chart.data.datasets[0].data.push(dataItem);
        }
        if (arrayCap && chart.data.datasets[dataSetIndex].data.length > arrayCap) {
            chart.data.datasets[dataSetIndex].data.shift();
        }
        if (arrayCap && chart.data.datasets[0].data.length > 3 * (chart.data.datasets.length - 1)) {
            chart.data.datasets[0].data.shift();
        }
        chart.update();
    }

    /*
    Function to remove the latest chart data element.

    @param {Chart} chart: chart object
    @param {any} dataItem: data item which must be acceptable to the Chart object
    @param {integer} dataSetIntex: index of the data set for replacement
    */
    removeLatestChartDataItems(chart: Chart, dataSetIndex: number, numberToRemove: number = 1) {
        chart.data.datasets[dataSetIndex].splice(-numberToRemove, numberToRemove);
        chart.update();
    }

    /*
    Function to clear the chart of all data.

    @param {Chart} chart: chart object
    */
    clearChart(chart: Chart) {
        if (!chart.data.datasets) {
            chart.data = [];
        }
        for (let i = 0; i < chart.data.datasets.length; i++) {
            chart.data.datasets[i].data = [];
        }
        chart.update();
    }

    /*
    Function to start chart animation.

    @param {Chart} chart: chart object
    */
    startChart(chart: Chart) {
        chart.render(this.config);
    }

    /*
    Function to stop chart animation.chart

    @param {Chart} chart: chart object
    */
    stopChart(chart: Chart) {
        chart.stop();
    }

    /*
    Close socket connection.
    */
    closeSocket() {
        this.socket.send('close');
    }
}
