import { useContext, useEffect } from "react"
import {Button, Container, Nav, Navbar} from "react-bootstrap"
import {Outlet } from "react-router-dom"
import { Store } from "./context/store";

function App() {
  const {state : {mode} , dispatch} = useContext(Store) ; 
  useEffect(()=>{
    document.body.setAttribute('data-bs-theme' , mode) ;
  },[mode]) ; 
  const toggleThemeHandler = ()=>{
    dispatch({type : "SWITCH_MODE"}) ; 
  }
  return (
   <div className="d-flex flex-column vh-100">
      <header> 
      <Navbar expand="lg">
           <Container>
            <Navbar.Brand>Amazon clone </Navbar.Brand>
           </Container>
           <Nav>
            <Button value={mode} onClick={toggleThemeHandler}>
            <i className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}></i>
            </Button>
            <Nav.Link href='/cart'> Cart </Nav.Link>
            <Nav.Link href="/signin"> Sign In </Nav.Link>
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
