import { useState } from "react";
import UserContext from "./UserContext";

 // eslint-disable-next-line react/prop-types
 const UserContextProvider = ({Children})=>{
    const [userId, setUserId] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    return(
        <UserContext.Provider value={{userId, setUserId,isAdmin, setIsAdmin}}>
           {Children}
        </UserContext.Provider>
    );
        
 }

 export default UserContextProvider;