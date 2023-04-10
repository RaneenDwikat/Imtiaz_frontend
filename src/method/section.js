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

 export const addSection = async ({title,description}) => {
   return await fetch(`http://localhost:5000/section/add`, {
      method: 'POST',
      body:JSON.stringify({
         title:title,
         description: description,
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