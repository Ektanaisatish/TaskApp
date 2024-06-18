import {
    ADD_Task_SUCCESS,
    ADD_Task_FAILURE,
    DELETE_Task_SUCCESS,
    DELETE_Task_FAILURE,
    GET_Task_SUCCESS,
    GET_Task_FAILURE,
    UPDATE_Task_SUCCESS,
    UPDATE_Task_FAILURE,
  } from "../actions/ActionTypes.js";
  
  const initialState = {
    Tasks: [],
    loading: false,
    error: null,
  };
  
  const TaskReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_Task_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case ADD_Task_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      case DELETE_Task_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case DELETE_Task_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      case UPDATE_Task_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
        };
      case UPDATE_Task_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      case GET_Task_SUCCESS:
        return {
          ...state,
          Tasks: action.Tasks,
          loading: false,
        };
      case GET_Task_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default TaskReducer;