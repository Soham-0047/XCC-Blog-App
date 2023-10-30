import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios, { isAxiosError } from "axios"
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import styles from "./styles.module.css";


const Register = () => {

  const [data,setData] = useState({
    name:"",
    username:"",
    email:"",
    password:"",
  })

  const [error,setError] = useState([]);

  const [msg,setMsg] =  useState("");


  const handleChange = ({currentTarget:input}) =>{
    setData({...data,[input.name]: input.value});
  }


  const handleSubmit = async(e) =>{
    e.preventDefault();
		try {
			const url = "http://localhost:8080/api/users";
			const { data: res } = await axios.post(url,data)
      // console.log(data);
			setMsg(res.message);
      console.log(res.message)
      
      setError('');
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });


		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				// setError(error.response.data.message);
        setError(error.response.data.message.details);
        setMsg('');
        console.log(error.response.data.message.details)
        console.log(typeof(error.response.data.message))
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
			}
    
		}
  }




 
  return (
   
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">


        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register Here
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">



          <form className="space-y-6" onSubmit={handleSubmit}>




      
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="name"
                  onChange={handleChange}
                  value={data.name}

                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
           




            {/* username */}

        
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  onChange={handleChange}
                  value={data.username}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
           

            {/* Email */}
         
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={handleChange}
                  value={data.email}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            



            {/* Password */}



            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                {/* <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  value={data.password}

                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>


            </div>
                
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              // onClick = {showms}
              >
                Register 
                  

              </button>
			  <ul>
				{error && error.map((i,index)=>(

					
					<li key={index}>{i.message}</li>
					
					
					
			  )) }
			  </ul>
              

             {/*{msg && <p>{msg}</p>}  */}
             

      
             <ToastContainer/>
            </div>

         

      
            
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            
            Already a member?{' '}
            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Login
            </Link>
          </p>
         
        </div>

        {/* <div className="bg-blue-500 text-white p-4 rounded-lg">
  {error.toString()}
</div> */}
      </div>


		
    
   
  )
}

export default Register

   {/* 
            {error && (
            <div role="alert">
              <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                {error}
              </div>
            </div>
          )}
          {msg && (
            <div role="alert">
              <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
                {msg}
              </div>
            </div>
          )}  */}



  //  const showms = () =>{

  //   toast.success(`${msg}`, {
  //     position: toast.POSITION.TOP_RIGHT
  //   })
  //   toast.error(`${error}`,{
  //     position: toast.POSITION.TOP_RIGHT
  //   })
    
  // }

  // useEffect(() => {
  //   if (msg) {
  //     toast.success(msg, {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //   }
  //   if (error) {
  //     toast.error(error, {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //   }
  // }, [msg, error]);