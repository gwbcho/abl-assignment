import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'abl-data-app';
    chart: Chart;

    ngOnInit() {
        // retrieve chart canvas ID
        const ctx = document.getElementById('graphCanvas');
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
    }

}
