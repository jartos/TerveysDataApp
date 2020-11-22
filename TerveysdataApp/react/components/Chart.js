import React, { Component } from 'react';
import {Chart as ChartJS} from 'react-chartjs-2';


class Chart extends Component {
    chart = null;
    updates = false;

    componentDidMount() {
        this.initChart();
    }

    componentWillUnmount() {
        this.destroyChart();
    }

    componentDidUpdate() {
        if (this.chart) {
            this.chart.data.datasets = this.props.data.datasets;
            this.chart.update();
        }
    }

    initChart() {
        this.chart = new ChartJS(this.canvas, {
            type: this.props.type,
            data: this.props.data
        });
    }

    destroyChart() {
        this.chart.destroy();
    }

    render() {
       /*  console.log(this.props); */
        return (
            <canvas className="canvas" ref={(canvas) => this.canvas = canvas}></canvas>
        );
    }
}



export default Chart;