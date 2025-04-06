import { Col, Row } from "react-bootstrap";


export default function Footer() {
  return (
    <div>
        <Row>
            <Col md={4}>
            <div className="container">
            <h4>ELEGANCE</h4>
            <span>Premium shopping experience with carefully curated products for the discerning customer.</span>
            </div>
            <div className="contact-container">
                <a href="">
                    <i className="fa fa-facebook"></i>
                </a>
                <a href="">
                    <i className="fa fa-linkedin"></i>
                </a>
                <a href="">
                    <i className="fa fa-github"></i>
                </a>
            
            </div>
            </Col>
            <Col md={4}>
            <h4>Shop</h4>
            <a> All Products </a>
            </Col>
            <Col md={4}></Col>
          
        </Row>
        <Row></Row>
    </div>
  )
}
