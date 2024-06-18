import mongoose from "mongoose";
import Task from "../model/Task.js";
// import User from "../model/User.js";
// //add task
// export const addTask = async (req, res, next) => {
//   next()
//   const { title, description, user } = req.body;
//   const task = new Task({
//     title,
//     description,
//     user,
//   });
//   try {
//     await task.save();
//   } catch (err) {
//     return console.log(err);
//   }
//   return res.status(200).json({ task });
// };


export const addTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json({ task });
  } catch (error) {
    console.error('Error adding task:', error);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};
//fetch task with specific id
export const getById = async (req, res, next) => {
  const id = req.params.id;

  let task;
  try {
    console.log(id);
    task = await Task.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!task) {
    return res.status(500).json({ message: "Unable to find task no task " });
  }
  return res.status(200).json({ task });
};
//update task title and description
// export const updateTask = async (req, res, next) => {
//   next()
//   const { title, description } = req.body;
//   const taskId = req.params.id;
//   let task;
//   try {
//     task = await Task.findByIdAndUpdate(taskId, {
//       title,
//       description,
//     });
   
//   } catch (error) {
//     return console.log(error);
//   }
//   if (!task) {
//     return res.status(500).json({ message: "Unable to update task" });
//   }
//   return res.status(200).json({ task :'task update successfully'});
// };
export const updateTask = async (req, res) => {
  const { title, description } = req.body;
  const taskId = req.params.id;
  if (!taskId) {
    return res.status(400).json({ message: "Task ID is required" });
  }
  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { title, description },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


//delete task
// export const deleteTask = async (req, res, next) => {
//   next()
//   const id = req.params.id;
//   console.log(id);
//   let task;
//   try {
//     task = await Task.findByIdAndDelete(id).populate("user");
//     await task.user.tasks.pull(task);
//     await task.user.save();
//   } catch (err) {
//     console.log(err);
//   }
//   if (!task) {
//     return res.status(500).json({ message: "Unable to delete" });
//   }
//   return res.status(200).json({ message: "deleted successfully" });
// };
//getting all task of specific user
export const deleteTask = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  let task;

  try {
    task = await Task.findByIdAndDelete(id).populate("user");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.user.tasks.pull(task);
    await task.user.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to delete" });
  }

  return res.status(200).json({ message: "Deleted successfully" });
};

export const getByUserId = async (req, res) => {

  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  let page = parseInt(req.query.page) || 1;
  const limit = 50;

  try {
    const userTasks = await Task.find({ user: userId })
      .limit(limit)
      .skip((page - 1) * limit);

    if (userTasks.length === 0) {
      return res.status(200).json({ message: "No Task found" });
    }

    return res.status(200).json({ user: userTasks });
  } catch (err) {
    console.error("Error fetching user tasks:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


