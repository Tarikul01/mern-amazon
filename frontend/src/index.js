import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';
import { StoreProvider } from './Store';
import {PayPalScriptProvider} from '@paypal/react-paypal-js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<StoreProvider>
			<HelmetProvider>
			<PayPalScriptProvider deferLoadig={true}>
				<App />
			</PayPalScriptProvider>
			</HelmetProvider>
		</StoreProvider>
	</React.StrictMode>
);
