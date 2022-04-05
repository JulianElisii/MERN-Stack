import React, { useEffect, useState } from 'react';
import axios from "axios"
import M from 'materialize-css';

const Task = () => {

  const initialEntry = {
    title : "" ,
     description : "",
     _id : ""
  };
 
 const [Imput, setImput] = useState(initialEntry); 
 const [Task, setTask] = useState([]);
 

   useEffect(() => {
        ObteinUser()
     }, []); 
      

 const SendUser = () => {
   if(Imput._id){
     axios.put(`http://localhost:4000/api/tasks/${Imput._id}`, Imput )
     .then(response => {
       const {data} = response
       console.log(data)
       //poner advertencia de tarea creada
       M.toast({html: 'Task Updated'})
       setImput(initialEntry)
       ObteinUser();
     })
   } 
    else {
      axios.post("http://localhost:4000/api/tasks", Imput)  
    .then(response => {
      const {data} = response
      console.log(data)
      //poner advertencia de tarea creada
      M.toast({html: 'Task Posted'})
      setImput(initialEntry)
      ObteinUser();
    }) 
  }
}

  const ObteinUser = () => {
    axios.get("http://localhost:4000/api/tasks")
    .then(response => {
      const {data} = response
      console.log(data)
      setTask(data)
    })
  }

  const DeleteTask = (id) => {
    if(window.confirm("Are you sure want to delete it?")) {
      axios.delete(`http://localhost:4000/api/tasks/${id}`)
    .then(response => {
      const {data} = response
      console.log(data)
      //poner una advertencia tarea borrada
      M.toast({html: 'Task Deleted'})
      ObteinUser()
       });
      }
       else {
      M.toast({html: 'Function not executed'})
    }
  }

  const UpdateTask = (id) => {
    axios.get(`http://localhost:4000/api/tasks/${id}`)
    .then(response => {
      const {data} = response
      console.log(data)
      setImput({
        title : data.title,
        description : data.description,
         _id : data._id
      })
    })
  }
  
  const handelInput = (e) => {
    const { name, value } = e.target;
    setImput({ ...Imput, [name]: value });
  };
  
  const preventDefault = e => {
      e.preventDefault()
  }

    return (
        
      <div>
          {/* NAVIGATION */}
        <nav className="light-blue darken-4">
          <div className="container">
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">MERN Stack</a>
            </div>
          </div>
        </nav>
        
         <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={preventDefault}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input onChange={handelInput} name="title" value={Imput.title}  type="text" placeholder="Task Title" autoFocus/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea onChange={handelInput} name="description" value={Imput.description} cols="30" rows="10" placeholder="Task Description" className="materialize-textarea"></textarea>
                      </div>
                    </div>
                    <button onClick={SendUser} className="btn light-blue darken-4">
                      Send 
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  { 
                    Task.map(task => {
                      return (
                        <tr key={task._id}>
                          <td>{task.title}</td>
                          <td>{task.description}</td>
                          <td>
                             <button onClick={() => DeleteTask(task._id)} className="btn light-blue darken-4">
                              <i className="material-icons">delete</i> 
                            </button>
                            <button onClick={() =>  UpdateTask(task._id)} className="btn light-blue darken-4" style={{margin: '4px'}}>
                              <i className="material-icons">edit</i>
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
         </div>
      </div>
    );
}

export default Task;