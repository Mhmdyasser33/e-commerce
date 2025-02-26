import { Col, Row } from "react-bootstrap";
import { getError } from "../helpers/getErrors";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ProductItem from "../components/ProductItem";
import { Helmet } from "react-helmet-async";
import { useGetProductQuery } from "../hooks/productHook";

export default function HomePage() {
  const {data : products , isLoading , error} = useGetProductQuery() ; 

  return (
    isLoading ? (<LoadingBox/>) : error ? (<MessageBox variant="danger">{error instanceof Error ? error.message : getError(error)}</MessageBox>) : (
        <Row>
          <Helmet>
            <title> RegalMart</title>
            <meta name="description" content="This is the homepage for the e-commerce"/>
          </Helmet>
          {products!.map((product)=>(
            <Col key={product.slug} sm={6} md={4} lg={3}>
              <ProductItem product={product}/>
            </Col>
          ))}
        </Row> 
    )
  )
}
