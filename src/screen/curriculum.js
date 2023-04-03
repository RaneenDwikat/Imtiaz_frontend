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
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleDelete = () => {
    setShowDialog(false);
    deleteFile({id:id})
  };
  const handleClose = () => {
    setShowDialog(false);
    setShowEdit(false);
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
    searchFor()
    getSections().then((response) => {
        setSections(response.msg);
      });
    fetchFiles().then((response) => {
        setFiles(response.data);
        setFiltered(response.data.msg)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      })},[state, showDialog, showEdit] );

  const handleDownload = (id,name) => {
    fetchFile({id}).then((response)=>{
        setFile(response)
    })
    const a = document.createElement('a');
    a.href = file;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const searchFor=()=>{
    if(search!==''){
      const data= files.msg.filter((item) => {
        return JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
    })
    setFiltered(data)
    }else{
      setFiltered(files.msg)
    }
  }
  return (
    <div >
      <Sidebar />
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
        value={sectionId}
        
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
    <input
        type="text"
        className="search"
        onChange={(e) =>{ setSearch(e.target.value);}}
        style={{ float: "left" }}
      />
      <button className="SearchButton" onClick={()=>{searchFor()}}>
        search
      </button><br/><br/>
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
        {filtered? filtered.map((f)=>{
           return <tr>
            <td className="Table">{f.name}</td>
            <td className="Table">{f.subject}</td>
            <td className="Table">{f.section[0].title}</td>
            <td className="Table"><button className="upload" onClick={()=>handleDownload(f._id,f.name)}>Download</button></td> 
            <td className="Table" key={f._id}>
                      <button
                        onClick={() => {
                          console.log(f._id)
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
