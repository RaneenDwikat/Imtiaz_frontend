export const login = async (email, password) => {
    return await fetch('http://localhost:5000/user/login', {
       method: 'POST',
       body: JSON.stringify({
          email: email,
          password: password,
       }),
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
 export const getUser = async (token) => {
   return await fetch(`http://localhost:5000/user/getUser/${token}`, {
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
export const Add = async (name,mobile,email, password,token) => {
   return await fetch('http://localhost:5000/user/add', {
      method: 'POST',
      body: JSON.stringify({
         email: email,
         password: password,
         name:name,
         mobile:mobile
      }),
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
         'authorization': token
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
export const Edit = async (name,mobile,email, password,token) => {
   return await fetch('http://localhost:5000/user/edit', {
      method: 'PUT',
      body: JSON.stringify({
         email: email,
         password: password,
         name:name,
         mobile:mobile
      }),
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
         'authorization': token
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

