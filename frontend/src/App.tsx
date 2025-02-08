import { useContext, useEffect } from "react"
import {Badge, Button, Container, Nav, Navbar} from "react-bootstrap"
import { Link, Outlet } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import { Store } from "./context/store";

function App() {
  const {state : {mode , cart } , dispatch} = useContext(Store) ; 
  useEffect(()=>{
    document.body.setAttribute('data-bs-theme' , mode) ;
  },[mode]) ; 
  const toggleThemeHandler = ()=>{
    dispatch({type : "SWITCH_MODE"}) ; 
  }
  return (
   <div className="d-flex flex-column vh-100">
    <ToastContainer position="bottom-center" limit={1}/>
      <header> 
      <Navbar expand="lg">
           <Container>
            <Link to={"/"}>
            <Navbar.Brand>Amazon clone </Navbar.Brand>
            </Link>
           </Container>
           <Nav>
            <Button value={mode} onClick={toggleThemeHandler}>
            <i className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}></i>
            </Button>
            <Link to='/cart' className="nav-link"> 
            Cart 
            {cart.cartItems.length > 0 &&(
              <Badge pill bg="danger">
                {cart.cartItems.reduce((acc , cuu) => acc + cuu.quantity,0)}
              </Badge>
            )}
            </Link>
            <Link to="/signin" className="nav-link"> Sign In </Link>
           </Nav>
        </Navbar>
      </header>
      <main>
        <Container className="mt-3">
        <Outlet/>
        </Container>

      </main>
      <footer> 
        <div className='text-center'>
        All right reserved
        </div>
      </footer>
     
   </div>
  )
}

export default App
