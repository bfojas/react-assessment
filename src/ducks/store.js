import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import promise from 'redux-promise-middleware'

export default createStore(reducer, 
    applyMiddleware(promise)
    // ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )