import React, { Component } from "react";
import { withRouter } from "next/router";
import { Bar, Line, Pie } from "react-chartjs-2";

let color = [
  "#ff6384",
  "#5959e6",
  "#2babab",
  "#8c4d15",
  "#8bc34a",
  "#607d8b",
  "#009688",
];

class Chart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { graphData } = this.props;
    let chartData = {
      labels: graphData.dateTime,
      datasets: [
        {
          label: "Volume USD",
          yAxisID: "volumeUsd",

          fill: false,
          lineTension: 0.1,
          backgroundColor: "transparent",
          borderColor: color[1],
          pointBackgroundColor: color[1],
          pointBorderColor: color[1],
          pointHoverBackgroundColor: color[1],
          pointHoverBorderColor: color[1],

          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: graphData.volumeUsd,
        },
        {

          label: 'Price',
          yAxisID: 'price',
   
          fill: false,
          lineTension: 0.1,

          backgroundColor: 'transparent',
          borderColor: color[3],
          pointBackgroundColor: color[3],
          pointBorderColor: color[3],
          pointHoverBackgroundColor: color[3],
          pointHoverBorderColor: color[3],

          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: graphData.marketCapValue
          // data: [15, 5, 60, 71, 86, 95, -30, 50, 60, 70, 0, 9, 40, 20, 100, 70, 55, 66, 88, 20, 21, 41, 51, 8],
        },
        {

          label: 'Market Cap',
          yAxisID: 'marketCapVal',
   
          fill: false,
          lineTension: 0.1,

          backgroundColor: 'transparent',
          borderColor: color[2],
          pointBackgroundColor: color[2],
          pointBorderColor: color[2],
          pointHoverBackgroundColor: color[2],
          pointHoverBorderColor: color[2],

          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: graphData.prices
          // data: [15, 5, 60, 71, 86, 95, -30, 50, 60, 70, 0, 9, 40, 20, 100, 70, 55, 66, 88, 20, 21, 41, 51, 8],
        },
      ],
    };

    return (
      <div className="chart-container card mb-3">
        <Line
          style={{ width: "100%" }}
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            title: {
              display: true,
              text: "24 Hour Volume in last week",
            },
            legend: {
              display: true,
              position: "bottom",
              fontSize: 25,
            },
            scales: {
              yAxes: [{
                id: 'volumeUsd',
                type: 'linear',
                position: 'left',
                scaleLabel: {
                  display: true,
                  labelString: 'Volume(USD)',
                }
              }, {
                id: 'price',
                type: 'linear',
                position: 'right',
                scaleLabel: {
                  display: true,
                  labelString: 'Price',
                }
              }, {
                id: 'marketCapVal',
                type: 'linear',
                position: 'right',
                scaleLabel: {
                  display: true,
                  labelString: 'Market Cap',
                }
              }
            ],
              xAxes: [
                  {
                    ticks: {
                        autoSkip: true,
                      maxTicksLimit: 12,
                      callback: function(label) {
                        if (/\s/.test(label)) {
                          return label.split(" ");
                        }else{
                          return label;
                        }              
                      }
                    }
                  }
                ]
            },
            tooltips: {
              mode: "index",
              intersect: false,
            },
            hover: {
              mode: "index",
              intersect: false,
            }
          }}
        />
      </div>
    );
  }
}

export default withRouter(Chart);
