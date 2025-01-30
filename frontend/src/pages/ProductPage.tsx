import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useGetProductDetailsBySlugQuery } from "../hooks/productHook";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../helpers/getErrors";
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import Rating from "../components/Rating";



export default function ProductPage() {
  const params = useParams() ; 
  const {slug} = params ; 
  const {data : product , isLoading , error} = useGetProductDetailsBySlugQuery(slug!);
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
                  <Button variant="primary"> Add to cart </Button>
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
