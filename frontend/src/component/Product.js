import axios from 'axios';
import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import Rating from './Rating';

const Product = (props) => {
	const { product } = props;
	const { state, dispatch: ctxDispath } = useContext(Store);
	const {
		cart: { cartItems },
	} = state;
	const addToCartHandler = async (item) => {
		const exitItem = cartItems.find((x) => x._id === product._id);
		const quantity = exitItem ? exitItem.quantity + 1 : 1;
		const { data } = await axios.get(`/api/products/${item._id}`);
		if (data.countInStock < quantity) {
			window.alert('Sorry. Product is out of stock');
			return;
		}
		ctxDispath({
			type: 'CART_ADD_ITEM',
			payload: { ...item, quantity },
		});
	};
	return (
		<Card>
			<Link to={`/product/${product.slug}`}>
				<img
					src={product.image}
					className='card-img-top'
					alt={product.name}
				/>
			</Link>
			<Card.Body>
				<Link to={`/product/${product.slug}`}>
					<Card.Title>{product.name}</Card.Title>
				</Link>
				<Rating
					rating={product.rating}
					numReviews={product.numReviews}
				/>
				<Card.Text>${product.price}</Card.Text>
				{product.countInStock === 0 ? (
					<Button variant='light' disabled>
						Out of Stock
					</Button>
				) : (
					<Button onClick={() => addToCartHandler(product)}>
						Add to cart
					</Button>
				)}
			</Card.Body>
		</Card>
	);
};

export default Product;
