const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const LOGIN_API = BASE_URL + "/login";
const SIGNUP_API = BASE_URL + "/signup";
const GET_TASKS_DATA_API = BASE_URL + '/gettododata';
const ADD_TODO_API = BASE_URL + '/addtodo';
const DELETE_TODO_API = BASE_URL + '/deletetodo';
const UPDATE_TODO_API = BASE_URL + '/updatetodo'

export { LOGIN_API, SIGNUP_API,GET_TASKS_DATA_API ,ADD_TODO_API,DELETE_TODO_API,UPDATE_TODO_API};
