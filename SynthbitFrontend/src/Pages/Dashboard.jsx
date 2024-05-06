import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from "../Components/Navbar"
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

export default function Dashboard() {
  
    const[name, setName] = useState("");
    const[description, setDescription] = useState("");
    const[status, setStatus] = useState("remaining");
    const[tasks, setTasks] = useState([]);
    const[modal, setModal] = useState(false);
    const[taskId, setTaskId] = useState("");  
    const[user, setUser] = useState();

  
    useEffect(()=>{
      const getUser = async()=>{
        const response = await axios.get('http://localhost:3000/api/user',{
          withCredentials : true
        })
        //  console.log(response.data.user)
        setUser(response.data.user);
      }
      getUser();
      
    },[])
  


    const handleEdit = (name, description , id)=>{
      setModal(!modal);
      setName(name);
      setDescription(description);
      setTaskId(id)
    }
    
        const handleTask = async(e)=>{
          e.preventDefault();
          const res = await axios.post("/task/add",{name, description},{
            withCredentials: true,
          })
          if (res.status == 200) {
            setName('');
            setDescription('');
            // alert(res.data.message);
          }
        }

        const handleCheck = async(e)=>{

          if(e.target.checked){           
            setStatus("remaining")
          }else{
            setStatus("completed")
          }

          // console.log(status);
          const id = e.currentTarget.value;
          // console.log(id);
          const res = await axios.put(`/task/edit/${id}`,{status},{
            withCredentials: true,
          })

          // Delete after checking the box
          // try {
          //   const res = await axios.delete(`http://localhost:3000/api/task/delete/${id}`,{
          //     withCredentials: true,
          // });
          // // alert(res.data.message)
          // } catch (error) {
          //   console.error("Error fetching data:", error); // Log any errors
          // }

        }

        const handleDelete = async(id)=>{
          // return console.log(id);
          try {
            const res = await axios.delete(`/task/delete/${id}`,{
              withCredentials: true,
          });
          // alert(res.data.message)
          } catch (error) {
            console.error("Error fetching data:", error); // Log any errors
          }
        }

        const handleUpdate = async(id)=>{
                try {
                  const res = await axios.put(`/task/edit/${taskId}`,{name, description},{
                    withCredentials: true,
                });
                // alert(res.data.message)
                } catch (error) {
                  console.error("Error fetching data:", error); // Log any errors
                }

                setModal(!modal);
                setName("");
                setDescription("");
        }
        

        useEffect(() => {
          const fetchData = async () => {
              try {
                  const res = await axios.get("/task",{
                      withCredentials: true,
                  });
                  // console.log(res.data.tasks);
                  setTasks(res.data.tasks)// Log response data
              } catch (error) {
                  console.error("Error fetching data:", error); // Log any errors
              }
          }
          fetchData();
      }, [tasks, status,modal, handleTask, handleDelete]);
      

  return (
    <>
    { user && tasks && 
    <>

    <Navbar user={user} />

    <div className="mainContainer flex flex-col justify-center items-center w-full">
      <h2 className={`mt-[50px] text-center font-bold text-[24px] ${modal ? " hidden ":" "} `}>TO DO APP</h2>
      <div className={`flex w-full mt-[50px] gap-20 justify-center ${modal ? " opacity-0":""}`}>
        <div className='basis-1/4 border-2 w-[400px] p-5 rounded-lg '>
        <form method='POST' className='flex flex-col basis-1/5 gap-4 '>
        <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 text-center">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="name"
                  value={name}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={e=>setName(e.target.value)} />
              </div>
            </div>
        <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 text-center">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  type="description"
                  value={description}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={e=>setDescription(e.target.value)} />
              <button
                type="button"
                onClick={handleTask}
                className="flex w-full justify-center mt-5 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Add Task
              </button>
              </div>
            </div>
            <div>
            </div>
        </form>
        </div>
  <table className="basis-1/2">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  </thead>
{tasks && tasks.map((task)=>(
  <tbody key={task._id}>
    <tr>
      <td>{task.name}</td>
      <td>{task.description}</td>
      <td>
        <span className='flex items-center justify-center gap-4'>
        {task.status}
      <input value={task._id} onChange={handleCheck}  type='checkbox' className='w-[20px] h-[20px]'/>
        </span>
      </td>
      <td className='flex border-none gap-5 justify-center'>
        <div onClick={()=>handleDelete(task._id)} className='border w-10 h-8  bg-gray-200 hover:bg-gray-300 rounded-md'>
       <DeleteIcon/>
       </div>    
       
      <button onClick={()=>handleEdit(task.name, task.description, task._id)} className='w-[70px] h-[34px] font-semibold text-sky-100  bg-blue-400  hover:bg-blue-500 rounded-md '>Update</button>
      </td>

    </tr>
  </tbody>
))}
</table>

</div>

{/* Modal For Updating Task */}


{modal && 
<>

<div onClick={handleEdit} className='text-black absolute top-20 right-96 '>
<CancelIcon/>
</div>
  <div className='flex absolute w-fit top-40 gap-20 justify-center items-center'>
 <div className=' border-2 w-[400px] p-5 rounded-lg '>
        <form method='POST' className='flex flex-col gap-4 '>
        <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 text-center">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="name"
                  value={name}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={e=>setName(e.target.value)} />
              </div>
            </div>
        <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 text-center">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  type="description"
                  value={description}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={e=>setDescription(e.target.value)} />
              <button
                type="button"
                onClick={handleUpdate}
                className="flex w-full justify-center mt-5 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Update Task
              </button>
              </div>
            </div>
            <div>
            </div>
        </form>
        </div>
  </div>

</>

}
</div>
    
</>
}

</>
  )
}
