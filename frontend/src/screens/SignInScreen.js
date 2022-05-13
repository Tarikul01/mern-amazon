import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {Store} from '../Store.js';
import Axios from 'axios';
import { toast } from 'react-toastify';
import getError from '../component/utils.js';
const SignInScreen = () => {
	const navigate=useNavigate();
	const { search } = useLocation();
	const redirectURL = new URLSearchParams(search).get('redirect');
	const redirect = redirectURL ? redirectURL : '/';
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const {state,dispatch:ctxDispatch}=useContext(Store);
	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const { data } = await Axios.post('/api/users/signin', {
				email,
				password,
			});
			ctxDispatch({type:'USER_SIGNIN',payload:data})
			localStorage.setItem('userInfo',JSON.stringify(data));
			navigate(redirect || '/');
		} catch (err) {
			// toast.error(getError(err))
			toast.error("Invalid Email or Password!");
		}
	};
	return (
		<Container className='small-container'>
			<Helmet>Sign In</Helmet>
			<h1 className='my-3'>Sign in</h1>
			<Form onSubmit={submitHandler} method='POST'>
				<Form.Group className='mb-3' controlId='email'>
					<Form.Label>Email</Form.Label>
					<Form.Control
						type='email'
						required
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Form.Group className='mb-3' controlId='email'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						required
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<div className='mb-3'>
					<Button type='submit'>Sign In</Button>
					<div className='mb-3'>
						New Customer?{''}
						<Link to={`/signup?redirect=${redirect}`}>
							Create your account
						</Link>
					</div>
				</div>
			</Form>
		</Container>
	);
};

export default SignInScreen;
