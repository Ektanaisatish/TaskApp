import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateTaskAction } from "../redux/actions/Actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL, GET_Task_URL, UPDATE_URL } from "../config/constants";

const Update = ({ display, taskId, setArray }) => {
  const [input, setInput] = useState({
    title: "",
    description: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (taskId) {
      setInput({
        title: taskId.title || "",
        description: taskId.description || "",
      });
    }
  }, [taskId]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };



  
  const handleUpdate = async () => {
    try {
      const success = await dispatch(updateTaskAction(taskId._id, input));
      if (success) {
        toast.success("Task updated successfully");
        display("none");
        setArray((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId._id ? { ...task, ...input } : task
          )
        );
      } else {
        toast.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
    }
  };


  return (
    <div className="p-5 d-flex justify-content-center align-items-start flex-column update">
      <h1>Update your Task</h1>
      <div className="mt-3" style={{ width: "100%" }}>
        <input
          type="text"
          className="form-control mb-3 w-100"
          placeholder="Enter Title"
          name="title"
          value={input.title}
          onChange={handleChange}
        />
        <textarea
          className="form-control mb-3"
          name="description"
          placeholder="Enter Description"
          rows="3"
          value={input.description}
          onChange={handleChange}
        ></textarea>
        <div className="mt-3">
          <button className="btn btn-primary" onClick={()=>{handleUpdate(taskId._id)}}>
            Update
          </button>
          <button
            className="btn btn-danger btn-sm mt-2"
            onClick={() => display("none")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;
