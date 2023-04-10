import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import { getSections } from "../../method/section";
import { AddTeacher } from "../../method/user";
export default function AddTeachers({state,setState}) {
  const [showAdd, setShowAdd] = useState(false);
  const [sections,setSections]=useState([]);
  const [section,setSection]=useState('');
  const [sectionId,setSectionId]=useState('');
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [mobile,setMobile]=useState('')
  const [password,setPassword]=useState('')
  useEffect(() => {
    getSections().then((response)=>{
        setSections(response.msg)
        
    })
  }, [showAdd, sections]);


  const handleClose = () => {
    setShowAdd(false)
  };

  const handleAdd = () => {
    setShowAdd(false)
    setState(state+1)
    
    AddTeacher({name:name,email:email,password:password,mobile:mobile,section:sectionId})

  };
  return (
    <div>
      {showAdd ? (
        <Dialog open={showAdd} onClose={handleClose}>
          <DialogTitle>add Teacher</DialogTitle>
          <DialogContent>
          <label style={{ margin: "10px", marginBottom: "5px" }}>
              Section:
            </label>
            <select
              style={{ width: "100%" }}
              value={section}
              onChange={(e) => {setSectionId(sections[e.target.options.selectedIndex]._id);setSection(e.target.value)}}
            >
              {sections.map((sec) => (
                <option key={sec._id} value={sec.title}>{sec.title}</option>
              ))}
            </select>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value={name}
              onChange={(e) => {setName(e.target.value)}}
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
              onChange={(e) => {setEmail(e.target.value)}}
            />
           <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
           <TextField
              autoFocus
              margin="dense"
              id="mobile"
              label="Mobile"
              type="text"
              fullWidth
              variant="standard"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAdd}>Add</Button>
          </DialogActions>
        </Dialog>
      ) : null}
    
      <button className="SearchButton" onClick={()=>{setShowAdd(true)}}>+ Add a new Teacher</button>
    </div>
  );
}
