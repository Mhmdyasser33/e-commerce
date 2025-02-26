import { useContext } from "react";
import { Store } from "../context";
import { cartItem } from "../types/Cart";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import MessageBox from "../components/MessageBox";
import { Link, useNavigate } from "react-router-dom";


export default function CartPage() {
    const navigate = useNavigate();
    const {state : {cart : {cartItems},mode} , dispatch} = useContext(Store);
    const updatedCartHandler = (item : cartItem , quantity : number)=>{
        if(item.countInStock < quantity){
            toast.warn('Sorry. Product is out of stock') ;
            return;
        }
        dispatch({type : "ADD_CART_ITEM" , payload : {...item , quantity}}); // keep save all value inly quantity change based on user click..
    }
    const handelCheckoutHandler = ()=>{
     navigate('/signin/?redirect=/shipping') ; 
    }
    const handleDeleteCartItem = (item : cartItem)=>{
        dispatch({type : "REMOVE_CART_ITEM" , payload : item}) ; 
    }
    return(
        <div>
       <Helmet>
        <title> Shipping cart </title>
       </Helmet>
       <h1>Shipping cart</h1>
       <Row>
        <Col md={8}>
        {cartItems.length === 0 ? 
        <MessageBox >
         Cart is Empty <Link to={'/'}> Go Shopping </Link>
        </MessageBox>
         :
         <ListGroup>
          {cartItems.map((item : cartItem) =>(
            <ListGroup.Item key={item._id}>
              <Row className="align-items-center">
                <Col md={4}>
                <img 
                src={item.image}
                alt={item.name}
                className="img-fluid rounded img-thumbnail"
                />
                <Link className="mx-1" to={`/product/${item.slug}`}>{item.name}</Link>
                </Col>
                <Col md={4}>
                 <Button variant={mode} onClick={()=> updatedCartHandler(item , item.quantity - 1)} disabled={item.quantity === 1}>
                    <i className="fas fa-minus-circle"></i>
                 </Button>{' '}
                 <span>{item.quantity}</span>{' '}
                 <Button  variant={mode} onClick={()=> updatedCartHandler(item , item.quantity + 1)} disabled={item.quantity === item.countInStock}>
                  <i className="fas fa-plus-circle"></i>
                 </Button> 
                </Col>
                <Col>
                <span>${item.price}</span>
                </Col>
                <Col>
                <Button
                 onClick={()=>handleDeleteCartItem(item)}
                 variant={mode}>
                    <i className="fas fa-trash"></i>
                </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
         </ListGroup> 
         }
        </Col>
        <Col md={4}>
        <Card>
        <Card.Body>
            <ListGroup>
           <h3>
            {/* to calc num of items user add to cart  */}
            Subtotal ({cartItems.reduce((acc , curr)=> acc + curr.quantity,0)} {' '} items)
            : $ {cartItems.reduce((acc , curr)=> acc + (curr.price * curr.quantity),0)} 
           </h3>
            </ListGroup>
            <ListGroup>
                <div className="d-grid">
                    <Button onClick={handelCheckoutHandler} variant="primary" type="button" disabled={cartItems.length === 0}>
                        Proceed to checkout 
                    </Button>
                </div>
            </ListGroup>
        </Card.Body>
        </Card>
        </Col>
       </Row>
        </div>
       
    )
 
}
