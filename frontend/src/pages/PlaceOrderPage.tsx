import { useContext, useEffect } from "react";
import { Store } from "../context";
import { useCreateOrderMutations } from "../hooks/orderHook";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { getError } from "../helpers/getErrors";
import { ApiError } from "../types/ApiError";
import { Button, Card, Col, ListGroup, Row, Spinner } from "react-bootstrap";


export default function PlaceOrderPage() {
    const navigate = useNavigate() ; 
    const {state , dispatch} = useContext(Store);
    const {cart} = state ;
    const FREE_SHIPPING_THRESHOLD = 100;
    const BASE_SHIPPING_RATE = 10;
    const roundNumToTwoScale = (num : number) => Math.round(num * 100 + Number.EPSILON) / 100 ;
    const itemPriceFun = cart.cartItems.reduce((prev , acc)=> prev + acc.quantity * acc.price , 0 ) ;
    cart.itemPrice =  roundNumToTwoScale(itemPriceFun);
    cart.shippingPrice = cart.itemPrice >= FREE_SHIPPING_THRESHOLD ? roundNumToTwoScale(0) : roundNumToTwoScale(BASE_SHIPPING_RATE);
    cart.taxPrice = roundNumToTwoScale(0.15 * cart.itemPrice);
    cart.totalPrice =  cart.itemPrice + cart.shippingPrice + cart.taxPrice
    
    
   const {mutateAsync : createOrder , isPending} = useCreateOrderMutations();

   const placeOrderHandler = async()=>{
    try{
        const data = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemPrice: cart.itemPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
        dispatch({type : "CLEAR_CART"})
        // localStorage.removeItem("cartItems");
        navigate(`/order/${data.order._id}`)
    }catch(error){
      toast.error(getError(error as ApiError));
    }
   }

   useEffect(()=>{
     if(!cart.paymentMethod){
        navigate("/payment");
     }
   },[navigate , cart]);
  return (
    <div>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <Helmet>
            <title>Preview Order </title>
        </Helmet>
        <h1 className="my-3">Preview Order </h1>
        <Row>
            <Col md={8}>
             <Card className="mb-3">
                <Card.Body>
                    <Card.Title>Shipping </Card.Title>
                    <Card.Text>
                        <strong>Name : </strong>{cart.shippingAddress.fullName}<br/>
                        <strong>Address : </strong>{cart.shippingAddress.address} , {cart.shippingAddress.city} , {cart.shippingAddress.postalCode} , {cart.shippingAddress.country}
                    </Card.Text>
                    <Link to={'/shipping'}>Edit</Link>
                </Card.Body>
             </Card>
             <Card className="mb-3">
                <Card.Body>
                    <Card.Title> Payment </Card.Title>
                    <Card.Text>
                        <strong> Method : </strong> {cart.paymentMethod}<br/>
                    </Card.Text>
                    <Link to={'/payment'}>Edit</Link>
                </Card.Body>
             </Card>
           <Card>
  <Card.Body>
    <Card.Title>Items</Card.Title>
    <ListGroup 
      variant="flush"
      style={{ 
        maxHeight: '158px', 
        overflowY: 'auto',
      }}
    >
      {cart.cartItems.map((item)=>(
        <ListGroup.Item key={item._id}>
          <Row className="align-items-center">
            <Col md={6}>
              <img 
                className="rounded img-thumbnail"
                src={item.image}
                alt={item.name}
                style={{ maxWidth: '80px', maxHeight: '80px'}}
              >
              </img>{' '}
              <Link to={`/product/${item.slug}`}>{item.name}</Link>
            </Col>
            <Col md={3}>
              <span>{item.quantity}</span>
            </Col>
            <Col md={3}>
              <span>${item.price}</span>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
    <Link to={'/cart'}>Edit</Link>
  </Card.Body>
</Card>
            </Col>
            <Col md={4}> 
            <Card>
                <Card.Body>
                    <Card.Title>Order Summary </Card.Title>
                    <ListGroup variant="flush">
                     <ListGroup.Item >
                        <Row>
                            <Col>Items</Col>
                            <Col>${cart.itemPrice.toFixed(2)}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                          <Row>
                            <Col>Shipping</Col>
                            <Col>${cart.shippingPrice.toFixed(2)}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                            <Row>
                            <Col>Tax</Col>
                            <Col>${cart.taxPrice.toFixed(2)}</Col>
                        </Row>
                     </ListGroup.Item>
                    <ListGroup.Item>
                          <Row>
                            <Col>
                            <strong>Total Price </strong>
                            </Col>
                            <Col>${cart.totalPrice.toFixed(2)}</Col>
                        </Row>
                    </ListGroup.Item>
                    </ListGroup>
                  <div className="d-grid">
                  <Button
                  className="my-2" 
                  onClick={placeOrderHandler}
                  type="button"
                  disabled={isPending || cart.cartItems.length === 0 }
                  >
                   {isPending ? (
                    <>
                    <Spinner
                    as={'span'}
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                    />
                    </>
                   ) : (
                    'Place Order'
                   )}
                  </Button>

                  </div>
                </Card.Body>
            </Card>
            </Col>
        </Row>
    </div>
  )
}
