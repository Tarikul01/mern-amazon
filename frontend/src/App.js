import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

const App = () => {
	return (
		<BrowserRouter>
			<div className='d-flex flex-column site-container'>
				<header>
					<Navbar bg='dark' variant='dark'>
						<Container>
							<LinkContainer to='/'>
								<Navbar.Brand>Amazon</Navbar.Brand>
							</LinkContainer>
						</Container>
					</Navbar>
				</header>
				<main>
					<Container>
						<Routes>
							<Route
								path='/product/:slug'
								element={<ProductScreen />}
							/>
							<Route path='/' element={<HomeScreen />} />
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
