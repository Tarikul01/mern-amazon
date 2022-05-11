import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
const SignInScreen = () => {
	const { search } = useLocation();
	const redirectURL = new URLSearchParams(search).get('redirect');
	const redirect = redirectURL ? redirectURL : '/';
	return (
		<Container className='small-container'>
			<Helmet>Sign In</Helmet>
			<h1 className='my-3'>Sign in</h1>
			<Form>
				<Form.Group className='mb-3' controlId='email'>
					<Form.Label>Email</Form.Label>
					<Form.Control type='email' required />
				</Form.Group>
				<Form.Group className='mb-3' controlId='email'>
					<Form.Label>Password</Form.Label>
					<Form.Control type='password' required />
				</Form.Group>
				<div className='mb-3'>
					<Button type='button'>Sign In</Button>
				</div>
			</Form>
			<div className='mb-3'>
				New Customer?{''}
				<Link to={`/signup?redirect=${redirect}`}>
					Create your account
				</Link>
			</div>
		</Container>
	);
};

export default SignInScreen;
