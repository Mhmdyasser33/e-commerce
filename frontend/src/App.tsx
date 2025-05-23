import { useContext, useEffect } from "react"
import { Badge, Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { Link, Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import { Store } from "./context/store"

function App() {
  const { state: { mode, cart, userInfo }, dispatch } = useContext(Store)
  
  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode)
  }, [mode])
  
  const toggleThemeHandler = () => {
    dispatch({ type: "SWITCH_MODE" })
  }
  
  const logoutHandler = () => {
    dispatch({ type: "USER_LOGOUT" })
    localStorage.removeItem("userInfo")
    localStorage.removeItem("cartItems")
    localStorage.removeItem("shippingAddress")
    localStorage.removeItem("paymentMethod")
    window.location.href = '/signin'
  }

  return (
    <div className="d-flex flex-column vh-100">
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar bg={mode} variant={mode} expand="lg" className="d-flex justify-content-between">
          <Container fluid>
            <Link to="/">
              <Navbar.Brand>
                RegalMart
                </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Button 
                  variant={mode === 'light' ? 'light' : 'dark'} 
                  onClick={toggleThemeHandler}
                  className="me-2"
                >
                  <i className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}></i>
                </Button>
                
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger" className="ms-1">
                      {cart.cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown" align="end">
                    <NavDropdown.Item as={Link} to={'/orderhistory'}>Order History</NavDropdown.Item>
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={logoutHandler}
                    >
                      Sign out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link to="/signin" className="nav-link">
                    Sign In
                  </Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container className="mt-3">
          <Outlet />
        </Container>
      </main>
      <footer className="mt-auto">
        <div className="text-center py-3">
        <span> &copy; 2025 RegalMart Shop. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}

export default App
