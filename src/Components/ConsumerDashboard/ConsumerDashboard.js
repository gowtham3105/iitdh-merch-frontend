import React, {useEffect, useState} from 'react';
import {Button, Input} from '@material-ui/core';
import {Fade} from 'react-reveal';
import ProductCard from './../ProductCard/ProductCard';
import GetOrder from './../../api/GetOrderConsumer';
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from '@mui/material';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import QRModal from './../QRModal/QRModal';

import './ConsumerDashboard.css';

// create component react
const ConsumerDashboard = (props) => {
    const [paymentId, setPaymentId] = useState('');
    const [screen, setScreen] = useState(0);
    const [products, setProducts] = useState([]);
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [errorInput, setErrorInput] = useState(false);
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [showAnimation, setShowAnimation] = useState(false);

    const [showQRModal, setShowQRModal] = useState(false);



    useEffect(() => {
        if (screen === 1) {
            setShowAnimation(true);
        }
    }, [screen]);

    const handleCloseQRModal = () => {
        setScreen(0);
    };

    const handleOpenQRModal = () => {
        setScreen(2);

    };

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
                setAddress(res.address);


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

                    <Fade when={props.loadingCompleted}>
                        <Alert severity="info" color="info" style={{fontSize: "0.7rem"}}>
                            Payment Id looks like this 'pay_XXXXXXXXXXXXXX'
                        </Alert>

                    </Fade>
                </div>
            </div>
        );
    } else if(screen == 1) {
        return (
            <div className='center-card-div center-card-div-screen1'>

                <div className='heading-screen1'>
                    <div className='heading-screen1-title'>
                        Order Details
                    </div>
                    <div className='heading-screen1-qr'>
                        <QrCode2Icon style={{fontSize: '2rem'}} className='heading-screen1-qr-item' onClick={handleOpenQRModal}/>
                    </div>
                </div>
                <Fade when={showAnimation} delay={200} distance='10%'>
                    <div
                        className={address ? "consumer-screen1-topfields consumer-screen1-address" : "consumer-screen1-topfields"}>
                        <div className='consumer-topfields-key'>
                            Payment Id:
                        </div>
                        {paymentId}
                        <br/>
                        <div className='consumer-topfields-key'>
                            Email:
                        </div>
                        {email}
                        <br/>
                        {address ? <div className='consumer-topfields-key'>
                            Address:
                        </div> : ""}
                        <span style={{"lineHeight": "20px"}}>
                            {address ? address : ""}
                        </span>

                    </div>

                    <div className='consumer-screen1-product-parent'>
                        <div className='consumer-screen1-product-key'>
                            Purchased Product:
                        </div>
                        {products.map((product, index) => {
                            return (
                                <ProductCard address={address} product={product} key={index}/>
                            );
                        })}

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
    }  else{
        return (
            <div>

                <Snackbar
                    open={showErrorMsg}
                    autoHideDuration={5000}
                    onClose={hideErrorMsg}
                >
                    <Alert severity="error" onClose={hideErrorMsg}>{errorMsg}</Alert>
                </Snackbar>

                <div className='center-card-div'>
                   <QRModal handleClose={handleCloseQRModal} paymentId = {paymentId}/>
                    
                </div>
            </div>
        );
    }

}

// export component
export default ConsumerDashboard;
