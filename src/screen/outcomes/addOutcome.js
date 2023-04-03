import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import { addOutcome } from "../../method/outcome";
export default function AddOutcomes({state,setState}) {
  const [showAdd, setShowAdd] = useState(false);
  const [note,setNote]=useState('');
  const [amount,setAmount]=useState('');
  const [type,setType]=useState('')
  const handleClose = () => {
    setShowAdd(false)
  };

  const handleAdd = () => {
    setShowAdd(false)
    setState(state+1)
    
    addOutcome({note:note,amount:amount,type:type})

  };
  return (
    <div>
      {showAdd ? (
        <Dialog open={showAdd} onClose={handleClose}>
          <DialogTitle>add outcome</DialogTitle>
          <DialogContent>
          <label style={{ margin: "10px", marginBottom: "5px" }}>
              Type:
            </label>
            <select
              style={{ width: "100%" }}
              value={type}
              onChange={(e) => {setType(e.target.value)}}
            >
              <option key='rent' value='rent'>Rent</option>
              <option key='salary' value='salary'>Salary</option>
              <option key='material' value='material'>Material</option>
            </select>
            <TextField
              autoFocus
              margin="dense"
              id="amount"
              label="Amount"
              type="text"
              fullWidth
              variant="standard"
              value={amount}
              onChange={(e) => {setAmount(e.target.value);console.log(amount)}}
            />
           <TextField
              autoFocus
              margin="dense"
              id="note"
              label="Note"
              type="text"
              fullWidth
              variant="standard"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
           
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAdd}>Add</Button>
          </DialogActions>
        </Dialog>
      ) : null}
    
      <button className="Add" onClick={()=>{setShowAdd(true);}}>+ Add a new Outcome</button>
    </div>
  );
}
