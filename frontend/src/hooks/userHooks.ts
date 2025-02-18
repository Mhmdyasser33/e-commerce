import { useMutation } from "@tanstack/react-query";
import apiClient from "../react-query/apiConfig";
import { UserInfo } from "../types/UserInfo";


interface UserCredentials{
    email : string,
    password : string
}

export const UseSigninMutation = ()=> useMutation({
      mutationFn : async (credential :  UserCredentials)=>{
        const {data} = await apiClient.post<UserInfo>("api/users/signin" , credential)
        return data ;
      }   
})
