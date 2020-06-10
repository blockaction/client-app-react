import React, { Component } from "react";
import { withRouter } from "next/router";
import { Bar, Line, Pie } from "react-chartjs-2";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Volume",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: [
              "rgba(38, 14, 126, 0.2)",
              "rgba(46, 126, 14, 0.2)",
              "rgba(44, 158, 167, 0.2)",
              "rgba(143, 13, 30, 0.2)",
              "rgba(139, 167, 15, 0.2)",
              "rgba(195, 19, 211, 0.2)",
            ],
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [65, 59, 80, 81, 56, 55, 40],
          },
        ],
      },
    };
  }

  render() {
    const { chartData } = this.state;
    return (
      <div className="chart-container card mb-3">
        <Bar
          style={{ width: "100%" }}
          data={chartData}
          // height={300}
          // width={800}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            title: {
              display: true,
              text: "Ethereum Bar Chart",
            },
            legend: {
              display: true,
              position: "bottom",
              fontSize: 25,
            },
            scales: {
              xAxes: [
                {
                  stacked: true,
                },
              ],
              yAxes: [
                {
                  stacked: true,
                },
              ],
            },
          }}
        />
      </div>
    );
  }
}

export default withRouter(Chart);
