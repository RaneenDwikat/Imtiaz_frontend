import { useEffect, useState } from "react";
import {
  addStudent,
} from "../../method/student";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import { getSections } from "../../method/section";
export default function AddStudent({state,setState}) {
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [motherMobile, setMotherMobile] = useState('');
  const [fatherMobile, setFatherMobile] = useState('');
  const [monthlyEarning, setMonthlyEarning] = useState('');
  const [bus, setBus] = useState('');
  const [sections, setSections] = useState([]);
  const [section, setSection] = useState('');
  const [age,setAge]=useState('')
  const [sectionId, setSectionId] = useState('');
  useEffect(() => {
    getSections().then(async (response) => {
      setSections(response.msg);
    });
  }, [name, gender, bus, monthlyEarning, motherMobile, fatherMobile, section, showAdd,state]);


  const handleClose = () => {
    setShowAdd(false)
  };

  const handleAdd = () => {
    setShowAdd(false)
    setState(state+1)
    addStudent(
     {
      name:name,
      monthlyEarning:monthlyEarning,
      motherMobile:motherMobile,
      fatherMobile:fatherMobile,
      bus:bus,section:sectionId,
      gender:gender,age:age}
    );
    console.log(bus)

  };
  return (
    <div>
      {showAdd ? (
        <Dialog open={showAdd} onClose={handleClose}>
          <DialogTitle>Edit student</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
           <TextField
              autoFocus
              margin="dense"
              id="age"
              label="Age"
              type="text"
              fullWidth
              variant="standard"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <label style={{ margin: "10px", marginBottom: "5px" }}>Bus:</label>
            <select 
              style={{ width: "100%" }}
              value={bus}
              onChange={(e) => {setBus(e.target.value);console.log(bus)}}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <label style={{ margin: "10px", marginBottom: "5px" }}>
              section:
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
            <div>
              <input
                type="radio"
                value="male"
                name="gender"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Male
              <input
                type="radio"
                value="female"
                name="gender"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Female
            </div>
            <TextField
              autoFocus
              margin="dense"
              id="motherMobile"
              label="Mother Mobile"
              type="text"
              fullWidth
              variant="standard"
              value={motherMobile}
              onChange={(e) => setMotherMobile(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="fatherMobile"
              label="Father Mobile"
              type="text"
              fullWidth
              variant="standard"
              value={fatherMobile}
              onChange={(e) => setFatherMobile(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="monthlyEarning"
              label="Monthly Earning"
              type="text"
              fullWidth
              variant="standard"
              value={monthlyEarning}
              onChange={(e) => setMonthlyEarning(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAdd}>Add</Button>
          </DialogActions>
        </Dialog>
      ) : null}
    
      <button className="Add" onClick={()=>setShowAdd(true)}>+ Add a new student</button>
    </div>
  );
}
