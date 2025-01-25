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


type State =  {
    products : Product[],
    loading : boolean ,
    error :  string
}

type Action = 
  | { type: "FETCH_REQ" } 
  | { type: "REQ_SUCCESS"; payload: Product[] } 
  | { type: "REQ_FAIL"; payload: string };

  const initialState : State = {
    products : [] , 
    loading : true,
    error : ''
  }

  const reducer = (state : State , action : Action) : State =>{
    switch(action.type){
      case 'FETCH_REQ':
        return {...state , loading : true}
      case 'REQ_SUCCESS':
        return {...state , loading : false ,products : action.payload}
      case 'REQ_FAIL':
        return {...state , loading : false , error : action.payload}
    }
  }
export default function HomePage() {
  const [{error , loading , products} , dispatch] = useReducer<React.Reducer<State,Action>>(reducer , initialState);
  useEffect(()=>{
    const fetchData = async()=>{
       dispatch({type : 'FETCH_REQ'}) ; 
       try{
         const result  = await axios.get("api/products") ; 
         dispatch({type : 'REQ_SUCCESS' , payload : result.data}) ; 
       }catch(error){
        dispatch({type : 'REQ_FAIL' , payload : getError(error as ApiError)})
       }
    }
    fetchData() ;
  },[])
     
  return (
    loading ? (<LoadingBox/>) : error ? (<MessageBox variant="danger">{error}</MessageBox>) : (
 <Row>
          {sampleProducts.map((product)=>(
            <Col key={product.slug} sm={6} md={4} lg={3}>
                <Link to={`/product/`+product.slug}>
                <img src={product.image}
                alt={product.name} 
                className="product-image"/>
                <h2>{product.name}</h2>
                <p>${product.price}</p>
                </Link>
            </Col>
          ))}
          
        </Row> 
    )
  )
}
