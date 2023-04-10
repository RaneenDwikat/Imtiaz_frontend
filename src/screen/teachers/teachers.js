import { useEffect, useState } from "react";
import edit from "../../images/edit.png";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import { getSections } from "../../method/section";
import { deactivateTeacher, getTeachers, updateTeacher } from "../../method/user";
export default function TeacherTable({state,setState}) {
  const [res, setRes] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [id, setId] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [sections,setSections]=useState([]);
  const [section,setSection]=useState('');
  const [sectionId,setSectionId]=useState('');
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [mobile,setMobile]=useState('')
  const [password,setPassword]=useState('')
  const [salary,setSalary]=useState('')
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    searchFor()
    getTeachers().then((response) => {
      setRes(response.data);
      console.log(response.data)
      setFiltered(response.data)
    });
    getSections().then(async (response) => {
      setSections(response.msg);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, section,sectionId, showEdit, showDialog,mobile,salary,email, state]);

  const handleDeactivate = () => {
    setShowDialog(false);
    deactivateTeacher({ _id: id });
  };
  const handleClose = () => {
    setShowDialog(false);
    setShowEdit(false);
  };
  const handleEdit = () => {
    setShowDialog(false);
    setShowEdit(false);
    setState(state=>state+1)
    updateTeacher(
     { _id:id,
      name:name,
      email:email,
      mobile:mobile,
      password:password,
      section:sectionId,
      salary:salary
     }
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
    <div >
     
      {showEdit ? (
        <Dialog open={showEdit} onClose={handleClose}>
          <DialogTitle>Edit student</DialogTitle>
          <DialogContent>
          <label style={{ margin: "10px", marginBottom: "5px" }}>
              Section:
            </label>
            <select
              style={{ width: "100%" }}
              value={section}
              onChange={(e) => {setSectionId(sections[e.target.options.selectedIndex]._id);setSection(e.target.value);}}
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
              id="salary"
              label="Salary"
              type="text"
              fullWidth
              variant="standard"
              value={salary}
              onChange={(e) => {setSalary(e.target.value)}}
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
          <th className="Table">Email</th>
          <th className="Table">Mobile</th>
          <th className="Table">Salary</th>
          <th className="Table">Section</th>
          <th className="Table">Actions</th>
        </tr>
        </thead>
        <tbody>
        {filtered.map
          ? filtered.map((tea) => {
              return (
                <tr key={tea._id+'00'}>
                  <td className="Table" key={tea.name}>{tea.name}</td>
                  <td className="Table" key={tea.email}>{tea.email}</td>
                  <td className="Table" key={tea.mobile}>{tea.mobile}</td>
                  <td className="Table" key={tea.salary}>{tea.salary}</td>
                  {tea.section
                    ? tea.section.map((sec) => {
                        return <td className="Table" key={sec._id}>{sec.title}</td>;
                      })
                    : null}
                  <td className="Table" key={tea._id}>
                    <button
                      onClick={() => {
                        setId(tea._id);
                        setShowDialog(true);
                      }}
                      className="deleteButton"
                    >
                      X
                    </button>
                    <button
                      onClick={() => {
                        setId(tea._id);
                        setShowEdit(true);
                        setEmail(tea.email)
                        setMobile(tea.mobile)
                        setPassword(tea.password)
                        setSection(tea.section[0].title);
                        setName(tea.name);
                        setSalary(tea.salary)
                        setSectionId(tea.section[0]._id)
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
