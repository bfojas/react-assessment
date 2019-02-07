import React, {Component} from 'react'
import {connect} from 'react-redux'
import { editInputs, updateTask, deleteTask } from '../../ducks/reducer';
import {withRouter, NavLink} from 'react-router-dom'
import axios from 'axios'

class EditTask extends Component {
    constructor(props){
        super(props)
        this.state={
            id: 0,
            title: '',
            description: ''
        }
    }
    componentDidMount = () => {
        axios.get('/get').then(res=>{console.log(res.data)
            this.props.editInputs({task: res.data, display: "flex"})
        })
    }

    changeHandle = (e) =>{
        this.setState({
            [e.name]:e.value
        })
    }

    completeTask = () =>{
        const {editInput} = this.props
        editInput.completed = true
        this.props.updateTask([editInput])
        this.props.history.push('/')
    }

    cancel = () =>{
        this.setState({id:'', title:'', description:''})
        this.props.editInputs({task: this.props.editInput,
            display: 'none'})
        this.props.history.push('/')
    }

    submitEdit = ()=>{
        let editted = this.props.editInput
        if (this.state.title)
        {editted.title = this.state.title}
        if (this.state.description)
        {editted.description = this.state.description}
        this.props.updateTask([editted])
        .then(this.setState({id:'', title:'', description:''}))
        this.props.editInputs({task: this.props.editInput,
            display: 'none'})
        this.props.history.push('/')
    }

    deleteEdit = () =>{
        this.props.deleteTask(this.props.editInput.id)
        this.props.history.push('/')
    }

    render(){
        return(
            <div className="editContainer" 
            // style={{display: this.props.editHide}}
            >
                <div>
                    <NavLink to="/">{`<-- Go Back`}</NavLink>
                </div>
                <div className="editInputs">
                    <div>Title:</div>
                    <input 
                    placeholder={this.props.editInput.title} 
                    value={this.state.title} 
                    name="title" 
                    type="text" 
                    onChange={e=>{this.changeHandle(e.target)}}/>
                    <div>Description:</div>
                    <input 
                    placeholder={this.props.editInput.description} 
                    value={this.state.description} name="description" type="text" onChange={e=>{
                    this.changeHandle(e.target)}}/>
                </div>
                <div className="editButtons">
                    <button onClick={()=>this.submitEdit()}>Save</button>
                    <button onClick={()=>this.cancel()}>Cancel</button>
                    <button onClick={()=>this.deleteEdit()}>Delete</button>
                    <button onClick={()=>this.completeTask()}>Complete</button>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) =>{
    return{
        editInput: state.editInput,
        editHide: state.editHide
    }
}

const mapDispatchToProps = {
    editInputs, updateTask, deleteTask
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditTask))