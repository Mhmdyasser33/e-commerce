import { Col, Row } from "react-bootstrap";
import { sampleProducts } from "../data";
import { Link } from "react-router-dom";
import { Product } from "../types/Product";
import { useEffect, useReducer } from "react";
import axios from "axios";
import { getError } from "../helpers/getErrors";
import { ApiError } from "../types/ApiError";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import ProductItem from "../components/ProductItem";
import { Helmet } from "react-helmet-async";
import { useGetProductQuery } from "../hooks/productHook";





export default function HomePage() {
  const {data : products , isLoading , error} = useGetProductQuery() ; 

  return (
    isLoading ? (<LoadingBox/>) : error ? (<MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>) : (
        <Row>
          <Helmet>
            <title> Amazon clone</title>
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
