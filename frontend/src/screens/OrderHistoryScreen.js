import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import getError from '../component/utils';
import { Store } from '../Store';
const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true};
		case 'FETCH_SUCCESS':
			return { ...state, loading: false, order: action.payload };
		case 'FETCH_FAIL':
			return { ...state, error: action.payload, loading: false };
		default:
			return state;
	}
};

const OrderHistoryScreen = () => {
	const { state } = useContext(Store);

	const { userInfo } = state;
	const navigate = useNavigate();
	const [{ loading, error, order }, dispatch] = useReducer(reducer, {
		loading: true,
		error: '',
	});
	useEffect(() => {
		const fetchData = async () => {
			dispatch({ type: 'FETCH_REQUEST' });
			try {
				const { data } = await axios.get('/api/orders/mine', {
					headers: { authorization: `Bearer${userInfo.token}` },
				});
				dispatch({ type: 'FETCH_SUCCESS', payload: data });
			} catch (err) {
				dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
			}
		};
		fetchData();
	}, [navigate, userInfo]);
	return (
		<div>
			<Helmet>
				<title>Order History</title>
			</Helmet>
			<h1>Order History</h1>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant='danger'>{error}</MessageBox>
			) : (
				<table className='table'>
					<thead>
						{' '}
						<tr>
							<th>ID</th>
							<th>Date</th>
							<th>PAID</th>
							<th>DELIVERED</th>
							<th>ACTIONS</th>
						</tr>
					</thead>
					<tbody></tbody>
					{order.map((item) => (
						<tr key={item._id}>
							<td>{item._id}</td>
							<td>{item.createdAt.substring(0, 10)}</td>
							<td>{item.totalPrice.toFixed(2)}</td>
							<td>
								{item.isPaid
									? order.paidAt.substring(0, 10)
									: 'No'}
							</td>
							<td>
								{item.isDelivered
									? item.deliveredAt.substring(0, 10)
									: 'No'}
							</td>
							<td>
								<Button
									type='button'
									variant='light'
									onClick={() => {
										navigate(`/order/${item._id}`);
									}}>
									Details
								</Button>
							</td>
						</tr>
					))}
				</table>
			)}
		</div>
	);
};

export default OrderHistoryScreen;
