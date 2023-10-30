import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify'
import axios from 'axios'

const Login = () => {

  const [data,setData] = useState({
    email:"",
    password:"",
  })

  const [error,setError] = useState("");



  const handleChange = ({currentTarget:input}) =>{
    setData({...data,[input.name]: input.value});
  }


  const handleSubmit = async(e) =>{
    e.preventDefault();
		try {
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url,data)
      console.log(res.data);
		  localStorage.setItem("token",res.data);
      window.location="/";
      // console.log(res.message)
      
      
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
        setError(error.response.data.message);
        console.log(error.response.data.message)
     
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
			}
    
		}
  }
  return (
    <>
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



        <form className="space-y-6" onSubmit={handleSubmit}>


{/* Email */}

<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
  Email
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
>
  Login
    

</button>
{/* <ul>
{error && error.map((i,index)=>(


<li key={index}>{i.message}</li>



)) }
</ul> */}


{error && <div className='ui'>{error}</div>}



<ToastContainer/>
</div>





</form>

          <p className="mt-10 text-center text-sm text-gray-500">
            
            Not a member?{' '}
            <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Register
            </Link>
          </p>
         
        </div>
      </div>
    
    </>
  )
}

export default Login