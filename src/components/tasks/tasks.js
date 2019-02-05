import React, {Component} from 'react'

function Tasks (props){
    let displayList = props.taskList.map(val=>{
        return(
            <div key={val.taskId} style={{border: 'solid black 2px'}}>
                <div className="taskName" style={{textDecoration:`${val.completed}`}}>
                {val.taskName}
                </div>
                <div className="buttonContainer">
                <button className="complete" disabled={val.button}
                    onClick={()=>props.completeTask(val.taskId)}>Completed</button>
                <div className="delete" 
                    onClick={()=>props.deleteTask(val.taskId)}>X</div>
                </div>
            </div>
        )
    })

    let displayClass = !props.taskList
    ?"hideList"
    :"displayList"
    
    return(
        
        <div className={displayClass}>
            
            {displayList}
            
        </div>
    )
        
}

export default Tasks