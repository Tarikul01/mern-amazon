import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBox from './component/SearchBox';
import getError from './component/utils';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignInScreen from './screens/SignInScreen';
import SignupScreen from './screens/SignupScreen';
import { Store } from './Store';

const App = () => {
	const { state, dispatch: ctxDispatch } = useContext(Store);
	const { cart, userInfo } = state;
	const signOutHandler = () => {
		ctxDispatch({ type: 'USER_SIGNOUT' });
		localStorage.removeItem('userInfo');
		localStorage.removeItem('shippingAddress');
		localStorage.removeItem('paymentMethod');
		window.location.href = '/signin';
	};
	const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		const fetchCategory = async () => {
			try {
				const { data } = await axios.get('/api/products/categories');
				setCategories(data);
			} catch (err) {
				toast.error(getError(err));
			}
		};
		fetchCategory();
	}, []);
	return (
		<BrowserRouter>
			<div
				className={
					sidebarIsOpen
						? 'd-flex flex-column site-container active-cont'
						: 'd-flex flex-column site-container'
				}>
				<ToastContainer position='bottom-center' limit={1} />
				<header>
					<Navbar bg='dark' variant='dark' expand='lg'>
						<Container>
							<Button
								variant='dark'
								onClick={() =>
									setSidebarIsOpen(!sidebarIsOpen)
								}>
								<i className='fas fa-bars'></i>
							</Button>
							<LinkContainer to='/'>
								<Navbar.Brand>Amazona</Navbar.Brand>
							</LinkContainer>
							<Navbar.Toggle aria-controls='basic-navbar-nav' />
							<Navbar.Collapse id='basic-navbar-nav'>
							<SearchBox/>
								<Nav className='me-auto w-100 justify-content-end'>
									<Link to='/cart' className='nav-link'>
										Cart
										{cart.cartItems.length > 0 && (
											<Badge pill bg='danger'>
												{cart.cartItems.reduce(
													(a, c) => a + c.quantity,
													0
												)}
											</Badge>
										)}
									</Link>
									{userInfo ? (
										<NavDropdown
											title={userInfo.name}
											id='basic-nav-dropdown'>
											<LinkContainer to='/profile'>
												<NavDropdown.Item>
													User Profile
												</NavDropdown.Item>
											</LinkContainer>
											<LinkContainer to='/orderhistory'>
												<NavDropdown.Item>
													Order History
												</NavDropdown.Item>
											</LinkContainer>
											<NavDropdown.Divider />
											<Link
												className='dropdown-item'
												to='#signout'
												onClick={signOutHandler}>
												Sign Out
											</Link>
										</NavDropdown>
									) : (
										<Link className='nav-link' to='/signin'>
											SignIn
										</Link>
									)}
								</Nav>
							</Navbar.Collapse>
						</Container>
					</Navbar>
				</header>
				<div
					className={
						sidebarIsOpen
							? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
							: 'side-navbar d-flex justify-content-between flex-wrap flex-column'
					}>
					<Nav className='flex-column text-white w-100 p-2'>
						<Nav.Item>
							<strong>Categories</strong>
						</Nav.Item>
						{categories.map((category) => (
							<Nav.Item key={category}>
								<LinkContainer
									to={`/search?category=${category}`}
									onClick={() =>
										setSidebarIsOpen(false)
									}>
									<Nav.Link>{category}</Nav.Link>
									</LinkContainer>
							</Nav.Item>
						))}
					</Nav>
				</div>
				<main className='mt-3'>
					<Container>
						<Routes>
							<Route
								path='/product/:slug'
								element={<ProductScreen />}
							/>
							<Route path='/' element={<HomeScreen />} />
							<Route path='/cart' element={<CartScreen />} />
							<Route path='/signin' element={<SignInScreen />} />

							<Route path='/signup' element={<SignupScreen />} />
							<Route
								path='/shipping'
								element={<ShippingAddressScreen />}
							/>
							<Route
								path='/payment'
								element={<PaymentMethodScreen />}
							/>
							<Route
								path='/placeorder'
								element={<PlaceOrderScreen />}
							/>
							<Route
								path='/order/:id'
								element={<OrderScreen />}
							/>
							<Route
								path='/orderhistory'
								element={<OrderHistoryScreen />}
							/>
							<Route
								path='/profile'
								element={<ProfileScreen />}
							/>
							<Route
								path='/search'
								element={<SearchScreen />}
							/>
						</Routes>
					</Container>
				</main>
				<footer>
					<div bg='dark' className='text-center'>
						All Right Reserve
					</div>
				</footer>
			</div>
		</BrowserRouter>
	);
};

export default App;
