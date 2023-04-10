import { useState,useEffect } from 'react'
import { getUser,Edit } from '../method/user'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import logo from '../images/logo.jpg'
import DialogTitle from '@mui/material/DialogTitle';
export default function Sidebar({token}){

    const [name,setName]=useState('')
    const [emailA,setEmailA]=useState('')
    const [mobileA,setMobileA]=useState('')
    const [passwordA,setPasswordA]=useState('')
    const navigate = useNavigate();
    const [showDialogProfile,setShowDialogProfile]=useState(false)
    const[visible,setVisible]=useState('none')

   useEffect(()=>{
    getUser(localStorage.getItem('token')).then(
      async (response)=>{
        setName(response.data.name)
        setEmailA(response.data.email)
        setMobileA(response.data.mobile)
        setPasswordA(response.data.password)
       }
   )

   },[])

  const handleEdit=()=>{
    setShowDialogProfile(false);
    Edit(name,mobileA,emailA,passwordA,localStorage.getItem('token'))
  }
    const handleClose = () => {
      setShowDialogProfile(false)
    };

    return(
        <div className='Side'> 

      {showDialogProfile?<Dialog open={showDialogProfile} onClose={handleClose}>
        <DialogTitle>Edit your profile</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" id="name" label="Name" type="text" fullWidth variant="standard" value={name}
            onChange={(e)=>setName(e.target.value)}
          />
         <TextField autoFocus margin="dense" id="email" label="Email" type="text" fullWidth variant="standard" value={emailA}
            onChange={(e)=>setEmailA(e.target.value)}
          />
          <TextField autoFocus margin="dense" id="mobile" label="Mobile" type="text" fullWidth variant="standard" value={mobileA}
            onChange={(e)=>setMobileA(e.target.value)}
          />
           <TextField autoFocus margin="dense" id="password" label="Password" type="password" fullWidth variant="standard" value={passwordA}
            onChange={(e)=>setPasswordA(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEdit}>Edit</Button>
        </DialogActions>
      </Dialog>: null}
            <ul  className='Sidebar' >
            <li className='SidebarItem'><a className='SidebarItem'  href='/teacherDashboard'><img src={logo} alt='logo'/></a></li>
            <li className='SidebarItem' onClick={()=> navigate(`/teacherCurriculum`,{state:{token:token}})}>Curriculum</li>
            <li className='SidebarItem' id='Right' onClick={()=>{
                  console.log(visible)
                  if(visible==='inline'){
                  setVisible('none')
                }else{setVisible('inline')}
              }
                }>
                 {name} <i className='Arrow'/></li>
            </ul><> <br/></>
                
            <div className='List' style={{display:`${visible}`}}>
                <ul >
                    <li className='listItem' onClick={()=>setShowDialogProfile(true)}>Profile</li><br/>
                    <li className='listItem'><a style={{color:'black',textDecoration:'none'}} href='/' >log out</a></li><br/>
                </ul>
            </div>
        </div>
    )
   
} 
