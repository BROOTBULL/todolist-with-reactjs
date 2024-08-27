import $ from "jquery"
import axios from "axios";
import PropTypes from "prop-types";





function SectionEditBox(props)
{

  
  function handleLeaveEditbox()
  {   
    $(`.sectionEditBox`).removeClass("sideboxOpen");
    $(`.sectionEditOption`).slideUp(120);
    
  }
  

  function handleEdit()
{
  $(".sectionEditOption").slideUp(120);
  $(`.sectionEditBox`).removeClass("sideboxOpen");
  $(`.EditsectionName.${props.section}`).focus()
}


  

async function handledelete()
{

  
    await axios.delete(`http://localhost:3000/${props.projectName}/${props.section}`)
      .then(response => {
        console.log('Task deleted successfully:', response.data);
        props.DeleteSection();
      })
      .catch(error => {
        console.error('Error updating task:', error);
        
      });





  $(".sectionEditOption").slideUp(120);
  $(".sectionEditBox").removeClass("sideboxOpen");
}



    return(
        <div  className={'sectionEditBox '+ props.section} onMouseLeave={handleLeaveEditbox} >
        <div className="text sectionEditOption " onClick={handleEdit} style={{display:"none"}}>Edit</div>
        <div className="text sectionEditOption delete" onClick={handledelete} style={{display:"none"}}>Delete<i className='bx bxs-x-square'></i></div>
         </div>
    )
}





SectionEditBox.propTypes={
  section: PropTypes.string,
  projectName: PropTypes.string,
  DeleteSection:PropTypes.func
}

export default SectionEditBox