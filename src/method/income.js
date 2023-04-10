export const addIncome = async ({studentId,amount,note}) => {
    return await fetch(`http://localhost:5000/income/add`, {
       method: 'POST',
       body:JSON.stringify({
        studentId:studentId,
        amount: amount,
        note:note
       }),
       headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'authorization':localStorage.getItem('token')
       },
    })
       .then((response) => response.json())
       .then((data) => {
         return data
       })
       .catch((err) => {
          console.log(err.message);
       });
 };
 export const updateIncome = async ({_id,studentId,amount,note}) => {
    return await fetch(`http://localhost:5000/income/update/${_id}`, {
       method: 'PUT',
       body:JSON.stringify({
        studentId:studentId,
        amount: amount,
        note:note
       }),
       headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'authorization': localStorage.getItem('token')
       },
    })
       .then((response) => response.json())
       .then((data) => {
         return data
       })
       .catch((err) => {
          console.log(err.message);
       });
 };
 export const getIncomes = async () => {
    return await fetch(`http://localhost:5000/income/get`, {
       method: 'GET',
       headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'authorization': localStorage.getItem('token')
       },
    })
       .then((response) => response.json())
       .then((data) => {
         return data
       })
       .catch((err) => {
          console.log(err.message);
       });
 };
 export const deleteIncome = async ({_id}) => {
    return await fetch(`http://localhost:5000/income/delete/${_id}`, {
       method: 'DELETE',
       headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'authorization': localStorage.getItem('token')
       },
    })
       .then((response) => response.json())
       .then((data) => {
         return data
       })
       .catch((err) => {
          console.log(err.message);
       });
 };