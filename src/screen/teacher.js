import TeacherTable from "./teachers/teachers";
import Sidebar from "../component/sidebar";
import AddTeachers from "./teachers/addTeacher";
import { useState } from "react";

export default function Teachers(){
const [state,setState]=useState(0)
return(<div>
    <Sidebar />
    <div className="body">
    <AddTeachers state={state} setState={setState} />
    <TeacherTable state={state} setState={setState}/></div>
</div>);
}