import { useState,useEffect } from "react";
import { getNumberOfStudent,getNumberOfGirls, getNumberOfKG1,getNumberOfKG2 } from "../method/student";
import './main.css'
function Main() {
  const [girls,setGirls]= useState(0)
  const [boys,setBoys]= useState(0)
  const [KG1,setKG1]= useState(0)
  const [KG2,setKG2]= useState(0)
  const [students,setStudents]= useState(0)
  useEffect(()=>{
    getNumberOfStudent().then((response)=>{
      setStudents(response.msg)
    })
    getNumberOfGirls().then((response)=>{
      setGirls(response.msg)
      setBoys(students-girls)
    })
    getNumberOfKG1().then((response)=>{
      setKG1(response.msg)
    })
    getNumberOfKG2().then((response)=>{
      setKG2(response.msg)
    })
  })
  return(
    <div className="Main">
      <i className="Students">Number of Students: {students}</i>
      <i className="KG1"> Number of KG1: {KG1}</i>
      <i className="KG2"> Number of KG2: {KG2}</i>
      <i className="Boys"> Number of Boys: {boys}</i>
      <i className="Girls">Number of Girls: {girls}</i>
    </div>
  );
}

export default Main;
