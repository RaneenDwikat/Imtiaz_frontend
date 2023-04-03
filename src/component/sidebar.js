import { useState,useEffect } from 'react'
import { Add, getUser,Edit } from '../method/user'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import logo from '../images/logo.jpg'
import DialogTitle from '@mui/material/DialogTitle';
import { addSection } from '../method/section';
export default function Sidebar({token}){
    const [named,setNamed]=useState('')
    const [email,setEmail]=useState('')
    const [mobile,setMobile]=useState('')
    const [password,setPassword]=useState('')
    const [open, setOpen] = useState(false);
    const [name,setName]=useState('')
    const [emailA,setEmailA]=useState('')
    const [mobileA,setMobileA]=useState('')
    const [passwordA,setPasswordA]=useState('')
    const navigate = useNavigate();
    const [showDialog,setShowDialog]=useState(false)
    const [showDialogProfile,setShowDialogProfile]=useState(false)
    const[visible,setVisible]=useState('none')
    const [showDialogSection,setShowDialogSection]=useState(false)
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
   useEffect(()=>{
    getUser(window.token).then(
      async (response)=>{
        setName(response.data.name)
        setEmailA(response.data.email)
        setMobileA(response.data.mobile)
        setPasswordA(response.data.password)
       }
   )

   },[])
  const handleTryAdd=()=>{
    setOpen(false);
    setShowDialogSection(false)
    setShowDialog(true)

}
  const handleAdd=()=>{
    setShowDialog(false);
    setShowDialogSection(false)
    Add(named,mobile,email,password,window.token)
  }
  const handleEdit=()=>{
    setShowDialogProfile(false);
    setShowDialogSection(false)
    Edit(name,mobileA,emailA,passwordA,window.token)
  }
    const handleClose = () => {
      setOpen(false);
      setShowDialogSection(false)
      setShowDialog(false)
      setShowDialogProfile(false)
    };
    const handleAddSection=()=>{
      setOpen(false);
      setShowDialogSection(false)
      setShowDialog(false)
      setShowDialogProfile(false)
      addSection({title:title,description:description})
    }
    return(
        <div className='Side'> 
        {open?  <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a New Admin</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new admin with same powers
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={named}
            onChange={(e)=>setNamed(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="text"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          /> <TextField
          autoFocus
          margin="dense"
          id="mobile"
          label="Mobile"
          type="text"
          fullWidth
          variant="standard"
          value={mobile}
          onChange={(e)=>setMobile(e.target.value)}
        /> <TextField
        autoFocus
        margin="dense"
        id="password"
        label="Password"
        type="password"
        fullWidth
        variant="standard"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleTryAdd}>Add</Button>
        </DialogActions>
      </Dialog>: null}
      {showDialogSection?  <Dialog open={showDialogSection} onClose={handleClose}>
        <DialogTitle>Add a New Section</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
          /> 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddSection}>Add</Button>
        </DialogActions>
      </Dialog>: null}
      {showDialog?<Dialog open={showDialog} onClose={handleClose}>
        <DialogTitle>Confirm Addtion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to add a new admin whose name is {named}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleAdd}>Yes</Button>
        </DialogActions>
      </Dialog>: null}
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
            <li className='SidebarItem'><a className='SidebarItem'  href='/dashboard'><img src={logo} alt='logo'/></a></li>
            <li className='SidebarItem' onClick={()=> navigate(`/students`,{state:{token:token}})}>Students</li>
            <li className='SidebarItem' onClick={()=> navigate(`/incomes`,{state:{token:token}})}>Incomes</li>
            <li className='SidebarItem' onClick={()=> navigate(`/outcomes`,{state:{token:token}})}>Outcomes</li>
            <li className='SidebarItem' onClick={()=> navigate(`/curriculum`,{state:{token:token}})}>Curriculum</li>
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
                <li className='listItem' onClick={()=>setOpen(true)}>new Admin</li><br/>
                <li className='listItem' onClick={()=>setShowDialogSection(true)}>new Section</li><br/>
                    <li className='listItem' onClick={()=>setShowDialogProfile(true)}>Profile</li><br/>
                    <li className='listItem'><a style={{color:'black',textDecoration:'none'}} href='/' >log out</a></li><br/>
                </ul>
            </div>
        </div>
    )
   
} 
