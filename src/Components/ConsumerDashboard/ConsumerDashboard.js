import React, {useEffect, useState} from 'react';
import {Button, Input} from '@material-ui/core';
import {Fade} from 'react-reveal';
import ProductCard from './../ProductCard/ProductCard';
import GetOrder from './../../api/GetOrderConsumer';
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from '@mui/material';
import './ConsumerDashboard.css';

// create component react
const ConsumerDashboard = (props) => {
    const [paymentId, setPaymentId] = useState('');
    const [screen, setScreen] = useState(0);
    const [products, setProducts] = useState([]);
    const [email, setEmail] = useState('');
    const [errorInput, setErrorInput] = useState(false);
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [showAnimation, setShowAnimation] = useState(false);

    useEffect(() => {
        if (screen === 1) {
            setShowAnimation(true);
        }
    }, [screen]);


    const hideErrorMsg = () => {
        setShowErrorMsg(false);
        setErrorMsg('');
    };
    const raiseError = (msg) => {
        setShowErrorMsg(true);
        setErrorMsg(msg);
    };

    const onChangePaymentId = (e) => {
        setPaymentId(e.target.value);
        if (paymentId !== '') {
            setErrorInput(false);
        }

    };
    const getOrder = () => {
        if (paymentId === '') {
            setErrorInput(true);
            raiseError('Please enter your payment id');
        } else {

        }

        GetOrder(paymentId).then(res => {
            console.log(res);
            if (res.data.length > 0) {

                setProducts(res.data);
                setEmail(res.email);


                setScreen(1);
            } else {
                // setErrorInput(true);
                raiseError('Order Not Found. Please check your payment id');
                setPaymentId('');
            }
        }).catch(err => {
            // setErrorInput(true);
            raiseError('Order Not Found. Please check your payment id');
            // setPaymentId('');
        });
    };
    if (screen === 0) {
        return (
            <div>

                <Snackbar
                    open={showErrorMsg}
                    autoHideDuration={5000}
                    onClose={hideErrorMsg}
                >
                    <Alert severity="error" onClose={hideErrorMsg}>{errorMsg}</Alert>
                </Snackbar>

                {/*{showSuccessMsg?<Alert severity="success">{}</Alert>:""}*/}

                <div className='center-card-div'>
                    <div className='heading'>
                        IIT Dharwad Merchandise Collection 2021
                    </div>
                    <Fade left when={props.loadingCompleted} distance='10%'>
                        <div className="head-input-field">
                            Enter Your Payment ID
                        </div>
                        <div className="input-parent">
                            <Input
                                placeholder="Payment Id"
                                disableUnderline={true}
                                className='consumer-dashboard-input'
                                value={paymentId}
                                onChange={onChangePaymentId}
                                error={errorInput}
                                inputProps={
                                    {
                                        'style': {
                                            'marginLeft': '10px',
                                            'marginRight': '10px',
                                            'textAlign': 'center',
                                            'fontFamily': 'Poppins, sans-serif'
                                        },
                                        'aria-label': 'Search',
                                    }
                                }
                            />
                        </div>
                        <Button className='btn-consumer' onClick={getOrder}>
                            Find My Order
                        </Button>
                    </Fade>
                </div>
            </div>
        );
    } else {
        return (
            <div className='center-card-div center-card-div-screen1'>
                <div className='heading-screen1'>
                    Order Details
                </div>
                <Fade when={showAnimation} delay={200} distance='10%'>
                    <div className="consumer-screen1-topfields">
                        <div className='consumer-topfields-key'>
                            Payment Id:
                        </div>
                        {paymentId}
                        <br/>
                        <div className='consumer-topfields-key'>
                            Email:
                        </div>
                        {email}
                    </div>

                    <div className='consumer-screen1-product-parent'>
                        <div className='consumer-screen1-product-key'>
                            Purchased Product:
                        </div>
                        {products.map((product, index) => {
                            return (
                                <ProductCard product={product} key={index}/>
                            );
                        })}
                        {/*<ProductCard product ={product}/>*/}
                        {/* <ProductCard product ={productR}/>*/}
                        {/* <ProductCard product ={productW}/>*/}
                        {/* <ProductCard product ={productH}/>*/}


                    </div>


                    <Button className='btn-consumer' onClick={() => {
                        setScreen(0);
                        setShowAnimation(false)
                    }}>
                        Back
                    </Button>
                </Fade>
            </div>
        );
    }

}

// export component
export default ConsumerDashboard;
