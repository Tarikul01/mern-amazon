import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import {Store} from './Store';
import CartScreen from './screens/CartScreen';
import SignInScreen from './screens/SignInScreen';

const App = () => {
	const {state}=useContext(Store);
	const {cart}=state;
	return (
		<BrowserRouter>
			<div className='d-flex flex-column site-container'>
				<header>
					<Navbar bg='dark' variant='dark'>
						<Container>
							<LinkContainer to='/'>
								<Navbar.Brand>Amazona</Navbar.Brand>
							</LinkContainer>
							<Nav className="me-auto">
							<Link to="/cart" className="nav-link">
							Cart 
							{
								cart.cartItems.length>0 &&(<Badge pill bg="danger">{cart.cartItems.reduce((a,c)=>a+c.quantity,0)}</Badge>)
							}
							</Link>
							</Nav>
						</Container>
					</Navbar>
				</header>
				<main className='mt-3'>
					<Container>
						<Routes>
							<Route
								path='/product/:slug'
								element={<ProductScreen />}
							/>
							<Route path='/' element={<HomeScreen />} />
							<Route path="/cart" element={<CartScreen/>} />
							<Route path='/signin' element={<SignInScreen/>} />
						</Routes>

					</Container>
				</main>
				<footer>
				<div bg="dark" className="text-center">All Right Reserve</div>
				</footer>
			</div>
		</BrowserRouter>
	);
};

export default App;
