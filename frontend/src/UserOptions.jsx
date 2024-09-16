import {Link} from "react-router-dom"
export default function UserOptions()
{


    return(
        <>
        <div style={{display:"none"}} className="UserOptions">

        <Link to="/SignUp"  className="text sectionEditOption delete">Logout</Link>

        </div>
        </>
    )
}