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


const reducer=(state,action)=>{
    switch(action.type){
        case "FETCH_REQUEST":
            return {...state,loading:true,error:''};
        case 'FETCH_SUCCESS':
            return {...state,loading:false,order:action.payload};
        case 'FETCH_FAIL':
            return {...state,error:action.payload,loading:false};
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
    const[{loading,error,order},dispatch]=useReducer(reducer,{
        loading:true,
         order:{},
         error:'',
    })
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
        if(!order._id || (order._id && order._id !==orderId)){
            fetchOrder();
        }

    },[navigate,orderId,order,userInfo])

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
    <Col>Total</Col><Col>${order.totalPrice.toFixed(2)}</Col></Row>
    </ListGroup.Item>
    
    </Card.Body>
    </Card>
    
    </Col>
    </Row>
    </div>)
}

export default OrderScreen
