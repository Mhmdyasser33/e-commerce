import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Store } from "../context";
import { toast } from "react-toastify";
import { UseSignupMutation } from "../hooks/userHooks";
import { getError } from "../helpers/getErrors";
import { ApiError } from "../types/ApiError";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
export default function SignupPage() {
    const navigate = useNavigate();
    const {search} = useLocation() ; 
    const redirectUrl = new URLSearchParams(search).get('redirect') ;
    const redirect = redirectUrl ? redirectUrl : '/' ;  
    const [name , setName] = useState('') ; 
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');
    const trimmedName = name?.trim() ; 
    const trimmedEmail =  email?.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmedPassword = password?.trim() ; 
    const {state : {userInfo} , dispatch} =  useContext(Store) ; 
    const {mutateAsync : signup} =  UseSignupMutation() ; 
    useEffect(()=>{
      if(userInfo){
        navigate(redirect) ; 
      }
    },[redirect , navigate , userInfo]);
    const submitHandler = async(e : React.SyntheticEvent)=>{
        e.preventDefault() ; 
        if(!trimmedName ||!trimmedEmail || !trimmedPassword){
            toast.error("All fields are required");
            return 
        }
        if(!emailRegex.test(trimmedEmail)){
            toast.error("Invalid email format") ; 
            return ;
        }
        if(password.length < 6 || confirmPassword.length < 6){
            toast.error("Password must be at least 6 characters") ;
            return ;
        }
        if(password !== confirmPassword){
            toast.error("Password does not match") ; 
            return ;
        } 
        try{
            const data = await signup({
                name , 
                email,
                password
            })
            console.log(data);
            dispatch({type : "USER_SIGNIN" , payload : data})
            localStorage.setItem("userInfo" , JSON.stringify(data));
            navigate(redirect)
        }catch(error){
          toast.error(getError(error as ApiError));
        }
    }
   return(
        <Container className="small-container">
            <Helmet>
                <title>Sign Up</title>
            </Helmet>
            <h1 className="my-3">Sign Up</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        required
                        placeholder="Enter your full name (e.g., mohamed Yasser)"
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        required
                         placeholder="Enter your email (e.g., mohamed@example.com)"
                        onChange={(e) => setEmail(e.target.value)}
                        
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        required
                        placeholder="Minimum 6 characters (e.g., 123456)"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        required
                        placeholder="Re-enter your password (e.g., 123456)"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
                <div className="d-grid">
                    <Button type="submit"> Sign up</Button>
                </div>
                <div className="mt-2">
                    Already have an account?{' '}
                    <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
                </div>
            </Form>
        </Container>
    )
}
