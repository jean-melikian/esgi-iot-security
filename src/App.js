import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import mqtt from "mqtt"
// import MessageForm from "./component/MessageForm"
// import MessageList from "./component/MessageList"

let client = mqtt.connect({
  host: 'localhost',
  port: 1883,
  connectTimeout: 5000
 });
console.log("aze")
client.on('connect', function () {
  console.log('Oh Glorious Day! I have connected to HiveMQ broker. ')
  client.subscribe('world');
  client.publish('world', 'hello');
});

client.on('message', function (topic, message) {
  console.log(topic);
  console.log(message.toString());
  client.end();
});


class App extends Component {
  addMessage(message){
    const {mqtt} = this.props;
    mqtt.publish('@near/demo', message);
  }

  render() {


    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
    );
  }
}

export default App;
