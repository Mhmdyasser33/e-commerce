import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { useGetOrderDetailsQuery, useGetPayPalClientIdQuery, usePayOrderMutation } from "../hooks/orderHook";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { SCRIPT_LOADING_STATE, usePayPalScriptReducer, DISPATCH_ACTION, PayPalButtonsComponentProps, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { getError } from "../helpers/getErrors";
import { ApiError } from "../types/ApiError";

export default function OrderPageDetails() {
  const params = useParams();
  const { id: orderId } = params;
  const { data: order, error, refetch, isLoading } = useGetOrderDetailsQuery(orderId!);
  const { mutateAsync: payOrder } = usePayOrderMutation();
  const [{ isPending, isRejected }, dispatch] = usePayPalScriptReducer();
  const { data: paypalConfig } = useGetPayPalClientIdQuery();

  useEffect(() => {
    const loadPaypalScript = async () => {
      if (paypalConfig && paypalConfig.clientId) {
        dispatch({
          type: DISPATCH_ACTION.RESET_OPTIONS,
          value: {
            'client-id': paypalConfig.clientId,
            currency: 'USD',
          },
        });
        dispatch({
          type: DISPATCH_ACTION.LOADING_STATUS,
          value: SCRIPT_LOADING_STATE.PENDING,
        });
      }
    };
    loadPaypalScript();
  }, [paypalConfig, dispatch]);

  const testPayPalPayment = async () => {
    await payOrder({ orderId: orderId! });
    refetch();
    toast.success("Order is paid");
  };

  const payPalButtonTransactionProps: PayPalButtonsComponentProps = {
    style: { layout: 'vertical' },
    createOrder(data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: { value: order!.totalPrice.toString() },
          },
        ],
      }).then((orderId: string) => orderId);
    },
    onApprove(data, actions) {
      return actions.order!.capture().then(async (details) => {
        try {
          await payOrder({ orderId: orderId!, ...details });
          refetch();
          toast.success("Order is paid successfully");
        } catch (err) {
          toast.error(getError(err as ApiError));
        }
      });
    },
    onError: (error) => {
      toast.error(getError(error as ApiError));
    },
  };

  if (isLoading) {
    return <LoadingBox />;
  }

 if (error) {
  return <MessageBox variant="danger">An unexpected error occurred </MessageBox>;
}

  if (!order) {
    return <MessageBox variant="danger">Order Not Found</MessageBox>;
  }

  return (
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
                <strong>Name:</strong> {order.shippingAddress.fullName}<br />
                <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </Card.Text>
              {order.isDelivered ? (
                <MessageBox variant="success">Delivered at {order.deliveredAt}</MessageBox>
              ) : (
                <MessageBox variant="warning">Not Delivered</MessageBox>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {order.paymentMethod}<br />
              </Card.Text>
              {order.isPaid ? (
                <MessageBox variant="success">Paid at {order.paidAt}</MessageBox>
              ) : (
                <MessageBox variant="warning">Not Paid</MessageBox>
              )}
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush" style={{ maxHeight: '128px', overflowY: 'auto' }}>
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        />{' '}
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>{item.quantity}</Col>
                      <Col md={3}>${item.price}</Col>
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
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemPrice.toFixed(2)}</Col>
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
                    <Col>${order.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col><strong>Total</strong></Col>
                    <Col><strong>${order.totalPrice.toFixed(2)}</strong></Col>
                  </Row>
                </ListGroup.Item>

                {!order.isPaid && (
                  <ListGroup.Item>
                    {isPending ? (
                      <LoadingBox />
                    ) : isRejected ? (
                      <MessageBox variant="danger">Error connecting to PayPal</MessageBox>
                    ) : (
                      <div className="d-grid gap-2 mt-2">
                        <PayPalButtons {...payPalButtonTransactionProps} />
                        <Button variant="primary" onClick={testPayPalPayment}>
                          Test Pay
                        </Button>
                      </div>
                    )}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
