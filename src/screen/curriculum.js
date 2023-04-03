import { useEffect, useState } from "react";
import Sidebar from "../component/sidebar";
import { getSections } from "../method/section";
import edit from "../images/edit.png";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {  deleteFile, fetchFile, fetchFiles, updateFile, uploadFile } from "../method/curriculum";
import AddCurriculum from "./addCurriculum";
export default function Curriculum() {
  const [sectionId, setSectionId] = useState("");
  const [sections, setSections] = useState([]);
  const [section, setSection] = useState("");
  const [subject,setSubject]= useState('')
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const[id,setId]=useState('')
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [state,setState]=useState(0)
  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleDelete = () => {
    setShowDialog(false);
    // deleteIncome({ _id: id });
  };
  const handleClose = () => {
    setShowDialog(false);
    setShowEdit(false);
    deleteFile({id})
  };
  const handleEdit = () => {
    setShowDialog(false);
    setShowEdit(false);
    updateFile({subject:subject,sectionId:sectionId,id:id})
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    uploadFile({selectedFile,subject,sectionId})
  };
  useEffect( () => {
    getSections().then((response) => {
        setSections(response.msg);
      });
    fetchFiles().then((response) => {
        setFiles(response.data);
        console.log(files)
      })},[state,showDialog,showEdit] );

  const handleDownload = (id,name) => {
    fetchFile({id}).then((response)=>{
        setFile(response)
    })
    console.log(id)
    const a = document.createElement('a');
    a.href = file;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };


  return (
    <div >
      <Sidebar /><br/>
      <div className="body">
      {showEdit ? (
        <Dialog open={showEdit} onClose={handleClose}>
          <DialogTitle>Edit File</DialogTitle>
          <DialogContent>
          <form onSubmit={handleFormSubmit}>
      <label key="sectionLabel" style={{ margin: "10px", marginBottom: "5px" }}>
        section:
      </label>
      <select style={{ margin: "10px"}}
        key="section"
        value={section}
        onChange={(e) => {
          setSectionId(sections[e.target.options.selectedIndex]._id);
          setSection(e.target.value);
        }}
      >
        {sections.map((sec) => (
          <option value={sec._id}>{sec.title}</option>
        ))}
      </select><br/>
        <input style={{ margin: "10px"}} type="text" placeholder="Subject..." value={subject} onChange={(e)=>setSubject(e.target.value)}/><br/>

        <button style={{ float: "right"}} onClick={handleEdit} className="upload" type="submit">Edit</button>
      </form>
          </DialogContent>
        </Dialog>
      ) : null}
      {showDialog ? (
        <Dialog open={showDialog} onClose={handleClose}>
          <DialogTitle>Are you sure to delete?</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </DialogActions>
        </Dialog>
      ) : null}
    <AddCurriculum state={state} setState={setState}/>

      <table className="studentTable" style={{ width: "100%" }}>
        <thead>
          <tr>
          <th className="Table">File Name</th>
          <th className="Table">Subject</th>
          <th className="Table">Section</th>
          <th className="Table">Download</th>
            <th className="Table">Actions</th>
          </tr>
        </thead>
        <tbody>
        {files.msg? files.msg.map((f)=>{
           return <tr>
            <td className="Table">{f.name}</td>
            <td className="Table">{f.subject}</td>
            <td className="Table">{f.section[0].title}</td>
            <td className="Table"><button className="upload" onClick={()=>handleDownload(f._id,f.name)}>Download</button></td> 
            <td className="Table" key={f._id}>
                      <button
                        onClick={() => {
                          setId(f._id);
                          setShowDialog(true);
                        }}
                        className="deleteButton"
                      >
                        X
                      </button>
                      <button
                        onClick={() => {
                          setId(f._id);
                          setSectionId(f.sectionId)
                          setSection(f.section[0].title)
                          console.log(section)
                          setShowEdit(true);
                          setSubject(f.subject)
                        }}
                        className="editButton"
                      >
                        <img src={edit} alt="edit" />
                      </button>
                    </td>                   
            </tr>  }):null}

            </tbody></table>
           
   </div> </div>
  );
}
