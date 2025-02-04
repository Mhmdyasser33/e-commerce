import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductDetailsBySlugQuery } from "../hooks/productHook";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { convertProductToCartItem, getError } from "../helpers/getErrors";
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import Rating from "../components/Rating";
import { useContext } from "react";
import { Store } from "../context";
import { toast } from "react-toastify";



export default function ProductPage() {
  const  navigate = useNavigate();
  const params = useParams() ; 
  const {slug} = params ; 
  const {data : product , isLoading , error} = useGetProductDetailsBySlugQuery(slug!);
  const {state : {cart} , dispatch} = useContext(Store);
  const addToCartHandler = () =>{
    const existItem = cart.cartItems.find((productItem)=> productItem._id === product?._id);
    const quantity = existItem ? existItem.quantity + 1 : 1 ; 
    if(product!.countInStock < quantity){
      alert('Sorry. Product out of stock') ; 
      return;
    }
    dispatch({type : "ADD_CART_ITEM",payload : {...convertProductToCartItem(product!),quantity}})
    toast.success("Product add to cart");
    navigate("/cart")
  }
  return (
    isLoading ? (
      <LoadingBox/>
    ) : error ?(
      <MessageBox variant="danger">{error instanceof Error ? error.message : getError(error)}</MessageBox>
    ) : 
    !product ? (
      <MessageBox variant="danger"> Product not found </MessageBox>
    ) : 
    (
    <div> 
       <Row>
        <Col md={6}>
        <img src={product.image} alt={product.name} className="large"></img>
        </Col>
        <Col md={3}>
       <ListGroup variant="flush">
       <ListGroup.Item>
          <Helmet>
            <title>{product.name}</title>
          </Helmet>
          <h1>{product.name}</h1>
        </ListGroup.Item>
        <ListGroup.Item>
          <Rating rating={product.rating} numReviews={product.numReviews}/>
        </ListGroup.Item>
        <ListGroup.Item>
          Price : ${product.price}
        </ListGroup.Item>
        <ListGroup.Item>
          description :<span>{product.description}</span> 
        </ListGroup.Item>
       </ListGroup>
        </Col>
        <Col md={3}>
        <Card>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price </Col>
                  <Col> {product.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status </Col>
                  <Col>
                  {product.countInStock > 0 ? (
                    <Badge bg="success"> In stock </Badge>
                  ) : (
                    <Badge bg="danger"> Unavailable </Badge>
                  )}
                  </Col>
                </Row>
                
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <div className="d-grid mt-3">
                  <Button onClick={addToCartHandler} variant="primary"> Add to cart </Button>
                </div>
              )}
            </ListGroup>
          </Card.Body>
        </Card>
        </Col>
       </Row>
     </div>
    )
  )
}
