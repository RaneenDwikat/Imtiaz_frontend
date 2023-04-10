/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import edit from "../../images/edit.png";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import { deleteOutcome, getOutcomes, updateOutcome } from "../../method/outcome";
export default function OutcomeTable({ state, setState }) {
  const [showEdit, setShowEdit] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [id, setId] = useState("");
  const [outcomes, setOutcomes] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [type,setType]= useState('')
  useEffect(() => {
    searchFor()
    getOutcomes().then((response)=>{
        setOutcomes(response.msg);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showEdit, showDialog, state,outcomes]);
  const handleDelete = () => {
    setShowDialog(false);
    deleteOutcome({ _id: id });
  };
  const handleClose = () => {
    setShowDialog(false);
    setShowEdit(false);
  };
  const handleEdit = () => {
    setShowDialog(false);
    setShowEdit(false);
    setState((state) => state + 1);
    updateOutcome({ type: type, amount: amount, note: note, _id: id });
  };
  const searchFor=()=>{
    if(search!==''){
      const data= outcomes.filter((item) => {
        return JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
    })
    setFiltered(data)
    }else{
      setFiltered(outcomes)
    }
   
  }
  return (
    <div>
      {showEdit ? (
        <Dialog open={showEdit} onClose={handleClose}>
          <DialogTitle>Edit Outcome</DialogTitle>
          <DialogContent>
          <label style={{ margin: "10px", marginBottom: "5px" }}>
              Type:
            </label>
            <select
              style={{ width: "100%" }}
              value={type}
              onChange={(e) => {setType(e.target.value)}}
            >
              <option key='rent' value='rent'>Rent</option>
              <option key='salary' value='salary'>Salary</option>
              <option key='material' value='material'>Material</option>
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

            <th className="Table">Date</th>
            <th className="Table">Type</th>
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
                    <td className="Table" key={inco.createdAt}>
                      {inco.createdAt.split('T')[0]}
                    </td>
                    <td className="Table" key={inco.type}>
                      {inco.type}
                    </td>
                    <td
                      className="Table"
                      key={inco.amount + inco._id}
                    >
                      {inco.amount}
                    </td>
                    <td
                      className="Table"
                      key={inco.note + inco._id}
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
                          setId(inco._id);
                          setType(inco.type);
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
