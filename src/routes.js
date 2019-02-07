import React from "react";
import { Route, Switch } from "react-router-dom";
import AddTask from './components/addTask/addTask'
import EditTask from './components/editTask/editTask'

export default (
    <Switch>
        <Route path="/edit" component={EditTask}/>
        <Route path="/" component={AddTask} exact />
    </Switch>
)