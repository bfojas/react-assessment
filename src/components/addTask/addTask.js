import React, {Component} from 'react'
import Tasks from '../tasks/tasks'
class AddTask extends Component {
    constructor(){
        super()
        this.state={
            id: 1,
            newTask:' ',
            taskList: []
        }
    }

    changeHandle=(e)=>{
        // console.log('e', e)
        this.setState({
            [e.name]:e.value 
        })
    }

    deleteTask = (taskId) =>{

        let newList = this.state.taskList.filter(val=>
            val.taskId !== taskId
            )
        this.setState({
            taskList: newList
        })
    }

    completeTask = (taskId) => {
        const {taskList} = this.state
        let newList = taskList.slice(0, taskList.length)
        newList.forEach(val=>{
            if(val.taskId === taskId)
            {val.completed = 'line-through';
            val.button = true}
        })
        this.setState({taskList: newList})

    }

    submitTask=()=>{
        let newlist= [...this.state.taskList, 
            {taskName: this.state.newTask, 
            taskId: this.state.id,
            completed: 'none',
            button: false}]
        let newId = this.state.id + 1
        this.setState({id: newId, taskList: newlist,
        newTask:''})
    }

    render(){
        return(
            <div>
                <div className="addTask">
                    <h1>TO-DO:</h1>
                    <input value={this.state.newTask} name='newTask' type="text" onChange={e=>{
                        this.changeHandle(e.target)}}/>
                    <button onClick={()=>this.submitTask()}>Submit</button>
                </div>
                <Tasks completeTask={this.completeTask} deleteTask={this.deleteTask} taskList={this.state.taskList}/>
            </div>
        )
    }
}

export default AddTask