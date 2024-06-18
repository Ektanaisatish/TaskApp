import axios from 'axios'
import { ADD_URL, API_BASE_URL, GET_DELETE_URL, GET_URL, Login_End, SIGNUP_END, UPDATE_URL} from '../../config/constants';
import { ADD_Task_FAILURE, ADD_Task_SUCCESS, DELETE_TASK_FAILURE, DELETE_TASK_SUCCESS, GET_Task_FAILURE, GET_Task_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_Task_FAILURE, UPDATE_Task_SUCCESS } from './ActionType';
//import toast from 'react-hot-toast'
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
export const signup = (formData) => {
    return async (dispatch) => {
      dispatch({ type: REGISTER_REQUEST });
  
      try {
        const response = await axios.post(`${API_BASE_URL}${SIGNUP_END}`, formData);
        if (response.status === 201) {
        
          dispatch({
            //toast.success("Login Successfully"),
            type: REGISTER_SUCCESS,
          });
        }
      } catch (error) {
        console.error("Error while signing up the user:", error);
        dispatch({
          type: REGISTER_FAILURE,
          payload: error.message,
        });
      }
    };
  };
  export const login = (email, password) => {
    return async (dispatch) => {
      dispatch({ type: LOGIN_REQUEST });
      try {
        const response = await axios.post(`${API_BASE_URL}/${Login_End}`, {
          email,
          password,
        });
  
        if (response && response.data && response.data.token) {
          const token = response.data.token;
          const user = response.data.user;
  
          localStorage.setItem('token', token);
          localStorage.setItem('userData', JSON.stringify(user));
  
          dispatch({
            type: LOGIN_SUCCESS,
            payload: user,
          });
  
          return { token, user };
        } else {
          console.error('Invalid response from the server');
          dispatch({
            type: LOGIN_FAILURE,
            payload: 'Invalid response from the server',
          });
          return { error: 'Invalid response from the server' };
        }
      } catch (error) {
        console.error('Login failed:', error.message);
        dispatch({
          type: LOGIN_FAILURE,
          payload: error.message,
        });
        return { error: error.message };
      }
    };
  };
  
  export const addTaskAction = (task) => {
    return async (dispatch) => {
      try {
        const response = await axios.post(`${API_BASE_URL}${ADD_URL}`, task
        );
        if (response.status === 200) {
          dispatch({ type: ADD_Task_SUCCESS });
          return response.data;
        }
      } catch (error) {
        console.error("Error adding Task:", error);
        dispatch({ type: ADD_Task_FAILURE, payload: error.message });
        throw error;
      }
    };
  };
  
  export const getTaskAction = () => {
    const id =localStorage.getItem("userId")
    return async (dispatch) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/${GET_URL}/${id}`);
        if (response.status === 200) {
          dispatch({ type: GET_Task_SUCCESS });
          return response.data.user;
        }
      } catch (error) {
        console.error("Error fetching Tasks:", error);
        dispatch({ type: GET_Task_FAILURE, payload: error.message });
        throw error;
      }
    };
  };
  
  export const updateTaskAction = (taskId, input) => {
    return async (dispatch) => {
      try {
        await axios.put(`${API_BASE_URL}/${UPDATE_URL}/${taskId}`, input);
        dispatch({ type: UPDATE_Task_SUCCESS });
        return true;
      } catch (error) {
        console.error("Error updating Task:", error);
        dispatch({ type: UPDATE_Task_FAILURE });
        throw error;
      }
    };
  };
  
  export const deleteTaskAction = (taskId) => {
    return async (dispatch) => {
      try {
        const response = await axios.delete(`${API_BASE_URL}/${GET_DELETE_URL}/${taskId}`);
        if (response.status === 200) {
          dispatch({ type: DELETE_TASK_SUCCESS });
          return response.data;
        }
      } catch (error) {
        console.error("Error deleting task:", error);
        dispatch({ type: DELETE_TASK_FAILURE, payload: error.message });
        throw error;
      }
    };
  };