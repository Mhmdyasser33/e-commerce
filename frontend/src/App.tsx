import {Container, Nav, Navbar} from "react-bootstrap"
import {Outlet } from "react-router-dom"

function App() {

  return (
   <div className="d-flex flex-column vh-100">
      <header> 
      <Navbar bg="dark" variant="dark" expand="lg">
           <Container>
            <Navbar.Brand>Amazon clone </Navbar.Brand>
           </Container>
           <Nav>
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
