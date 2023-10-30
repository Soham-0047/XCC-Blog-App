import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import axios from "axios";

const Header = () => {
  const username = "";

  const [info, setInfo] = useState([]);
  const [usern, setUsern] = useState(null);


  const user = localStorage.getItem("token");

  const handlelogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const {id} = useParams();

  useEffect(() =>{
    const fetchUser= async() =>{
      try{
        const res = await axios.get(`http://localhost:8080/api/users/${id}`) 
        setUsern(res.data)
        console.log(res.data)
      }
      catch(err){
        console.log(err)
      }
    }

    fetchUser()
  }, [id])
  



  console.log(user);

  
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
        >
          XCC Blog
        </Link>

        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>

            {user && (
              <>
                <li>
                  <Link
                    to="/"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Create
                  </Link>
                </li>

                <li>
                  <button
                    onClick={handlelogout}
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {!user && (
              <>
                <li>
                  <Link
                    to="/register"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Login
                  </Link>
                </li>
              </>
            )}

            {/* <li>
            {info.map((e)=>(

              <p className="text-white" key={e._id}>{e.name}</p>
            )

              
            )}
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

// <header>
//   <Link to="/" classNameName="logo">XCC Blog</Link>

//   <nav>
//     {username && (
//       <>
//       <Link to="/create">Create new Post</Link>
//       <a>Logout ({username})</a>
//       </>
//     )}

//     {!username && (
//       <>
//       <Link to="/login">Login</Link>
//       <Link to="/register">Register</Link>
//       </>
//     )}
//   </nav>
// </header>
