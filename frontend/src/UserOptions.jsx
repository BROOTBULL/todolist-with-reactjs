import {Link} from "react-router-dom"
import { authStore } from "../store/auth.store"
export default function UserOptions()
{

const {logout}=authStore()
    return(
        <>
        <div style={{display:"none"}} className="UserOptions">

        <Link to="/" onClick={()=>logout()} className="text sectionEditOption delete">Logout</Link>

        </div>
        </>
    )
}