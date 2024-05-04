import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

export default function Signup() {
  const navigate = useNavigate();

  const[email, setEmail] = useState("");;
  const[password, setPassword] = useState("");

const [user, setUser] = useState({});

useEffect(()=>{
  const getUser =  async ()=>{
    const res =  await axios.get("http://localhost:3000/api/auth/login/success",{
     withCredentials: true,
   })
  //  console.log(res);
   if(res.status == 200){
    setUser(res.data.user)
    navigate("/dashboard")
  }else{
    alert("Something is wrong")
  }
  }
  getUser();
}, [user])




const handlelogin = async(e)=>{
  e.preventDefault();
  const res = await axios.post("http://localhost:3000/api/auth/login",{email,password},{
    withCredentials: true,
  })

  if(res.status == 200){
    alert(res.data.message)
    navigate("/dashboard")
  }else{
    alert("Something is wrong")
  }
}

const handleGoogle = async(e)=>{

  const googleLoginURL = "http://localhost:3000/api/auth/google"

// _blank opens new window
  const newWindow = window.open(googleLoginURL,"_self");

}



  return (
    <>
      <Navbar/>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handlelogin} className="space-y-6" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={e=>setEmail(e.target.value)} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <Link to="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={e=>setPassword(e.target.value)} 
                  />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Log in
              </button>
            </div>
            <div  onClick={handleGoogle}>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Log in with Google
              </button>
            </div>
            <div className="text-sm">
                  <Link to="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
                   Create account?
                  </Link>
                </div>
          </form>
        </div>
      </div>
    </>
  )
}
