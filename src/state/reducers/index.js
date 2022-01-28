import {combineReducers} from 'redux';
import authReducer from './authtReducer';

const reducers = combineReducers({
    auth: authReducer
})

export default reducers;