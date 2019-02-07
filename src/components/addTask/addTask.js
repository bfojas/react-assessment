import React, {Component} from 'react'
import Tasks from '../tasks/tasks'
import {addTask, updateTask, inputTask, getTasks, deleteTask} from '../../ducks/reducer'
import {connect} from 'react-redux'

class AddTask extends Component {
    constructor(props){
        super(props)
        this.state={
            inputHandle: ''
        }
    }

    componentDidMount=()=>{
        this.props.getTasks()
        
    }

    changeHandle = (e) => {
        this.setState({inputHandle:e.value}) 
        
    }


    completeTask = (taskId) => {
        const {taskList} = this.props
        let task = taskList.filter(val=>val.id === taskId)
        task[0].completed = true
        this.props.updateTask(task)
        .then(this.props.getTasks())

    }

    submitTask=()=>{
        this.props.addTask(this.state.inputHandle)
        .then(res=>{this.setState({ inputHandle:""})})
    }

    

    render(){
        return(
            <div className="taskContainer">
                <div className="addTask">
                    <h1>TO-DO:</h1>
                    <input 
                    name="input"
                    value={this.state.inputHandle} 
                    type="text" 
                    onChange={e=>{this.changeHandle(e.target)}}
                    />
                    <button onClick={()=>this.submitTask()}>Submit</button>
                </div>
                <Tasks completeTask={this.completeTask}  
                />
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        taskList: state.taskList,
        id: state.id,
        newTask: state.newTask
    }
}

const mapDispatchToProps = {
    addTask, updateTask, inputTask, getTasks, deleteTask
}


export default connect(mapStateToProps, mapDispatchToProps)(AddTask)