import React, {Component} from 'react'
import Tasks from '../tasks/tasks'
import {addTask, updateTask, inputTask} from '../../ducks/reducer'
import {connect} from 'react-redux'

class AddTask extends Component {
    constructor(){
        super()
        this.state={
            // id: 1,
            // newTask:' ',
            // taskList: []
        }
    }

    changeHandle = (e) => {
        // console.log('e', e)
        this.props.inputTask(e.value) 
        
    }

    deleteTask = (taskId) =>{

        let newList = this.props.taskList.filter(val=>
            val.taskId !== taskId
            )
        this.props.updateTask(newList)
    }

    completeTask = (taskId) => {
        const {taskList} = this.props
        let newList = taskList.slice(0, taskList.length)
        newList.forEach(val=>{
            if(val.taskId === taskId)
            {val.completed = 'line-through';
            val.button = true}
        })
        this.props.updateTask(newList)

    }

    submitTask=()=>{
        let newlist= [...this.props.taskList, 
            {taskName: this.props.newTask, 
            taskId: this.props.id,
            completed: 'none',
            button: false}]
        // let newId = this.props.id + 1
        this.props.addTask({taskList: newlist,
        newTask:''})
    }

    render(){
        return(
            <div>
                <div className="addTask">
                    <h1>TO-DO:</h1>
                    <input value={this.props.newTask} type="text" onChange={e=>{
                        this.changeHandle(e.target)}}/>
                    <button onClick={()=>this.submitTask()}>Submit</button>
                </div>
                <Tasks completeTask={this.completeTask} deleteTask={this.deleteTask} 
                taskList={this.props.taskList}/>
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
    addTask, updateTask, inputTask
}


export default connect(mapStateToProps, mapDispatchToProps)(AddTask)