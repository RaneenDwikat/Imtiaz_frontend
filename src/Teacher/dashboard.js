import { getStudentBySection } from "../method/student";
import { getUser } from "../method/user";
import Sidebar from "./sidebar";

import { useState,useEffect } from "react";

export default function TeacherDashboard(){
    const [search, setSearch] = useState("");
    const [res, setRes] = useState("");
    const [section,setSection]=useState('')
    const [filtered, setFiltered] = useState([]);
    useEffect(()=>{
        getUser(localStorage.getItem('token')).then((res)=>{
            setSection(res.data.section)
        }).catch((err)=>console.log(err))
        getStudentBySection({section:section}).then((res)=>{
            setRes(res.msg)
            setFiltered(res.msg)
        })
    },[section])
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
// const [state,setState]=useState(0)
return(<div>
    <Sidebar />
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
          <th className="Table">Bus or not</th>
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
                  <td className="Table" key={stu.bus}>{stu.bus}</td>
                </tr>
              );
            })
          : null}
        </tbody>
      </table>
</div>);
}