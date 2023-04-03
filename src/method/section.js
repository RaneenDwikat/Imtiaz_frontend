export const getSections = async () => {
    return await fetch(`http://localhost:5000/section/get`, {
       method: 'GET',
       headers: {
          'Content-type': 'application/json; charset=UTF-8',
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