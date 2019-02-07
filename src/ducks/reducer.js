import axios from 'axios';

const INITIAL_STATE={
    taskList:[],
    id:1,
    newTask:'',
    editInput: {},
    editHide: 'none'
}
const GET_TASKS_FULFILLED = 'GET_TASKS_FULFILLED'
const GET_TASKS = 'GET_TASKS'
const INPUT_TASK = 'INPUT_TASK'
const EDIT_INPUTS = 'EDIT_INPUTS'


export default function reducer (state= INITIAL_STATE, action) {
    console.log('action', action)

    switch(action.type){
        case GET_TASKS_FULFILLED:
            return Object.assign({},state,{taskList: action.payload})
        case INPUT_TASK:
            return Object.assign({},state, {newTask: action.payload})
        case EDIT_INPUTS:
            return Object.assign({},state, 
                {editInput: action.payload.task,
                editHide: action.payload.display})
        default: return state
    }
}

export function getTasks (){
    return {
        type: GET_TASKS,
        payload:
        new Promise((resolve, reject) =>{
            resolve(axios.get('https://practiceapi.devmountain.com/api/tasks')
            .then(
            res=>{
                return res.data
            }))
        })
    }
}

export function inputTask (newTask){
    return {
        type: INPUT_TASK,
        payload: newTask
    }
}

export function addTask (task){
    return {
        type: GET_TASKS,
        payload:
        new Promise((resolve, reject) =>{
            resolve(axios.post('https://practiceapi.devmountain.com/api/tasks', {title: task})
            .then(
            res=>{
                return res.data
            }))
        })
    }
}

export function updateTask (task){
    return {
        type: GET_TASKS,
        payload:
        new Promise((resolve, reject) =>{
            const {id} = task[0]
            resolve(axios.patch(`https://practiceapi.devmountain.com/api/tasks/${id}`, task[0])
            .then(
            res=>{
                return res.data
            }))
        })
    }
}

export function deleteTask (task) {
    return {
        type: GET_TASKS,
        payload:
        new Promise((resolve, reject) =>{
            resolve(axios.delete(`https://practiceapi.devmountain.com/api/tasks/${task}`)
            .then(
            res=>{
                return res.data
            }))
        })
    }
}

export function editInputs (task) {
    return {
        type: EDIT_INPUTS,
        payload: task
    }
}


