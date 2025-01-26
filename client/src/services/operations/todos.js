import { toast } from "react-toastify";
import {
  GET_TASKS_DATA_API,
  ADD_TODO_API,
  DELETE_TODO_API,
  UPDATE_TODO_API,
} from "../apis.js";
import axios from "axios";
async function getTasksData(token) {
  try {
    const res = await axios.get(GET_TASKS_DATA_API, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.data.success) {
      throw new Error("Error fetching todos");
    }
    return res.data.data;
  } catch (err) {
    toast.error(err);
  }
}

async function addTask(data, token) {
  try {
    const res = await axios.post(
      ADD_TODO_API,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.data.success) {
      throw new Error("Error fetching todos");
    }
    return res.data.data;
  } catch (err) {
    console.log(err);
    toast.error(err.res.data.message);
  }
}

async function deleteTodo(id, token) {
  try {
    const res = await axios.delete(DELETE_TODO_API, {
      params: { id },
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (!res.data.success) {
      throw new Error("Error deleting Todo");
    }
    toast.success("Todo Deleted !", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
    toast.error(error.res.data.msg);
  }
}

async function editTodo(id, data, token) {
  try {
    console.log(id)
    const res = await axios.put(
      UPDATE_TODO_API,
      {
        id,
        data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.data.success) {
      throw new Error("Error deleting Todo");
    }
    return res.data.data;
  } catch (err) {
    console.log(err);
    toast.error(err.res.data.msg);
  }
}

export { getTasksData, addTask, deleteTodo, editTodo };
