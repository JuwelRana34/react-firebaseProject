import { Link } from "react-router-dom"
import { Button, Navbar } from "flowbite-react";
import useAdminCheck from '../hooks/useAdminCheck';
import LogoutButton from "./LogoutButton";
import logo from '../assets/images/jnuitslogo.png'


function NavbarMenu() {
  const {isAdmin,user} = useAdminCheck();

  return (
   <>
      <Navbar fluid rounded className=" shadow-lg mb-5">
      <Navbar.Brand href="#">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">JnUITS</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {user?<LogoutButton/>: <Link to="/login"> <Button className="bg-green-radial">Login</Button></Link>}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link to="/"><Navbar.Link active> Home</Navbar.Link></Link>
        {user&& <>
        <Link to="/notice"><Navbar.Link className="text-red-500" > Notice</Navbar.Link></Link>
        <Link to="/user"><Navbar.Link > Dashboard</Navbar.Link></Link>
        </>}
        
        
        {isAdmin&& <Link to="/admin"><Navbar.Link > Admin</Navbar.Link></Link> }
        
         {!user && <Link to="/registration"><Navbar.Link > registration</Navbar.Link></Link>}
        
        
        
      </Navbar.Collapse>
      </Navbar>
   </>
);
}

export default NavbarMenu