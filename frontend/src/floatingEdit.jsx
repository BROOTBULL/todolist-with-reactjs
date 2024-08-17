import $ from "jquery"
import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";





function handleEdit()
{
  $(".editform").slideToggle(120);
  $(".sideboxOptions").slideUp(120);
  $("#edit_title").focus()
}


function handleLeavesidebox()
{   
  $(".sidebox").removeClass("sideboxOpen");
  $(".sideboxOptions").slideUp(120);
  $(".editform").slideUp(120);
  
}



  
  



function FloatingEditBox(props)
{
    

    const id=props.Id;

    const [editData, setEditData] = useState({
        title:"",
        description:""
      });
    

    

function handledelete()
{

  if (id) {
    axios.delete(`http://localhost:3000/tasks/${id}`)
      .then(response => {
        console.log('Task deleted successfully:', response.data);
        props.fetchTasks(); // Refresh the task list
      })
      .catch(error => {
        console.error('Error updating task:', error);
      });
  } else {
    console.error('ID or edit data is missing.');
  }



  $(".editform").slideUp(120);
  $(".sideboxOptions").slideUp(120);
  $(".sidebox").removeClass("sideboxOpen");
}





function handleSubmit(event) 
{

 event.preventDefault()
 console.log(editData)
 
 if (id && editData) {
  axios.put(`http://localhost:3000/tasks/${id}`, editData)
    .then(response => {
      console.log('Task updated successfully:', response.data);
      setEditData({
        title:"",
        description:""
      })
      props.fetchTasks(); // Refresh the task list
    })
    .catch(error => {
      console.error('Error updating task:', error);
    });
} else {
  console.error('ID or edit data is missing.');
}



$(".sidebox").removeClass("sideboxOpen");
$(".editform").slideUp(120);

}


    return(
        <div className="sidebox" onMouseLeave={handleLeavesidebox} >
        <div className="text sideboxOptions" onClick={handleEdit} style={{display:"none"}}>Edit
         
        </div>
 
           <form
             className="editform"
             onSubmit={handleSubmit}
             style={{ display: "none" }}
           >
               
             <input
               id="edit_title"
               className="edit-title edit inputbox"
               onChange={(e) => setEditData({ ...editData, title: e.target.value })}
               name="edit_title"
               value={editData.title}
               placeholder="Title"
               type="text"
               autoComplete="off"
               required
             />
             <textarea
               className="edit-content edit inputbox"
               onChange={(e) => setEditData({ ...editData, description: e.target.value })}
               name="edit_content"
               value={editData.description}
               placeholder="description"
               type="text"
               autoComplete="off"
             />
             <button className="editbtn">edit</button>
           </form>
           <h3 className="text sideboxOptions delete" onClick={handledelete} style={{display:"none"}}>Delete<i className='bx bxs-x-square'></i></h3>
         </div>
    )
}





FloatingEditBox.propTypes={
  Id: PropTypes.string,
  fetchTasks:PropTypes.func.isRequired
}

export default FloatingEditBox