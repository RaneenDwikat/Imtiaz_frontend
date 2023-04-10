import StudentTable from "./student/students";
import Sidebar from "../component/sidebar";
import AddStudent from "./student/addStudent";
import { useState } from "react";

export default function Students(){
const [state,setState]=useState(0)
return(<div>
    <Sidebar />
    <div className="body">
    <AddStudent state={state} setState={setState} />
    <StudentTable state={state} setState={setState}/></div>
</div>);
}