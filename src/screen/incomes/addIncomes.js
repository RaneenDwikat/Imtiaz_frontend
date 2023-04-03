import { useEffect, useState } from "react";
import {
  getStudents,
} from "../../method/student";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import { addIncome } from "../../method/income";
export default function AddIncomes({state,setState}) {
  const [showAdd, setShowAdd] = useState(false);
  const [students,setStudents]=useState([]);
  const [note,setNote]=useState('');
  const [amount,setAmount]=useState('');
  const [student,setStudent]=useState('')
  const [studentId,setStudentId]=useState('')
  useEffect(() => {
    getStudents().then((response)=>{
        setStudents(response.msg)
        
    })
  }, [showAdd, students]);


  const handleClose = () => {
    setShowAdd(false)
  };

  const handleAdd = () => {
    setShowAdd(false)
    setState(state+1)
    
    addIncome({note:note,amount:amount,studentId:studentId})

  };
  return (
    <div>
      {showAdd ? (
        <Dialog open={showAdd} onClose={handleClose}>
          <DialogTitle>add income</DialogTitle>
          <DialogContent>
          <label style={{ margin: "10px", marginBottom: "5px" }}>
              Students:
            </label>
            <select
              style={{ width: "100%" }}
              value={student}
              onChange={(e) => {setStudentId(students[e.target.options.selectedIndex]._id);setStudent(e.target.value)}}
            >
              {students.map((stu) => (
                <option key={stu._id} value={stu.name}>{stu.name}</option>
              ))}
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
    
      <button className="Add" onClick={()=>{setShowAdd(true);setStudent(students[0])}}>+ Add a new Income</button>
    </div>
  );
}
