import $ from "jquery"
import axios from "axios";
import PropTypes from "prop-types";
import { todoStore } from "../store/todo.store";





function SectionEditBox({section,sectionId})
{
  const URL="http://localhost:3000";
  const {deleteSection,ProjectSelected}=todoStore();


  function handleLeaveEditbox()
  {   
    $(`.sectionEditBox`).removeClass("sideboxOpen");
    $(`.sectionBox .sectionEditOption`).slideUp(120);
    
  }
  

  function handleEdit()
{
  $(".sectionBox .sectionEditOption").slideUp(120);
  $(`.sectionEditBox`).removeClass("sideboxOpen");
  $(`.EditsectionName.${section}`).focus()
}


  

async function handledelete()
{

  deleteSection(sectionId)
  
    await axios.delete(`${URL}/api/${ProjectSelected}/${section}`)
      .then(response => {
        console.log('Section deleted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating task:', error);
        
      });





  $(".sectionBox .sectionEditOption").slideUp(120);
  $(".sectionEditBox").removeClass("sideboxOpen");
}



    return(
        <div  className={'sectionEditBox optionsBox '+ section} onMouseLeave={handleLeaveEditbox} >
        <div className="text sectionEditOption options " onClick={handleEdit} style={{display:"none"}}>Edit</div>
        <div className="text sectionEditOption options delete" onClick={handledelete} style={{display:"none"}}>Delete<i className='bx bx-trash'></i></div>
         </div>
    )
}





SectionEditBox.propTypes={
  section: PropTypes.string,
  sectionId: PropTypes.string,
}

export default SectionEditBox