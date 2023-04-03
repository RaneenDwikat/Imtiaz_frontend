/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import edit from "../../images/edit.png";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import { deleteIncome, getIncomes, updateIncome } from "../../method/income";
import { getStudents } from "../../method/student";
export default function IncomeTable({ state, setState }) {
  const [showEdit, setShowEdit] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [students, setStudents] = useState([]);
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [student, setStudent] = useState("");
  const [studentId, setStudentId] = useState("");
  const [id, setId] = useState("");
  const [incomes, setIncomes] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    searchFor()
    getIncomes().then((response) => {
      setIncomes(response.msg);
    });
    getStudents().then((response) => {
      setStudents(response.msg);
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showEdit, showDialog, state, incomes]);
  const handleDelete = () => {
    setShowDialog(false);
    deleteIncome({ _id: id });
  };
  const handleClose = () => {
    setShowDialog(false);
    setShowEdit(false);
  };
  const handleEdit = () => {
    setShowDialog(false);
    setShowEdit(false);
    setState((state) => state + 1);
    updateIncome({ studentId: studentId, amount: amount, note: note, _id: id });
  };
  const searchFor=()=>{
    if(search!==''){
      const data= incomes.filter((item) => {
        return JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
    })
    setFiltered(data)
    }else{
      setFiltered(incomes)
    }
   
  }
  return (
    <div className="body">
      {showEdit ? (
        <Dialog open={showEdit} onClose={handleClose}>
          <DialogTitle>Edit Income</DialogTitle>
          <DialogContent>
            <label style={{ margin: "10px", marginBottom: "5px" }}>
              Students:
            </label>
            <select
              style={{ width: "100%" }}
              value={student}
              onChange={(e) => {
                setStudentId(students[e.target.options.selectedIndex]._id);
                setStudent(e.target.value);
              }}
            >
              {students.map((stu) => (
                <option key={stu._id} value={stu.name}>
                  {stu.name}
                </option>
              ))}
            </select>
            <TextField
              autoFocus
              margin="dense"
              id="amount"
              label="Amount"
              type="text"
              fullWidth
              variant="standard"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="note"
              label="Note"
              type="text"
              fullWidth
              variant="standard"
              value={note}
              onChange={(e) => setNote(e.target.value)}
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
            <Button onClick={handleDelete}>Delete</Button>
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
          <th className="Table">Student Name</th>
          <th className="Table">Student Section</th>
            <th className="Table">Mother mobile</th>
            <th className="Table">Father mobile</th>
            <th className="Table">monthly Earning</th>
            <th className="Table">Date</th>
            <th className="Table">Amount</th>
            <th className="Table">Note</th>
            <th className="Table">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map
            ? filtered.map((inco) => {
                return (
                  <tr key={inco._id + "00"}>
                    <td className="Table" key={inco.student[0].name}>
                      {inco.student[0].name}
                    </td>

                    <td className="Table" key={inco.student[0].section[0]._id}>
                      {inco.student[0].section[0].title}
                    </td>

                    <td className="Table" key={inco.student[0].motherMobile}>
                      {inco.student[0].motherMobile}
                    </td>
                    <td className="Table" key={inco.student[0].fatherMobile}>
                      {inco.student[0].fatherMobile}
                    </td>
                    <td className="Table" key={inco.student[0].monthlyEarning}>
                      {inco.student[0].monthlyEarning}
                    </td>
                    <td className="Table" key={inco.createdAt}>
                      {inco.createdAt.split('T')[0]}
                    </td>
                    <td
                      className="Table"
                      key={inco.amount + inco.student[0].name}
                    >
                      {inco.amount}
                    </td>
                    <td
                      className="Table"
                      key={inco.note + inco.student[0].name}
                    >
                      {inco.note}
                    </td>
                    <td className="Table" key={inco._id}>
                      <button
                        onClick={() => {
                          setId(inco._id);
                          setShowDialog(true);
                        }}
                        className="deleteButton"
                      >
                        X
                      </button>
                      <button
                        onClick={() => {
                          setStudentId(inco.student[0]._id);
                          setId(inco._id);
                          setStudent(inco.student[0].name);
                          setShowEdit(true);
                          setAmount(inco.amount);
                          setNote(inco.note);
                        }}
                        className="editButton"
                      >
                        <img src={edit} alt="edit" />
                      </button>
                    </td>
                  </tr>
                );
              })
            : <h1> No Data</h1>}
        </tbody>
      </table>
    </div>
  );
}
