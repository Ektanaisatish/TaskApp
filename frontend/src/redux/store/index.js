import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loginReducer from '../reducer/AuthReducer'; 
import taskReducer from '../reducer/AuthReducer';

const rootReducer = combineReducers({
  loginSignup: loginReducer,
  task: taskReducer,

});

const store = configureStore({
  reducer: rootReducer,
});

export default store;