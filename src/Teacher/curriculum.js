import { fetchFile, fetchFiles, fetchFilesBySection } from "../method/curriculum";
import { getUser } from "../method/user";
import Sidebar from "./sidebar";

import { useState,useEffect } from "react";

export default function TeacherCurriculum(){
    const [search, setSearch] = useState("");
    const [res, setRes] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [file, setFile] = useState(null);
    const [section, setSection] = useState('');

    useEffect(()=>{
        getUser(localStorage.getItem('token')).then((res)=>{
            setSection(res.data.section)
            fetchFilesBySection(section).then((response) => {
                setRes(response.data.msg);
                setFiltered(response.data.msg);
              });
        }).catch((err)=>console.log(err))
       
    },[section,res])
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
      const handleDownload = async (id, name) => {
        fetchFile({ id:id }).catch((e) => console.log(e)).then((res)=>{
         setFile(URL.createObjectURL(res.data))
         const a = document.createElement("a");
         a.href = file;
         a.download = name;
         document.body.appendChild(a);
         a.click();
         document.body.removeChild(a);
        })
           
     };return(<div>
    <Sidebar />
    <input
          type="text"
          className="search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          style={{ float: "left" }}
        />
        <button
          className="SearchButton"
          onClick={() => {
            searchFor();
          }}
        >
          search
        </button>
    <br />
        <br />
        <table className="studentTable" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th className="Table">File Name</th>
              <th className="Table">Subject</th>
              <th className="Table">Download</th>
            </tr>
          </thead>
          <tbody>
            {filtered
              ? filtered.map((f) => {
                  return (
                    <tr>
                      <td className="Table">{f.name}</td>
                      <td className="Table">{f.subject}</td>
                      <td className="Table">
                        <button
                          className="upload"
                          onClick={() => handleDownload(f._id, f.name)}
                        >
                          Download
                        </button>
                      </td>
                    
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
</div>);
}