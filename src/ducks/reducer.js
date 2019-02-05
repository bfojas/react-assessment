const INITIAL_STATE={
    taskList:[],
    id:1,
    newTask:''
}

const UPDATE_TASK = 'UPDATE_TASK';
const ADD_TASK = 'ADD_TASK';
const INPUT_TASK = 'INPUT_TASK'


export default function reducer (state= INITIAL_STATE, action) {

    switch(action.type){
        case INPUT_TASK:
            return Object.assign({},state, {newTask: action.payload})
        case UPDATE_TASK:
            return Object.assign({},state,{taskList: action.payload})
        case ADD_TASK:
            return Object.assign({}, state,
                {taskList: action.payload.taskList,
                id: state.id + 1,
                newTask: action.payload.newTask
                })
        default: return state
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
        type: ADD_TASK,
        payload: task
    }
}

export function updateTask (list){
    return {
        type: UPDATE_TASK,
        payload: list
    }
}

