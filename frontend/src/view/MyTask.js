import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdAdd, MdDelete, MdModeEditOutline,MdPostAdd} from "react-icons/md";
import Card from 'react-bootstrap/Card';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ModalFooter from "react-bootstrap/esm/ModalFooter";

const UserTasks = () => {
  const [user, setUser] = useState([]);
  const [addTask, setAddTask] = useState({ title: "", description: "" });
  const [editTask, setEditTask] = useState({ id: "", title: "", description: "" });
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setAddShowModal] = useState(false);
  const userid = localStorage.getItem("userId");

  const sendRequest = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/task/getuser/${userid}`);
      const data = res.data;
      console.log(data, "data");
      return data;
    } catch (error) {
      console.error("Error fetching user tasks:", error);
      return null;
    }
  };

  const sendAddRequest = async () => {
    try {
      const addNewTask = {
        title: addTask.title,
        description: addTask.description,
        user: userid,
      };
      const res = await axios.post("http://localhost:5000/api/task/add", addNewTask);
      console.log(res.data);
      setUser((prevUser) => [...prevUser, res.data.task]);
      setAddTask({ title: "", description: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRequest = async (taskId) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/task/${taskId}`);
      console.log(res.data);
      setUser((prevUser) => prevUser.filter((task) => task._id !== taskId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (taskId) => {
    deleteRequest(taskId);
    console.log("delete", taskId);
  };

  const handleEdit = (task) => {
    setEditTask({ id: task._id, title: task.title, description: task.description });
    setShowModal(true);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    try {
      sendAddRequest();
      console.log("added successfully");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const editRequest = async (taskId) => {
    const updatedTask = {
      title: editTask.title,
      description: editTask.description,
    };
    try {
      const res = await axios.put(`http://localhost:5000/api/task/update/${taskId}`, updatedTask);
      console.log(res.data);
      setUser((prevUser) =>
        prevUser.map((task) => (task._id === taskId ? res.data.task : task))
      );
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSubmit = () => {
    editRequest(editTask.id);
  };

  useEffect(() => {
    sendRequest().then((data) => {
      if (data && data.user) {
        setUser(data.user);
      }
    });
  }, []);

  return (
    <div className="container" style={{ maxHeight: "50%", maxWidth: "50%", backgroundColor: "aliceblue" }}>
      <div>
      <div className="col md-4" style={{display:"flex",alignItems:"inherit",flexDirection:"row",marginBottom:'auto'}}>
        <h3>Add your Task </h3>
        <Button style={{alignSelf:"flex-end",marginLeft:'auto'}} onClick={setAddShowModal}><MdPostAdd/></Button>
        </div>
      <Modal show ={showAddModal} onHide={() => setAddShowModal(false)} centered>
      <Modal.Header closeButton>

      </Modal.Header>
        <form onSubmit={handleAddTask}>
<Modal.Body><input
            label="Title"
            value={addTask.title}
            placeholder="title"
            name="title"
            onChange={handleChange}
            className="form-control mb-3"
            padding='2px'
            marginBottom='2px'
            margin='auto'
            required
          />
          
          <input
            label="Description"
            value={addTask.description}
            placeholder="description"
            name="description"
            onChange={handleChange}
            className="form-control mb-3"
            padding='2px'
            margin='auto'
            required
          /></Modal.Body>
          <ModalFooter>
          <button className="btn btn-primary" type="submit"><MdAdd /> </button>
          <Button variant="secondary" onClick={() => setAddShowModal(false)}>
            Close
          </Button>
          </ModalFooter>
         
        </form>
        </Modal>
        {user.map((task, index) => (
          <div key={index} style={{ display:"flex",flexDirection:"column" ,margin:'auto' }}>
           <Card className='col m-2 ' style={{ width: '25rem',gap:"2px"}} >
      
      <Card.Body>
        <Card.Title>{task.title}</Card.Title>
        <Card.Text>
        <p>{task.description}</p>
        </Card.Text>
        <button className="btn btn-secondary m-2"  variant="outlined" onClick={() => handleEdit(task)}>
              <MdModeEditOutline />
            </button>
            <button className="btn btn-secondary" onClick={() => handleDelete(task._id)}>
              <MdDelete />
            </button>
      </Card.Body>
    </Card>
          </div>
        ))}
      </div>
      <Modal  show={showModal} onHide={() => setShowModal(false)} >
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            label="Title"
            value={editTask.title}
            name="title"
            onChange={handleEditChange}
            className="form-control mb-3"
            required
          />
          <input
            label="Description"
            value={editTask.description}
            name="description"
            onChange={handleEditChange}
            className="form-control mb-3"
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserTasks;
