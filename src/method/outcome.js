export const addOutcome = async ({type,amount,note}) => {
    return await fetch(`http://localhost:5000/outcome/add`, {
       method: 'POST',
       body:JSON.stringify({
        type:type,
        amount: amount,
        note:note
       }),
       headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'authorization': window.token
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
 export const updateOutcome = async ({_id,type,amount,note}) => {
    return await fetch(`http://localhost:5000/outcome/update/${_id}`, {
       method: 'PUT',
       body:JSON.stringify({
        type:type,
        amount: amount,
        note:note
       }),
       headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'authorization': window.token
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
 export const getOutcomes = async () => {
    return await fetch(`http://localhost:5000/outcome/get`, {
       method: 'GET',
       headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'authorization': window.token
       },
    })
       .then((response) => response.json())
       .then((data) => {
        console.log(data)
         return data
       })
       .catch((err) => {
          console.log(err.message);
       });
 };
 export const deleteOutcome = async ({_id}) => {
    return await fetch(`http://localhost:5000/outcome/delete/${_id}`, {
       method: 'DELETE',
       headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'authorization': window.token
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