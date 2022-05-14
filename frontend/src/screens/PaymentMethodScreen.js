import React, { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../component/CheckoutSteps';
import { Store } from '../Store';
import Button from 'react-bootstrap/Button';

const PaymentMethodScreen = () => {
    const navigate=useNavigate();
	const { state, dispatch } = useContext(Store);

	const {
		cart: { shippingAddress,paymentMethod },
	} = state;
    useEffect(()=>{
        if(!shippingAddress.address){
            navigate('/shipping');
        }
    },[shippingAddress,navigate]);

    const [paymentMethodName,setPaymentMethod]=useState(paymentMethod ||'PayPal');

	const submitHandler = (e) => {
		e.preventDefault();
        dispatch({type:'SAVE_PAYMENT_METHOD',payload:paymentMethodName});
        localStorage.setItem('paymentMethod',paymentMethodName);
        navigate('/placeorder');
	};
	return (
		<div>
			<Helmet>Payment method</Helmet>
			<CheckoutSteps step1 step2 step3></CheckoutSteps>
			<h1 className='my-3'>Payment Method</h1>
			<Form onSubmit={submitHandler}>
				<div className='mb-3'>
					<Form.Check
						type='radio'
						id='PayPal'
                        label='PayPal'
						value='PayPal'
						checked={paymentMethodName === 'PayPal'}
						onChange={(e) => setPaymentMethod(e.target.value)}
					/>
				</div>
                <div className='mb-3'>
                <Form.Check
                    type='radio'
                    id='Stripe'
                    label='Stripe'
                    value='Stripe'
                    checked={paymentMethodName === 'Stripe'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                />
            </div>
            <div className="mb-3">
            <Button type="submit">Continue</Button>
            </div>
			</Form>
		</div>
	);
};

export default PaymentMethodScreen;
