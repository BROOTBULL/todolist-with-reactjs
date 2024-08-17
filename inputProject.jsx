import axios from "axios";


async function handleSubmit()
{
    try {
        await axios.post(`http://localhost:3000/`,);
        console.log("axios post")

    } catch (error) {
        console.error('Error posting data:', error);
    }
}


function InputProjects()
{
    return(
<>
<form onSubmit={handleSubmit}>
    <input type="text" name="projectName" id="InputProject" />
</form>
</> 
)
}
export default InputProjects