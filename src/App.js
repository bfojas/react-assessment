import React, { Component } from 'react';
import './App.css';
import AddTask from './components/addTask/addTask'
import EditTask from './components/editTask/editTask'
import routes from './routes'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <EditTask/>
        <AddTask/> */}
        {routes}
      </div>
    );
  }
}

export default App;
