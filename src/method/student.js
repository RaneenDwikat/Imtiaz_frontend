export const getNumberOfStudent = async () => {
    return await fetch(`http://localhost:5000/student/getNumberOfStudent`, {
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
 export const getNumberOfGirls = async () => {
   return await fetch(`http://localhost:5000/student/getNumberOfGirls`, {
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
export const getNumberOfKG1 = async () => {
   return await fetch(`http://localhost:5000/student/getNumberOfKG1`, {
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
export const getNumberOfKG2 = async () => {
   return await fetch(`http://localhost:5000/student/getNumberOfKG2`, {
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
export const getStudents = async () => {
   return await fetch(`http://localhost:5000/student/retrieve`, {
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
export const deactivateStudent = async ({_id}) => {
   console.log(_id)
   return await fetch(`http://localhost:5000/student/deactivate/${_id}`, {
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
export const updateStudent = async ({_id,name,motherMobile,fatherMobile,monthlyEarning,bus,gender,age,section}) => {
   console.log(_id)
   return await fetch(`http://localhost:5000/student/update/${_id}`, {
      method: 'PUT',
      body:JSON.stringify({
         name: name,
         monthlyEarning:monthlyEarning,
         motherMobile:motherMobile,
         fatherMobile: fatherMobile,
         bus:bus,
         gender:gender,
         section:section,
         age:age
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
export const addStudent = async ({name,motherMobile,fatherMobile,monthlyEarning,bus,gender,age,section}) => {
   return await fetch(`http://localhost:5000/student/add`, {
      method: 'POST',
      body:JSON.stringify({
         name: name,
         monthlyEarning:monthlyEarning,
         motherMobile:motherMobile,
         fatherMobile: fatherMobile,
         bus:bus,
         gender:gender,
         age:age,
         section:section,
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
export const getStudentBySection = async ({section}) => {
   return await fetch(`http://localhost:5000/student/getBySection/${section}`, {
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