import React from 'react'
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";


import { Fragment } from 'react';



const EmailVerify = () => {


  	const [validUrl, setValidUrl] = useState(true);

	const param = useParams();

	console.log(param)

	useEffect(() => {

		const verifyEmailUrl = async () => {
			try {

				const url = `http://localhost:8080/api/users/${param.id}/verify/${param.token}`;

				const { data } = await axios.get(url);

				console.log("Data: ",data);
				
				console.log(validUrl)
				setValidUrl(true);
				

			} catch (error) {

				console.log(validUrl)
				
				console.log(error);
				setValidUrl(false);
			}
		};


		verifyEmailUrl();
	}, [param]);







  return (
    <Fragment>
			{validUrl ? (
				<div>
					
					<h1>Email verified successfully</h1>
					<Link to="/login">
						<button>Login</button>
					</Link>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</Fragment>
  )
}

export default EmailVerify