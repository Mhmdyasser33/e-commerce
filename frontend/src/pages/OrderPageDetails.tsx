import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { useGetOrderDetailsQuery, useGetPayPalClientIdQuery, usePayOrderMutation } from "../hooks/orderHook";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { SCRIPT_LOADING_STATE, usePayPalScriptReducer , DISPATCH_ACTION, PayPalButtonsComponentProps, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { getError } from "../helpers/getErrors";
import { ApiError } from "../types/ApiError";



export default function OrderPageDetails() {

    const params = useParams()
    const {id : orderId} = params;
    const {data : order, error,refetch} = useGetOrderDetailsQuery(orderId!); 
    const { mutateAsync : payOrder} = usePayOrderMutation();
    
     const testPayPalPayment = async()=>{
        await payOrder({orderId : orderId!}) ; 
        refetch();
        toast.success("Order is paid");
     } 

    const [{ isPending , isRejected },dispatch] = usePayPalScriptReducer()
     const { data : paypalConfig} = useGetPayPalClientIdQuery() ;
     useEffect(() => {
    if (paypalConfig && paypalConfig.clientId) {
      const loadPaypalScript = async () => {
         dispatch({
            type : DISPATCH_ACTION.RESET_OPTIONS,
            value : {
                'client-id' : paypalConfig!.clientId,
                currency : 'USD'
              },
            })
            dispatch({
                type : DISPATCH_ACTION.LOADING_STATUS,
                value : SCRIPT_LOADING_STATE.PENDING
            })
      }
      loadPaypalScript()
      
    }
  }, [paypalConfig])

  const payPalButtonTransactionProps : PayPalButtonsComponentProps = {
    style : {layout : 'vertical'},
    createOrder(data , actions){
        return actions.order.create({
            purchase_units : [
                {
                    amount : {
                        value : order!.totalPrice.toString()
                    }
                }
            ]
        }).then((orderId : string)=>{
            return orderId ;
        })
    },
    onApprove(data , actions){
        return actions.order!.capture().then(async(details)=>{
           try{
              await payOrder({orderId : orderId! , ...details})
              refetch()
              toast.success("Order is paid successfully");
           }catch(err){
            toast.error(getError(err as ApiError))

           }
        })
    },
    onError : (error)=>{
        toast.error(getError(error as ApiError))
    }
  }
     return isPending ? (
        <LoadingBox></LoadingBox>
     ) : error ? (<MessageBox variant="danger">Error</MessageBox>) : !order ? (
        <MessageBox variant="danger">Order Not Found</MessageBox>
     ) : (
        <div>
            <Helmet>
                <title>Order {orderId}</title>
            </Helmet>
            <h1 className="my-3">Order {orderId}</h1>
            <Row>
                <Col md={8}>
                <Card className="mb-3">
                    <Card.Body>
                        <Card.Title>Shipping</Card.Title>
                        <Card.Text>
                            <strong>Name : </strong>{order.shippingAddress.fullName}<br/>
                             <strong>Address : </strong>{order.shippingAddress.address} , 
                             {order.shippingAddress.city} , {order.shippingAddress.postalCode} , 
                             {order.shippingAddress.country}
                        </Card.Text>
                        {order.isDelivered ? (
                            <MessageBox variant="success"> Delivered at {order.deliveredAt}</MessageBox>
                        ) : (
                            <MessageBox variant="warning"> Not Delivered </MessageBox>
                        )}
                    </Card.Body>
                </Card>
                <Card className="mb-3">
                    <Card.Body>
                        <Card.Title>Payment</Card.Title>
                        <Card.Text>
                            <strong> Method :  </strong> {order.paymentMethod}<br/>
                        </Card.Text>
                        {order.isPaid ? (
                            <MessageBox variant="success"> Paid at {order.paidAt}</MessageBox>
                        ) : (
                            <MessageBox variant="warning"> Not Paid </MessageBox>
                        )}
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>Items</Card.Title>
                         <ListGroup variant="flush" style={{ 
                            maxHeight: '125px', 
                            overflowY: 'auto',
                        }}>
                        {order.orderItems.map((item)=>(
                            <ListGroup.Item key={item._id}>
                                <Row className="align-items-center">
                                    <Col md={6}>
                                    <img
                                     style={{ maxWidth: '80px', maxHeight: '80px'}} 
                                    className="rounded img-thumbnail"
                                    src={item.image}
                                    alt={item.name}>   
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
                            <Col>${order.itemPrice}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                          <Row>
                            <Col>Shipping</Col>
                            <Col>${order.shippingPrice.toFixed(2)}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                            <Row>
                            <Col>Tax</Col>
                            <Col>${order.taxPrice}</Col>
                        </Row>
                     </ListGroup.Item>
                    <ListGroup.Item>
                          <Row>
                            <Col>
                            <strong>Total Price </strong>
                            </Col>
                            <Col>${(order.totalPrice+Number.EPSILON).toFixed(2)}</Col>
                        </Row>
                    </ListGroup.Item>
                    {!order.isPaid && (
                        <ListGroup>
                            {isPending ? (
                                <LoadingBox/>
                            ) : isRejected ? (
                                <MessageBox variant="danger">
                                    Error in Connecting to paypal
                                </MessageBox>
                            ) : (
                                <div>
                                    <PayPalButtons {...payPalButtonTransactionProps}>
                                    </PayPalButtons>
                                    <Button onClick={testPayPalPayment}>Test Pay</Button>
                                </div>
                            )}
                        </ListGroup>
                    )}
                    </ListGroup>
                </Card.Body>
            </Card>
            
            </Col>
            </Row>
        </div>
     )
}
