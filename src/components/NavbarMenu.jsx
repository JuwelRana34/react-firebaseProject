import { Link } from "react-router-dom"
import { Button, Navbar } from "flowbite-react";
function NavbarMenu() {
  return (
   <>
      <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">test</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
       <Link to="/login"> <Button className="bg-green-radial">Login</Button></Link> 
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link to="/"><Navbar.Link active> Home</Navbar.Link></Link>
        <Link to="/admin"><Navbar.Link > Admin</Navbar.Link></Link>
        <Link to="/registration"><Navbar.Link > registration</Navbar.Link></Link>
        <Link to="/user"><Navbar.Link > Dashboard</Navbar.Link></Link>
        <Link to="/admin"><Navbar.Link > Admin</Navbar.Link></Link>
      </Navbar.Collapse>
      </Navbar>
   </>
);
}

export default NavbarMenu