import { useState } from "react";
import { UserContext } from "./UserContext";
import propTypes from "prop-types"

 export default function ContextProvider({children})
 {

    

    
  const [userId,setUserId]=useState("");
  const [ProjectSelected,setSelectedProject]=useState("");

    return(
        <UserContext.Provider value={{userId,setUserId,ProjectSelected,setSelectedProject}}>
            {children}
        </UserContext.Provider>
    )
 }
ContextProvider.propTypes = {
    children: propTypes.node.isRequired, // Validate that children is a node (valid React element)
  };