import { useEffect, useState } from "react";
import { getSections } from "../method/section";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {  uploadFile } from "../method/curriculum";
export default function AddCurriculum({state,setState}) {
  const [sectionId, setSectionId] = useState("");
  const [sections, setSections] = useState([]);
  const [section, setSection] = useState("");
  const [subject,setSubject]= useState('')
  const [selectedFile, setSelectedFile] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleClose = () => {
    setShowDialog(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setState(state+1)
    uploadFile({selectedFile,subject,sectionId})
  };
  useEffect( () => {
    getSections().then((response) => {
        setSections(response.msg);
      });
   },[state] );
  return (
    <div >

      {showDialog ? (
        <Dialog open={showDialog} onClose={handleClose}>
          <DialogTitle>Add File</DialogTitle>
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
        <input style={{ margin: "10px"}}  type="file" onChange={handleFileInputChange} /><br/>
        <input style={{ margin: "10px"}} type="text" placeholder="Subject..." value={subject} onChange={(e)=>setSubject(e.target.value)}/><br/>

        <button style={{ float: "right"}}  className="upload" type="submit">Upload File</button>
      </form>
          </DialogContent>
        </Dialog>
      ) : null} 
            <button className="Add" onClick={()=>{setShowDialog(true)}}>+ Add a new File</button>
   </div>
  );
}
