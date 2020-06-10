import React,  {Component} from 'react';
import { withRouter } from "next/router";
import {Bar, Line, Pie} from 'react-chartjs-2';
import moment from "moment";

let color = ["#ff6384", "#5959e6", "#2babab", "#8c4d15", "#8bc34a", "#607d8b", "#009688"];

class Chart extends Component{

    constructor(props){
        super(props);
    }

  // isMobileDevice = () => {
  //     return ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  // }
   
    render() {
        const { participationData } = this.props;
        let chartData = {
          labels: participationData.timestamp,
          datasets: [
            {
              label: 'Validator Participation Rate',
              yAxisID: 'global_participation',

               fill: false,
              // lineTension: 0.1,
              // fillColor: "rgba(220,220,220,0.2)",
              // strokeColor: "rgba(220,220,220,1)",
              // pointColor: "rgba(220,220,220,1)",
              // pointStrokeColor: "#fff",
              // pointHighlightFill: "#fff",
              // pointHighlightStroke: "rgba(220,220,220,1)",
              backgroundColor: 'transparent',
              borderColor: color[1],
              pointBackgroundColor: color[1],
              pointBorderColor: color[1],
              pointHoverBackgroundColor: color[1],
              pointHoverBorderColor: color[1],

              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: participationData.global_participation
              // data: [28, 48, 40, 19, 86, 28, 48, 40, 19, 86, 28, 48, 40, 19, 86, 28, 48, 40, 19, 86]
            },
            {

              label: 'Voted Ether (ETH)',
              yAxisID: 'voted_ether',
              fill: false,
              // lineTension: 0.1,
              // fillColor: "rgba(151,187,205,0.2)",
              // strokeColor: "rgba(151,187,205,1)",
              // pointColor: "rgba(151,187,205,1)",
              // pointStrokeColor: "#fff",
              // pointHighlightFill: "#fff",
              // pointHighlightStroke: "rgba(151,187,205,1)",

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
              data: participationData.voted_ether
              // data: [15, 5, 60, 71, 86, 95, -30, 50, 60, 70, 0, 9, 40, 20, 100, 70, 55, 66, 88, 20, 21, 41, 51, 8],
            },
          ]
      }
          
        return(
           <div className='chart-container line-chart card mb-3'>
              <Line
               id="lineChart"
               style={{width:'100%'}}
                data={chartData}
                // height={30%}
                // width={80}
                options={{ 
                  initialize: function (data) {
                    Chart.types.Line.prototype.initialize.apply(this, arguments);
            
                    // keep a reference to the original clear
                    this.originalClear = this.clear;
                    this.clear = function () {
            
                        this.originalClear();
            
                        // 1 x scale unit
                        var unitX = this.datasets[0].points[1].x - this.datasets[0].points[0].x;
            
                        var yTop = this.scale.startPoint;
                        var yHeight = this.scale.endPoint - this.scale.startPoint;
            
                        // change your color here
                        this.chart.ctx.fillStyle = 'rgba(100,100,100,0.8)';
            
                        // we shift it by half a x scale unit to the left because the space between gridline is actually a shared space
                        this.chart.ctx.fillRect(this.datasets[0].points[5].x - 0.5 * unitX, yTop, unitX * 5, yHeight);
                        this.chart.ctx.fillRect(this.datasets[0].points[15].x - 0.5 * unitX, yTop, unitX * 5, yHeight);
                    }
                   },
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                        display: true,
                        text: 'Network Participation Chart',
                    },
                    legend:{
                        display:true,
                        position:'bottom',
                        fontSize:25
                    },
                    scales: {
                        xAxes: [{
                            stacked: true
                        }],
                        yAxes: [{
                            stacked: true
                        }]
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                          label: function(tooltipItem, data, index) {
                            var value = Math.round(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] * 100) / 100
                            var label = data.datasets[tooltipItem.datasetIndex].label
                            value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            return label + ' ' + value;
                          },
                          title: function(tooltipItem, data, index) {
                            return tooltipItem[0].label.split(',')[0] + ' (UTC), '+ tooltipItem[0].label.split(',')[1];
                        }
                      }
                     },
                     hover: {
                        mode: 'index',
                        intersect: false
                     },
                     scales: {
                        yAxes: [{
                          gridLines: {
                            drawOnChartArea: false
                        },
                          id: 'global_participation',
                          type: 'linear',
                          position: 'left',
                          scaleLabel: {
                            display: true,
                            labelString: 'Validator Participation Rate',
                          }
                        }, {
                          gridLines: {
                            drawOnChartArea: false
                        },
                          id: 'voted_ether',
                          type: 'linear',
                          position: 'right',
                          ticks: {
                            // Abbreviate the Thousands
                            // callback: function(value, index, values) {
                            //     return value / 1e3 + 'K';
                            // }
                          },
                          scaleLabel: {
                            display: true,
                            labelString: 'Voted Ether (ETH)',
                          },
                     
                        }],
                        xAxes: [
                            {
                              gridLines: {
                                drawOnChartArea: false
                               },  
                              ticks: {
                                // display: !this.isMobileDevice(),
                                autoSkip: true,
                                maxTicksLimit: 8,
                                callback: function(label) {
                                  const customLabel =[label[1]]
                                  // const customLabel =[moment(label[0]).format('HH:mm')+ '    ',label[1]]
                                  // const customLabel = [label[0].split(" ")[1].slice(0, -3)+'    ', label[1]]
                                  return customLabel;
                                  // return label[0].split(" ")[1].slice(0, -3) +'\n' + label[1];
                                  // if (/\s/.test(label)) {
                                  //   return label.split(" ")[1].slice(0, -3);
                                  // }else{
                                  //   return label;
                                  // }              
                                }
                              }
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