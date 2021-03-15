import React, { Component } from "react";
import { withRouter } from "next/router";
import { Doughnut } from "react-chartjs-2";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: [],
        datasets: [],
      },
    };
  }

  getChartData = (canvas) => {
    const ctx = canvas.getContext("2d");

    var width = canvas.width,
      height = canvas.height;
    var fontSize = (height / 114).toFixed(2);
    ctx.font = fontSize + "em Verdana";
    var text = "82%",
      textX = Math.round((width - ctx.measureText(text).width) / 2),
      textY = height / 2;
    // ctx.fillText(text, textX, textY);

    let data = {
      labels: ["Index 1", "Index 2"],
      // text: ctx.fillText('333', textX, textY),
      datasets: [
        {
          data: [100, 300],
          backgroundColor: ["#048D6F", "#C2F9ED"],
          hoverBackgroundColor: ["#115249", "#C2F9ED"],
        },
      ],
    };

    return data;
  };

  render() {
    return (
      <div className="pie-chart mb-3">
        <div className="pie-label ">
          <div>
            <p className="value">2021</p>
            <p className="label-text">No. of data</p>
          </div>
        </div>
        <Doughnut
          id="lineChart"
          style={{ width: "100%" }}
          data={this.getChartData}
          height={60}
          width={80}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            legend: { position: "bottom" },
            title: {
              display: true,
              text: "Title",
            },
            cutoutPercentage: 70,
          }}
        />
      </div>
    );
  }
}

export default withRouter(Chart);

// import React from 'react';
// import {Doughnut} from 'react-chartjs-2';
// import { withRouter } from "next/router";

// Chart.types.Doughnut.extend({
// 	name: "DoughnutTextInside",
// 	showTooltip: function() {
// 		this.chart.ctx.save();
// 		Chart.types.Doughnut.prototype.showTooltip.apply(this, arguments);
// 		this.chart.ctx.restore();
// 	},
// 	draw: function() {
// 		Chart.types.Doughnut.prototype.draw.apply(this, arguments);

// 		var width = this.chart.width,
// 			height = this.chart.height;

// 		var fontSize = (height / 114).toFixed(2);
// 		this.chart.ctx.font = fontSize + "em Verdana";
// 		this.chart.ctx.textBaseline = "middle";

// 		var text = "82%",
// 			textX = Math.round((width - this.chart.ctx.measureText(text).width) / 2),
// 			textY = height / 2;

// 		this.chart.ctx.fillText(text, textX, textY);
// 	}
// });

// var data = [{
// 	value: 30,
// 	color: "#F7464A"
// }, {
// 	value: 50,
// 	color: "#E2EAE9"
// }, {
// 	value: 100,
// 	color: "#D4CCC5"
// }, {
// 	value: 40,
// 	color: "#949FB1"
// }, {
// 	value: 120,
// 	color: "#4D5360"
// }];

// var DoughnutTextInsideChart = new Chart($('#myChart')[0].getContext('2d')).DoughnutTextInside(data, {
// 	responsive: true
// });

// const data = {
// 	labels: [
// 		'Red',
// 		'Green',
// 		'Yellow'
// 	],
// 	datasets: [{
// 		data: [300, 50, 100],
// 		backgroundColor: [
// 		'#FF6384',
// 		'#36A2EB',
// 		'#FFCE56'
// 		],
// 		hoverBackgroundColor: [
// 		'#FF6384',
// 		'#36A2EB',
// 		'#FFCE56'
// 		]
// 	}],
//   text: '23%'
// };

// class ChartEx extends React.Component {

//   render() {
//     return (
//       <div>
//         <h2>React Doughnut with Text Example</h2>
//         <Doughnut data={data} />
//       </div>
//     );
//   }
// };

// export default withRouter(ChartEx);
