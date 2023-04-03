import {useState} from 'react'
import { login } from '../method/user'
import { useNavigate } from "react-router-dom";
export default function Login(){
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [res,setRes]=useState('')
    const navigate = useNavigate();

    return(
        <div className='Login'>
            <h1 style={{marginBottom:'20px'}}>Login</h1>
            <label >Email</label><br/>
            <input style={{marginBottom:'10px'}}type='text' id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/><br/>
            <label >password</label><br/>
            <input style={{marginBottom:'10px'}} type='password' id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/><br/><br/>
            <button className='LoginButton' onClick={async ()=>{login(email,password).then((response)=>{
               console.log(response)
               if(response.success){
                    window.responseGolobalVar=response
                    window.token=response.token
                  navigate(`/dashboard`,{state:{response:response}})
               }else{
                  setRes('wrong password or email')
               }
               })}}> Log in</button>
               <p className='wrongMsg'>{res}</p>
        </div>
    );
}