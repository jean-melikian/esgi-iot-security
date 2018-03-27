import React, { Component } from 'react';
var LineChart = require('zingchart-react').line;

function simulateLiveData(){

        let serie = [{text : "TEST", values : []}]
        for(var i = 0; i < 20; i++){
            serie[0]['values'].push( Math.floor(Math.random() * 100));
        }
    return {
        serie
    };
}


class Chart extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      chart1val : [],
      data:[{
        text : "Temperatures",
        values : props.data
      }]
    }
    this.changeData = this.changeData.bind(this);
    //Pass function in order to get data from other truc

  }
  componentDidMount(){
        setInterval(this.changeData, 1000);
    }
    //Simulates a change of data.
    changeData (){
        this.setState({
            data : simulateLiveData().serie
        });
    }

  render() {
      console.log("data : ", this.state.data);
      console.log("test : ", this.state.chart1val.serie);

      return (
        <div>
          <LineChart id="chart1" height="300" width="600" series={this.state.chart1val.serie} legend="true" theme="light" title="Hello Line Chart"/>
          <LineChart id="chart2" height="300" width="600" series={this.state.data} legend="true" theme="light" title="Hello Line Chart"/>
        </div>
      );
    }
}

export default Chart
