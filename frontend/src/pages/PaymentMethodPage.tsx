import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Store } from "../context";
import CheckoutSteps from "../components/CheckoutSteps";
import { Helmet } from "react-helmet-async";
import { Button, Form } from "react-bootstrap";


export default function PaymentMethodPage() {
    const navigate = useNavigate() ; 
    const {state , dispatch} = useContext(Store) ; 
    const {cart : {
        shippingAddress , paymentMethod
    }} = state
    const [paymentMethodTitle , setPaymentMethodTitle] = useState(paymentMethod || 'payPal')

    useEffect(()=>{
       if(!shippingAddress.address){
        navigate("/shipping")
       }
    },[shippingAddress,navigate]);

    const  submitHandler = (e : React.SyntheticEvent)=>{
        e.preventDefault() ; 
        dispatch({type : "SAVE_PAYMENT_METHOD" , payload : paymentMethodTitle})
        localStorage.setItem('paymentMethod' , paymentMethodTitle)
        navigate('/placeorder') 
    }
  return (
    <div>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <div className="container small-container">
           <Helmet>
            <title>Payment Method</title>
           </Helmet>
           <h1 className="my-3">Payment Method</h1>
           <Form onSubmit={submitHandler}>
            <div className="mb-3">
             <Form.Check
             type="radio"
             id="payPal"
             label="payPal"
             value={'payPal'}
             checked={paymentMethodTitle === 'payPal'}
             onChange={(e)=> setPaymentMethodTitle(e.target.value)}
             />
            </div>
             <div className="mb-3">
            <Form.Check
             type="radio"
             id="stripe"
             label="stripe"
             value={'stripe'}
             checked={paymentMethodTitle === 'stripe'}
             onChange={(e)=> setPaymentMethodTitle(e.target.value)}
             />
             </div>
              <div className="mb-3">
            <Button type="submit">Continue</Button>
              </div>
           </Form>
        </div>
    </div>
  )
}
