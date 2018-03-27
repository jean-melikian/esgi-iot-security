import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { subscribeToTimer }  from './script/SubscribeSocket';
import Chart  from './component/chart';


// import MessageForm from "./component/MessageForm"
// import MessageList from "./component/MessageList"




class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      value: '',
      temperatures:[1,2,3,4]
    };

    this.updateStorage = this.updateStorage.bind(this);
    //this.updateState = this.updateState.bind(this);


    subscribeToTimer((err, value) => this.setState({value}),this.updateStorage);
  }

  /*updateState(){
      let tmps = []
      let results =  localStorage.getItem("results")
      for (let record in results){
        tmps.push(results[record].tmp)
      }
      this.setState({temperatures:tmps})
    }*/

   updateStorage(result){
    let results = localStorage.getItem("results")
    let tmps = this.state.temperatures

    if(results !== undefined && results != null){
      results = JSON.parse(results)
      results.push(result)
    }else{
      results = []
      results.push(result)
    }
    localStorage.setItem("results",JSON.stringify(results))


    tmps.push(JSON.parse(result).tmp)
    this.setState({temperatures:tmps})
  }

  render() {
    console.log("render");
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            {this.state.value}
          </p>
        <Chart data={this.state.temperatures}/>
        </div>
    );
  }
}

export default App;
