import React from 'react';
import data from './data';

const App = () => {
	return (
		<div>
			<header>
				<a href='/'>amazon</a>
			</header>
			<main>
				<h1>Features Products</h1>
				<div className='products'>
					{data.products.map((product) => (
						<div className='product' key={product.slug}>
							<a href={`/product/${product.slug}`}>
								<img src={product.image} alt={product.name} />
							</a>

							<div className='product-info'>
								<a href={`/product/${product.slug}`}>
									<p>{product.name}</p>
								</a>
								<p><stron>${product.price}</stron></p>
								<button>Add to cart</button>
							</div>
						</div>
					))}
				</div>
			</main>
		</div>
	);
};

export default App;
