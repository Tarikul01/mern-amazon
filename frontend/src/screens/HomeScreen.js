// import data from '../data';
import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Helmet } from 'react-helmet-async';
import logger from 'use-reducer-logger';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import Product from '../component/Product';

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true };
		case 'FETCH_SUCCESS':
			return { ...state, products: action.payload, loading: false };
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

const HomeScreen = () => {
	// const [product, setProduct] = useState([]);
	const [{ loading,error, products }, dispatch] = useReducer(logger(reducer), {
		products: [],
		loading: true,
		error: '',
	});
	useEffect(() => {
		const fetchData = async () => {
			dispatch({ type: 'FETCH_REQUEST' });
			try {
				const result = await axios.get('/api/products');
				dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
			} catch (err) {
				dispatch({ type: 'FETCH_FAIL', payload: err.message });
			}

			//   setProduct(result.data);
		};
		fetchData();
	}, []);
	return (
		<div>
			<Helmet>
				<title>Amazona</title>
			</Helmet>
			<h1>Features Products</h1>
			{loading ? (
			 <LoadingBox/>
			) :error? 
			<MessageBox variant="danger">{error}</MessageBox>: (
				<div className='products'>
					<Row>
						{products.map((product) => (
							<Col
								key={product.slug}
								sm={6}
								md={4}
								lg={3}
								className='mb-3'>
								<Product product={product}></Product>
							</Col>
						))}
					</Row>
				</div>
			)}
		</div>
	);
};

export default HomeScreen;
