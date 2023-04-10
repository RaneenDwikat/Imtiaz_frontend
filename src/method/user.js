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
export const getTeachers = async (token) => {
   return await fetch('http://localhost:5000/user/getTeachers', {
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
export const AddAdmin = async (name,mobile,email, password) => {
   return await fetch('http://localhost:5000/user/add', {
      method: 'POST',
      body: JSON.stringify({
         email: email,
         password: password,
         name:name,
         mobile:mobile,
         role:'admin'
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
export const Edit = async (name,mobile,email, password) => {
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
export const AddTeacher = async (name,mobile,email, password,sectionId) => {
   return await fetch('http://localhost:5000/user/add', {
      method: 'POST',
      body: JSON.stringify({
         email: email,
         password: password,
         name:name,
         mobile:mobile,
         role:'teacher',
         section:sectionId
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
export const deactivateTeacher = async ({_id}) => {
   return await fetch(`http://localhost:5000/user/deactivate/${_id}`, {
      method: 'PUT',
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
export const updateTeacher = async ({_id,name,email,password,mobile,section,salary}) => {
   console.log(_id)
   return await fetch(`http://localhost:5000/user/edit/${_id}`, {
      method: 'PUT',
      body:JSON.stringify({
         name: name,
         email:email,
         password: password,
         mobile:mobile,
         section:section,
         salary:salary
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