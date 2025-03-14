import { useContext,useState } from "react";
import { useNavigate } from "react-router-dom"
import { Store } from "../context";
import { Helmet } from "react-helmet-async";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Form } from "react-bootstrap";

export default function ShippingAddressPage() {
    const navigate = useNavigate() ; 
    const {state , dispatch} = useContext(Store) ; 
    const {cart : {shippingAddress}} = state;
 
    const [fullName , setFullName] = useState(shippingAddress.fullName || '') ; 
    const [address , setAddress] = useState(shippingAddress.address || '') ; 
    const [city , setCity] = useState(shippingAddress.city || '') ; 
    const [postalCode , setPostalCode] = useState(shippingAddress.postalCode || '') ;
    const [country , setCountry] = useState(shippingAddress.country || '')
     const submitHandler = async(e : React.SyntheticEvent)=>{
       e.preventDefault() ;
       dispatch({type : "SAVE_SHIPPING_ADDRESS" , payload : {
         fullName,
         address,
         city,
         postalCode,
         country
       }})
       localStorage.setItem("shippingAddress" , JSON.stringify({
         fullName,
         address,
         city,
         postalCode,
         country
       }))

       navigate('/payment') 
     }
  return (
    <div>
     <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="container small-container">
        <h1 className="my-3">Shipping Address</h1>
        <Form onSubmit={submitHandler}>
         <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>FullName</Form.Label>
            <Form.Control value={fullName} placeholder="Enter your full name (e.g, mohamed yasser)" onChange={(e)=> setFullName(e.target.value)} required/>
         </Form.Group>
           <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control value={address} placeholder="Enter your Address (e.g, Qena)" onChange={(e)=> setAddress(e.target.value)} required/>
         </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control value={city} placeholder="Enter your city (e.g, farshut)" onChange={(e)=> setCity(e.target.value)} required/>
         </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label> PostalCode </Form.Label>
            <Form.Control value={postalCode} placeholder="Enter your postalCode (e.g, 65785)" onChange={(e)=> setPostalCode(e.target.value)} required/>
         </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control value={country} placeholder="Enter your country (e.g, Egypt)" onChange={(e)=> setCountry(e.target.value)} required/>
         </Form.Group>
         <div className="mb-3 d-grid">
           <Button variant="primary" type="submit">
              Continue
           </Button>
         </div>
        </Form>
      </div>
    </div>
      
  )
}
