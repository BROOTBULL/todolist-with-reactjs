import $ from "jquery"
import axios from "axios";
import PropTypes from "prop-types";
import { todoStore } from "../store/todo.store";





function SectionEditBox(props)
{
  const URL="http://localhost:3000";
  const {fetchSections,ProjectSelected}=todoStore();


  function handleLeaveEditbox()
  {   
    $(`.sectionEditBox`).removeClass("sideboxOpen");
    $(`.sectionBox .sectionEditOption`).slideUp(120);
    
  }
  

  function handleEdit()
{
  $(".sectionBox .sectionEditOption").slideUp(120);
  $(`.sectionEditBox`).removeClass("sideboxOpen");
  $(`.EditsectionName.${props.section}`).focus()
}


  

async function handledelete()
{

  
    await axios.delete(`${URL}/${ProjectSelected}/${props.section}`)
      .then(response => {
        console.log('Section deleted successfully:', response.data);
        fetchSections()
      })
      .catch(error => {
        console.error('Error updating task:', error);
        
      });





  $(".sectionBox .sectionEditOption").slideUp(120);
  $(".sectionEditBox").removeClass("sideboxOpen");
}



    return(
        <div  className={'sectionEditBox '+ props.section} onMouseLeave={handleLeaveEditbox} >
        <div className="text sectionEditOption " onClick={handleEdit} style={{display:"none"}}>Edit</div>
        <div className="text sectionEditOption delete" onClick={handledelete} style={{display:"none"}}>Delete<i className='bx bx-trash'></i></div>
         </div>
    )
}





SectionEditBox.propTypes={
  section: PropTypes.string,
  projectName: PropTypes.string,
  DeleteSection:PropTypes.func
}

export default SectionEditBox