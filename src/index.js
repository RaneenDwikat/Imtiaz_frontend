import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Students from './screen/student';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './screen/dashboard';
import Incomes from './screen/incomes';
import Outcomes from './screen/outcomes';
import Curriculum from './screen/curriculum';
import Teachers from './screen/teacher';
import TeacherDashboard from './Teacher/dashboard';
import TeacherCurriculum from './Teacher/curriculum';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
      <BrowserRouter>
  <Routes>
  <Route path="/" element={<App />}/>
  <Route path="/students" element={<Students />}/>
  <Route exact path="/dashboard" element={<Dashboard />}  />
  <Route exact path="/incomes" element={<Incomes />}  />
  <Route exact path="/outcomes" element={<Outcomes />}  />
  <Route exact path="/curriculum" element={<Curriculum />}  />
  <Route exact path="/teacher" element={<Teachers />}  />
  <Route exact path="/teacherDashboard" element={<TeacherDashboard />}  />
  <Route exact path="/teacherCurriculum" element={<TeacherCurriculum />}  />
  </Routes>
</BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
