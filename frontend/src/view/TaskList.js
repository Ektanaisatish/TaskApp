import React from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPenToSquare } from "react-icons/fa6";
import Card from 'react-bootstrap/Card';
  const TaskList = ({ title, description, onDelete,updateId, id,display , toUpdate}) => {
  return (
    <div className="p-3 Task-Card">
         <div  style={{ display:"flex",flexDirection:"column",gap:"1px",width:"15rem"}}>
           <Card className='col md-2 '  >
      
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
        <p>{description}</p>
        </Card.Text>
        <div className="d-flex justify-content-between">
        <div className="icons" onClick={()=>{
          display("block");
          toUpdate(updateId)
          }}>
          <FaPenToSquare  />
        </div>
        <div className="icons" onClick={()=>{
         onDelete(id);
        }
          }>
          <RiDeleteBin6Line  />
        </div>
      </div>
      </Card.Body>
    </Card>
          </div>
  
    </div>
  );
}
export default TaskList




 
