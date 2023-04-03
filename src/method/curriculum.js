import axios from 'axios'
export const uploadFile = async ({selectedFile,subject,sectionId}) => {
    
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
        console.log(subject)
        await axios.post('http://localhost:5000/api/upload', formData, {
           
          headers: {
            'Content-Type': 'multipart/form-data',
            'sectionId': sectionId,
            subject: subject,
          },
        }).then((response)=>{
            console.log('file uploaded successfully');
            return(response)
        })

      } catch (err) {
        console.log('Error uploading file:', err);
      }
 };

 export const fetchFiles=async()=>{
    return await axios.get('http://localhost:5000/curriculum/getFiles' )
    .then((data) => {
     console.log(data)
      return data
    })
    .catch((err) => {
       console.log(err.message);
    });
 }
 export const fetchFile=async({id})=>{
   const response= await axios.get(`http://localhost:5000/curriculum/download/${id}` ,{ responseType: 'blob' }).catch((err) => {
        console.log(err.message);
     });
    return URL.createObjectURL(response.data);
 }
 export const updateFile = async ({subject,sectionId,id}) => {
    return await fetch(`http://localhost:5000/curriculum/update/${id}`, {
       method: 'PUT',
       body:JSON.stringify({
        subject: subject,
        sectionId:sectionId
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
 export const deleteFile = async ({id}) => {
    return await fetch(`http://localhost:5000/curriculum/delete/${id}`, {
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
