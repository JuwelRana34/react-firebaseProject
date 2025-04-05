import { useContext } from "react"
import ProfileContext from "../usercontext/ProfileContext"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

      
function Checkuser({children}) {
    const Nvigate = useNavigate()
      const {userData} = useContext(ProfileContext)
      if(userData?.isNewGoogleUser === true){
        toast.warning("please complete Your profile to access all features.")
        return Nvigate('/')
        } 
  return (
    children
  )
}

export default Checkuser