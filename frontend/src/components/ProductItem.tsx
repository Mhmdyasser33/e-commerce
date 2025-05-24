import { Button, Card } from "react-bootstrap";
import { Product } from "../types/Product";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { useContext } from "react";
import { Store } from "../context";
import { cartItem } from "../types/Cart";
import { convertProductToCartItem } from "../helpers/getErrors";


export default function ProductItem({product} : {product : Product}) {
 const {state : {cart : {cartItems}} , dispatch} = useContext(Store) ;
  if(!product){
    return null ;
   }
 const addToCardHandler = (item : cartItem)=>{
  const existItem = cartItems.find((productItem) => productItem._id === product!._id) ;
  const quantity = existItem ? existItem.quantity + 1 : 1;
  if(product.countInStock < quantity){
    alert("Sorry. Product out of stock");
    return ;
  }
  dispatch({type : 'ADD_CART_ITEM',payload : {...item , quantity}})
 }

  return (
    <Card className="mb-3" >
      <Link to={`/product/${product.slug}`}>
      <img src={product.image} alt={product.name} className="product-image"/>
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
        <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews}/>
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
        <Button variant="light" disabled>Out of stock</Button>
        ) : (
            <Button onClick ={()=>addToCardHandler(convertProductToCartItem(product))}>Add to cart</Button>
        )}
      </Card.Body>
    </Card>
  )
}
