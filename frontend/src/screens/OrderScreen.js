import Axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import getError from '../component/utils';
import { Store } from '../Store';
import { PayPalButtons,usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';


const reducer=(state,action)=>{
    switch(action.type){
        case "FETCH_REQUEST":
            return {...state,loading:true,error:''};
        case 'FETCH_SUCCESS':
            return {...state,loading:false,order:action.payload};
        case 'FETCH_FAIL':
            return {...state,error:action.payload,loading:false};
        case 'PAY_REQUEST':
            return {...state,loadingPay:true};
        case 'PAY_SUCCESS':
            return {...state,loadingPay:false,successPay:true};
        case 'PAY_FAIL':
            return {...state,loadingPay:false,errorPay:action.payload};
        case 'PAY_RESET':
            return {...state,loadingPay:false,successPay:false}
        default:
            return state;

    }

}

const OrderScreen = () => {
    const navigate=useNavigate();
    const param=useParams();
    const {id:orderId}=param;
    const {state}=useContext(Store);
    const {userInfo}=state;
    const[{loading,error,order,successPay,loadingPay},dispatch]=useReducer(reducer,{
        loading:true,
         order:{},
         error:'',successPay:false,loadingPay:false
    })
    const [{isPending},paypalDispatch]=usePayPalScriptReducer();


    // Create Order function 
    const createOrder=(data,actions)=>{
        return actions.order.create({
            purchase_units:[{
                amount:{value:order.totalPrice},
            }]
        }).then((orderID)=>{
            return orderID;
        })

    }
    const onApprove =(data,action)=>{
        return action.order.capture().then(async(details)=>{

            try {
                dispatch({
                    type:'PAY_REQUEST'
                });
                const {data}= await Axios.put(`/api/orders/${order._id}/pay`,details,{
                    headers:{authorization:`Bearer ${userInfo.token}`},
                })
                dispatch({type:'PAY_SUCCESS',payload:data})
                toast.success('Order is paid');
                
            } catch (err) {
                dispatch({type:'PAY_FAIL',payload:getError(err)});
                toast.error(getError(err));
                
            }
        })



    }
    const onError=(err)=>{
        toast.error(getError(err));
    }
    useEffect(()=>{
        const fetchOrder=async()=>{
        try {
            dispatch({type:'FETCH_REQUEST'});
            const {data}=await Axios.get(`/api/orders/${orderId}`,{
                headers:{authorization:`Bearer ${userInfo.token}`},
            })

            dispatch({type:'FETCH_SUCCESS',payload:data});
            
        } catch (err) {
            dispatch({type:'FETCH_FAIL',payload:getError(err)});
        }
        }

        if(!userInfo){
            navigate('/login');
        }
        if(!order._id ||successPay|| (order._id && order._id !==orderId)){
            fetchOrder();
            if(successPay){
                dispatch({type:'PAY_RESET'});
            }
        }else{
            const loadPaypalScript=async ()=>{
                const{data:clientId}=await Axios.get('/api/key/paypal',{headers:{authorization:`Bearer ${userInfo.toekn}`},
                });
                paypalDispatch({
                    type:'resetOptions',
                    value:{
                        'client-id':clientId,
                        current:'USD',
                    }
                });
                paypalDispatch({type:'setLoadingStatus',value:'pending'});
            }
            loadPaypalScript();
        }

    },[navigate,orderId,order,userInfo,paypalDispatch,successPay])

  return loading? (<LoadingBox></LoadingBox>):error?(<MessageBox variant="danger">param id:{orderId}</MessageBox>):(<div>
    <Helmet><title>Order{orderId}</title></Helmet>
    <Row>
    <Col md={8}>
    <Card className='mb-3'>
        <Card.Body>
        <Card.Title>Shipping</Card.Title>
        <Card.Text>
        <strong>Name:</strong>{order.shippingAddress.fullName},{order.shippingAddress.city},{order.shippingAddress.postalcode}.{order.shippingAddress.country}</Card.Text>
        {order.isDelivered?(<MessageBox variant="success">Delivered at{order.deliveredAt}</MessageBox>):(<MessageBox variant='danger'>Not Delivered</MessageBox>)}

        </Card.Body>
    </Card>
    </Col>
    </Row>
    <Row>
    <Col md={8}>
    <Card className='mb-3'>
        <Card.Body>
        <Card.Title>Payment</Card.Title>
        <Card.Text>
        <strong>Method:</strong>{order.paymentMethod}</Card.Text>
        {order.isPaid?(<MessageBox variant="success">Paid at{order.paidAt}</MessageBox>):(<MessageBox variant='danger'>Not Paid</MessageBox>)}

        </Card.Body>
    </Card>
    </Col>
    </Row>
    <Row>
    <Col md={8}>
    <Card className='mb-3'>
        <Card.Body>
        <Card.Title>Items</Card.Title>
        <ListGroup variant="flush">
        {
            order.orderItems.map((item)=>(
                <ListGroup.Item key={item._id}>
                <Row className="align-items-center">
                <Col md={6}>
                <img src={item.image} alt={item.name} className="img-fluid rounded img-thumbnail"></img>
                <Link to={`/product/${item.slug}`}>{item.name}</Link>
                </Col>
                
                </Row>
                </ListGroup.Item>
            ))
        }
        
        
        
        </ListGroup>
    

        </Card.Body>
    </Card>
    </Col>
    <Col md={4}>
    <Card className="mb-3">
    <Card.Body>
    <Card.Title>Order Summary</Card.Title>
    <ListGroup variant='flush'>
    <ListGroup.Item>
    <Row>
    <Col>Items</Col><Col>${order.itemsPrice.toFixed(2)}</Col></Row>
    </ListGroup.Item>
    <ListGroup.Item>
    <Row>
    <Col>Shipping</Col><Col>${order.shippingPrice.toFixed(2)}</Col></Row>
    </ListGroup.Item>
    <ListGroup.Item>
    <Row>
    <Col>Tax</Col><Col>${order.taxPrice.toFixed(2)}</Col></Row>
    </ListGroup.Item>
    
    </ListGroup>
    <ListGroup.Item>
    <Row>
    <Col>Order Total</Col><Col>${order.totalPrice.toFixed(2)}</Col></Row>
    </ListGroup.Item>

    {
        !order.isPaid && (<ListGroup.Item>
            {isPending?(<LoadingBox></LoadingBox>):(
                <div>
                <PayPalButtons createOrder={createOrder} onApprove={onApprove}onError={onError}>
                </PayPalButtons></div>
            )}
            {loadingPay && <LoadingBox></LoadingBox>}

            </ListGroup.Item>)
    }
    
    </Card.Body>
    </Card>
    
    </Col>
    </Row>
    </div>)
}

export default OrderScreen
