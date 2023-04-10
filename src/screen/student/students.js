import { useEffect, useState } from "react";
import {
  deactivateStudent,
  getStudents,
  updateStudent,
} from "../../method/student";
import edit from "../../images/edit.png";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import { getSections } from "../../method/section";
export default function StudentTable({state,setState}) {
  const [res, setRes] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [id, setId] = useState('');
  const [showDialog, setShowDialog] = useState(false);
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
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    searchFor()
    getStudents().then((response) => {
      setRes(response.msg);
    });
    getSections().then(async (response) => {
      setSections(response.msg);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, gender, bus, monthlyEarning, motherMobile, fatherMobile, section, showEdit, showDialog, state, res]);

  const handleDeactivate = () => {
    setShowDialog(false);
    deactivateStudent({ _id: id });
  };
  const handleClose = () => {
    setShowDialog(false);
    setShowEdit(false);
  };
  const handleEdit = () => {
    setShowDialog(false);
    setShowEdit(false);
    setState(state=>state+1)
    updateStudent(
     { _id:id,
      name:name,
      monthlyEarning:monthlyEarning,
      motherMobile:motherMobile,
      fatherMobile:fatherMobile,
      bus:bus,section:sectionId,
      gender:gender,age:age}
    );
  };
  const searchFor=()=>{
    if(search!==''){
      const data= res.filter((item) => {
        return JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
    })
    setFiltered(data)
    }else{
      setFiltered(res)
    }
   
  }
  return (
    <div>
     
      {showEdit ? (
        <Dialog open={showEdit} onClose={handleClose}>
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
            /><TextField
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
              onChange={(e) => setBus(e.target.value)}
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
                <option value={sec.title}>{sec.title}</option>
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
            <Button onClick={handleEdit}>Edit</Button>
          </DialogActions>
        </Dialog>
      ) : null}
      {showDialog ? (
        <Dialog open={showDialog} onClose={handleClose}>
          <DialogTitle>Are you sure to delete?</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleDeactivate}>Delete</Button>
          </DialogActions>
        </Dialog>
      ) : null}
      <input
        type="text"
        className="search"
        onChange={(e) =>{ setSearch(e.target.value);}}
        style={{ float: "left" }}
      />
      <button className="SearchButton" onClick={()=>{searchFor()}}>
        search
      </button>
      <table className="studentTable" style={{ width: "100%" }}>
        <thead>
        <tr>
          <th className="Table">Name</th>
          <th className="Table">Age</th>
          <th className="Table">Gender</th>
          <th className="Table">Mother mobile</th>
          <th className="Table">Father mobile</th>
          <th className="Table">monthly Earning</th>
          <th className="Table">Section</th>
          <th className="Table">Bus or not</th>
          <th className="Table">Actions</th>
        </tr>
        </thead>
        <tbody>
        {filtered.map
          ? filtered.map((stu) => {
              return (
                <tr key={stu._id+'00'}>
                  <td className="Table" key={stu.name}>{stu.name}</td>
                  <td className="Table" key={stu.age}>{stu.age}</td>
                  <td className="Table" key={stu.gender}>{stu.gender}</td>
                  <td className="Table" key={stu.motherMobile}>{stu.motherMobile}</td>
                  <td className="Table" key={stu.fatherMobile}>{stu.fatherMobile}</td>
                  <td className="Table" key={stu.monthlyEarning}>{stu.monthlyEarning}</td>
                  {stu.section
                    ? stu.section.map((sec) => {
                        return <td className="Table" key={sec._id}>{sec.title}</td>;
                      })
                    : null}
                  <td className="Table" key={stu.bus}>{stu.bus}</td>
                  <td className="Table" key={stu._id}>
                    <button
                      onClick={() => {
                        setId(stu._id);
                        setShowDialog(true);
                      }}
                      className="deleteButton"
                    >
                      X
                    </button>
                    <button
                      onClick={() => {
                        setId(stu._id);
                        setShowEdit(true);
                        setBus(stu.bus);
                        setGender(stu.gender);
                        setFatherMobile(stu.fatherMobile);
                        setMotherMobile(stu.motherMobile);
                        setMonthlyEarning(stu.monthlyEarning);
                        setSection(stu.section);
                        setName(stu.name);
                      }}
                      className="editButton"
                    >
                      <img src={edit} alt="edit" />
                    </button>
                  </td>
                </tr>
              );
            })
          : null}
        </tbody>
      </table>
    </div>
  );
}
