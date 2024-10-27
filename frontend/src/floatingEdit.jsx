import $ from "jquery"
import { useState,useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { todoStore } from "../store/todo.store";






  
  



function FloatingEditBox({section,sectionId})
{
    

    const URL="http://localhost:3000";
    const {ProjectSelected,passedValues,EditTask,deleteTask}=todoStore();

    
    const id=passedValues.id;
    // const id=sectionId;
    const [editData, setEditData] = useState({
      title: passedValues.title,
      description: passedValues.content,
      });
      

    
    useEffect(() => {
      setEditData({
        title: passedValues.title,
        description: passedValues.content,
      });
    }, [passedValues.title, passedValues.content]);

    



      function handleEdit()
      {
        $(`.${section} .editform`).slideToggle(120);
        $(`.${section} .sideboxOptions`).slideUp(120);
        $(`.${section}.sidebox #edit_title`).focus()
      }
      
      
      function handleLeavesidebox()
      {   
        $(`.${section}.sidebox`).removeClass("sideboxOpen");
        $(`.${section} .sideboxOptions`).slideUp(120);
        $(`.${section} .editform`).slideUp(120);
        
      }
      




function handledelete()
{

  if (id) {
    deleteTask(sectionId,id)

    axios.delete(`${URL}/api/${ProjectSelected}/${section}/${id}`)
      .then(response => {
        console.log('Task deleted successfully:', response.data);
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

 EditTask(sectionId,id,editData)

 
 if (id && editData) {
  axios.put(`${URL}/api/${ProjectSelected}/${section}/${id}`, editData)
    .then(response => {
      console.log('Task updated successfully:', response.data);
      setEditData({
        title:"",
        description:""
      })
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
        <div className={section+" sidebox"} onMouseLeave={handleLeavesidebox} >
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
               value={editData.description.replace(/<[^>]*>/g, '\n')}
               placeholder="description"
               type="text"
               autoComplete="off"
             />
             <button className="editbtn">edit</button>
           </form>
           <h3 className="text sideboxOptions delete" onClick={handledelete} style={{display:"none"}}>Delete<i className='bx bx-trash'></i></h3>
         </div>
    )
}





FloatingEditBox.propTypes={
  section: PropTypes.string,
  sectionId: PropTypes.string,
}

export default FloatingEditBox