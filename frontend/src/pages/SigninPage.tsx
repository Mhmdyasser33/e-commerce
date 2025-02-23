import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Store } from "../context";
import { UseSigninMutation } from "../hooks/userHooks";
import { toast } from "react-toastify";
import { ApiError } from "../types/ApiError";
import {getError} from "../helpers/getErrors"
import { Button, Container, Form, } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
export default function SigninPage() {
    const navigate = useNavigate() ; 
    // here will give me data after query string ? 
    const { search } = useLocation() ;
    console.log(search);
    // it return thr value that have key redirect like this redirect = '/cart' res -> /cart 
    const redirectUrl = new URLSearchParams(search).get('redirect') ; 
    console.log(redirectUrl)
    const redirect = redirectUrl ? redirectUrl : "/" ; 
    const [email , setEmail] = useState('') ; 
    const [password , setPassword] = useState('') ;
    const {state : {userInfo}, dispatch} = useContext(Store) ; 
    const trimmedEmail = email?.trim().toLowerCase() ;
    const trimmedPassword = password?.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const { mutateAsync : signin , isPending} = UseSigninMutation(); // rename mutateAsync with signin name 

    const submitHandler = async(e : React.SyntheticEvent)=>{
        e.preventDefault() ; 
        if(!trimmedEmail || !trimmedPassword){
            toast.error("All field are required") ; 
            return;
        }
        if(!emailRegex.test(trimmedEmail)){
            toast.error("Invalid email format") ; 
            return ;
        }
         try{
            const data = await signin({
                email : trimmedEmail ,
                 password : trimmedPassword
            })
            localStorage.setItem("userInfo" , JSON.stringify(data)) ;   
            dispatch({type : "USER_SIGNIN" , payload : data})
            navigate(redirect);
         }catch(error){
           toast.error(getError(error as ApiError))
         }
    }
    useEffect(()=>{
     // This ensures that a logged-in user cannot access the login page again except when the user logged out...
    if(userInfo){
        navigate(redirect);
    }
   },[userInfo , redirect , navigate])  
    return(
        <Container className="small-container">
            <Helmet>
                <title>Sign in </title>
            </Helmet>
            <h1 className="my-3">Sign in </h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label> Email </Form.Label>
                    <Form.Control 
                        type="email" 
                        required 
                        placeholder="Enter email.." 
                        onChange={(e)=> setEmail(e.target.value)}
                        disabled={isPending} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        required 
                        placeholder="Enter Password.." 
                        onChange={(e)=> setPassword(e.target.value)}
                        disabled={isPending}
                    />
                </Form.Group>
                <div className="mb-3">
                    <Button 
                        disabled={isPending} 
                        variant="primary" 
                        type="submit"
                        className="w-100 position-relative"
                    >
                        {isPending ? (
                            <>
                                <span className="opacity-0">Sign in</span>
                                <div className="position-absolute top-50 start-50 translate-middle">
                                    <LoadingBox />
                                </div>
                            </>
                        ) : (
                            'Sign in'
                        )}
                    </Button>
                </div>
                <div className="mb-3">
                    New Customer?{' '}
                    <Link to={`/signup?redirect/${redirect}`}> 
                        Create your account 
                    </Link>
                </div>
            </Form>
        </Container>
    )

  
}
