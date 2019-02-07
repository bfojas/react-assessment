import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getTasks, editInputs, deleteTask} from '../../ducks/reducer'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

class Tasks extends Component {

    editTask = (task) => {
        console.log('edt', task)
        axios.put('/edit', task)
        .then(res=>{console.log(res.data)
            this.props.editInputs({task: res.data, display: "flex"})
        })
        .then(this.props.history.push('/edit'))
    }
    render(){
        
        if(this.props.taskList){
        var displayList = this.props.taskList.map(val=>{
            return(
                <div key={val.id} style={{border: 'solid black 2px'}}>
                    <div className="taskName" onClick={()=>this.editTask(val)}
                    // style={{textDecoration:`${val.completed}`}}
                    >
                    {val.title}
                    </div>
                    <div className="buttonContainer">
                    <button className="complete" disabled={val.completed}
                        onClick={()=>this.props.completeTask(val.id)}>Completed</button>
                    <div className="delete" 
                        onClick={()=>this.props.deleteTask(val.id)}>X</div>
                    </div>
                </div>
            )
        })}
    

        let displayClass = !this.props.taskList
        ?"hideList"
        :"displayList"
        
        return(
            
            <div className={displayClass}>
                
                {displayList}
                
            </div>
        )
    }  
}

const mapStateToProps = (state) =>{
    return {
        taskList: state.taskList,
        editHide: state.editHide
    }
}

const mapDispatchToProps ={
    getTasks, editInputs, deleteTask
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tasks))