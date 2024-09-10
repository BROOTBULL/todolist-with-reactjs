import useUserInfo from "../Contexts/UserContext"

export default function UserOptions()
{
    const {isLoggedIn,setIsLoggedIn}=useUserInfo()

    return(
        <>
        <div style={{display:"none"}} className="UserOptions">

        <div onClick={()=>setIsLoggedIn(!isLoggedIn)} className="text sectionEditOption delete">Logout</div>

        </div>
        </>
    )
}