import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  addTaskAction,
  deleteTaskAction,
  getTaskAction,
} from "../redux/actions/Actions";
import TaskList from "./TaskList";
import Update from "./Update";
import { useParams } from "react-router-dom";
function Dashboard() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [Data, updateData] = useState({});
  const [Array, setArray] = useState([]);
  const [input, setInput] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const usersId = localStorage.getItem("userId");

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const newTask = {
        title: input.title,
        description: input.description,
        user: usersId,
      };
      const success = await dispatch(addTaskAction(newTask));
      if (success) {
        setInput({
          title: "",
          description: "",
        });
        toast.success("Task added successfully");
        fetchTasks();
      } else {
        toast.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task");
    }
  };

  const deleteId = async (taskId) => {
    
    try {
      console.log("delete button click")
      const deleteTask = await dispatch(deleteTaskAction(taskId));
      if (deleteTask) {
        toast.success("Task deleted successfully");
        fetchTasks();
      } else {
        toast.error("Failed to delete the task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete the task");
    }
  };

  const fetchTasks = async () => {

    try {
      const tasks = await dispatch(getTaskAction(id));
      if (tasks) {
        setArray(tasks);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const update = (value) => {
    const task = Array[value];
    updateData(task); 
  };

  useEffect(() => {
    if (usersId) {
      fetchTasks();
    }
  }, [usersId]);

  const show = (value) => {
    document.getElementById("task-update").style.display = value;
  };
  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card rounded-3">
                <div className="card-body p-4">
                  <h4 className="text-center my-3 pb-3">Task planning</h4>
                  <form
                    className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2"
                    onSubmit={addTask}
                  >
                    <div className="col-12">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="form1"
                          name="title"
                          value={input.title}
                          onChange={handleChange}
                          className="form-control"
                        />
                        <label className="form-label" htmlFor="form1">
                          Enter a task here
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="form1"
                          name="description"
                          value={input.description}
                          onChange={handleChange}
                          className="form-control"
                        />
                        <label className="form-label" htmlFor="form1">
                          Enter a description
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary">
                        Add
                      </button>
                    </div>
                    <div className="col-12">
                      {/* <button
                        type="button"
                        className="btn btn-warning"
                        onClick={fetchTasks}
                      >
                        Get tasks
                      </button> */}
                    </div>
                  </form>
                  <div className="Task-body">
                    <div className="container-fluid">
                      <div className="row">
                        {Array &&
                          Array.map((item, index) => (
                            <div
                              className="col-lg-3 col-8 mx-5 my-2"
                              key={index}
                            >
                              <TaskList
                                title={item.title}
                                description={item.description}
                                id={item._id}
                                onDelete={deleteId}
                                display={show}
                                updateId={index}
                                toUpdate={update}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="task-update" id="task-update">
                    <Update
                      display={show}
                      taskId={Data}
                      setArray={setArray}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
