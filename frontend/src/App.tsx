import { useContext, useEffect } from "react"
import {Badge, Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap"
import { Link, Outlet } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import { Store } from "./context/store";

function App() {
  const {state : {mode , cart ,userInfo} , dispatch} = useContext(Store) ; 
  useEffect(()=>{
    document.body.setAttribute('data-bs-theme' , mode) ;
  },[mode]) ; 
  const toggleThemeHandler = ()=>{
    dispatch({type : "SWITCH_MODE"}) ; 
  }
  const logoutHandler = ()=>{  
    dispatch({type : "USER_LOGOUT"});
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
     localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = '/signin'
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
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="basic-nav-dropdown" align={'end'}>
              <Link
              className="dropdown-item" 
              to="#signout"
              onClick={logoutHandler} > Sign out </Link>
              </NavDropdown>
            ) : (
                <Link to="/signin" className="nav-link"> Sign In </Link>
            )}
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
