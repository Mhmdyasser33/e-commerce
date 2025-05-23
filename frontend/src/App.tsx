import { useContext, useEffect } from "react";
import {
  Badge,
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Store } from "./context/store";

function App() {
  const {
    state: { mode, cart, userInfo },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  const toggleThemeHandler = () => {
    dispatch({ type: "SWITCH_MODE" });
  };

  const logoutHandler = () => {
    dispatch({ type: "USER_LOGOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };

  const cartItemsCount = cart.cartItems.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );

  return (
    <div className="d-flex flex-column vh-100">
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar
          bg={mode}
          variant={mode}
          expand="lg"
          className="d-flex justify-content-between"
        >
          <Container fluid>
            <Link to="/">
              <Navbar.Brand>RegalMart</Navbar.Brand>
            </Link>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
              {/* Search bar */}
              <Form
                className="mx-lg-auto w-100 my-2 my-lg-0"
                style={{ maxWidth: "600px" }}
              >
                <InputGroup>
                  <Form.Control
                    type="search"
                    placeholder="Search RegalMarts products.."
                    aria-label="Search RegalMarts products.."
                    style={{
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                  />
                  <Button
                    type="submit"
                    variant={mode === "light" ? "warning" : "secondary"}
                    style={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                  >
                    <i className="fa fa-search"></i>
                  </Button>
                </InputGroup>
              </Form>

              <Nav className="ms-auto align-items-center flex-column flex-lg-row">
                <Button
                  variant={mode === "light" ? "light" : "dark"}
                  onClick={toggleThemeHandler}
                  className="me-2 my-1"
                >
                  <i
                    className={mode === "light" ? "fa fa-sun" : "fa fa-moon"}
                  ></i>
                </Button>

                <NavDropdown.Item
                  as={Link}
                  to={"/orderhistory"}
                  className="my-1"
                >
                  Orders
                </NavDropdown.Item>

                <Link
                  to="/cart"
                  className={`cart-icon-container position-relative text-decoration-none d-flex align-items-center my-1 ${
                    mode === "light" ? "text-dark" : "text-white"
                  }`}
                >
                  <div
                    style={{ position: "relative", width: "35px", height: "35px" }}
                  >
                    {cartItemsCount > 0 && (
                      <Badge
                        pill
                        bg="danger"
                        style={{
                          position: "absolute",
                          top: "10%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          fontSize: "0.65rem",
                          padding: "0.2em 0.4em",
                          zIndex: 1,
                          color: "white",
                        }}
                      >
                        {cartItemsCount}
                      </Badge>
                    )}
                    <svg
                      fill={mode === "light" ? "#000000" : "#ffffff"}
                      viewBox="130 120 200 300"
                      width="30px"
                      height="30px"
                    >
                      <path d="M 110.164 188.346 C 104.807 188.346 100.437 192.834 100.437 198.337 C 100.437 203.84 104.807 208.328 110.164 208.328 L 131.746 208.328 L 157.28 313.233 C 159.445 322.131 167.197 328.219 176.126 328.219 L 297.409 328.219 C 306.186 328.219 313.633 322.248 315.951 313.545 L 341.181 218.319 L 320.815 218.319 L 297.409 308.237 L 176.126 308.237 L 150.592 203.332 C 148.426 194.434 140.675 188.346 131.746 188.346 L 110.164 188.346 Z M 285.25 328.219 C 269.254 328.219 256.069 341.762 256.069 358.192 C 256.069 374.623 269.254 388.165 285.25 388.165 C 301.247 388.165 314.431 374.623 314.431 358.192 C 314.431 341.762 301.247 328.219 285.25 328.219 Z M 197.707 328.219 C 181.711 328.219 168.526 341.762 168.526 358.192 C 168.526 374.623 181.711 388.165 197.707 388.165 C 213.704 388.165 226.888 374.623 226.888 358.192 C 226.888 341.762 213.704 328.219 197.707 328.219 Z" />
                    </svg>
                  </div>
                  <span className="ms-1 d-none d-sm-inline">Cart</span>
                </Link>

                {userInfo ? (
                  <NavDropdown
                    title={userInfo.name}
                    id="basic-nav-dropdown"
                    align="end"
                    className="my-1"
                  >
                    <NavDropdown.Item as={Link} to={"/orderhistory"}>
                      Order History
                    </NavDropdown.Item>
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={logoutHandler}
                    >
                      Sign out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link to="/signin" className="nav-link my-1">
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
          <span>&copy; 2025 RegalMart Shop. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
