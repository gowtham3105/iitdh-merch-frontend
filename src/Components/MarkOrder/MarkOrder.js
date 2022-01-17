import React, {useEffect, useState} from 'react';
import {Button, Input} from '@material-ui/core';
import {Fade} from 'react-reveal';
import ProductCard from './../ProductCard/ProductCard';
import MarkOrderAPI from './../../api/MarkOrder';
import GetOrder from './../../api/GetOrderConsumer';
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from '@mui/material';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import Swal from "sweetalert2";
import {useParams, useNavigate} from "react-router-dom";

import './MarkOrder.css';

// create component react
const MarkOrder = (props) => {
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

    let params = useParams();
    let navigate = useNavigate();

    console.log(params);

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

    const markorder = async () => {
        if (paymentId === '') {
            setErrorInput(true);
            raiseError('Please enter your payment id');
        } else {
            setErrorInput(false);
            var pass = "";
            pass = sessionStorage.getItem('password')
            console.log(pass, "this is here");
            if (!pass || pass === "") {
                const passInput = await Swal.fire({
                    title: 'Password',
                    input: 'password',
                    inputLabel: 'Enter your Password',
                    inputPlaceholder: 'Password',
                    inputValidator: (value) => {
                        if (!value) {
                            return 'You need to write something!'
                        }
                    }
                })
                console.log(passInput, "this is here");

                if (passInput.isConfirmed) {
                    pass = passInput.value;
                    sessionStorage.setItem('password', pass);
                }else{
                    return;
                }
            }
            console.log(pass, "password is here");
            MarkOrderAPI(paymentId, pass).then( async res => {
                console.log(res, "dff");
                setShowAnimation(true);
                if(res.should_deliver){
                    await Swal.fire({
                        title: 'Order Delivered',
                        text: 'This Order can be collected',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                }else{
                    await Swal.fire({
                        title: 'Order Delivered',
                        text: 'This Order is already collected',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }

                window.location.replace("/markOrder");

            }).catch(err => {
                raiseError('Password is incorrect!, Please try again');
                sessionStorage.removeItem('password');
            });
        }
    };
    useEffect(
        () => {
            if (params.id) {
                if (paymentId !== params.id) {
                    setPaymentId(params.id);
                            setScreen(2);

                    GetOrder(params.id).then(res => {
                        console.log(res);
                        if (res.data.length > 0) {

                            setProducts(res.data);
                            setEmail(res.email);
                            setAddress(res.address);

                            setShowAnimation(true);
                            setScreen(1);
                        } else {
                            console.log('ffgbf');
                            // setErrorInput(true);
                            raiseError('Order Not Found. Please check your payment id');
                            setPaymentId('');
                        }
                    }).catch(err => {
                        // setErrorInput(true);
                        console.log(err);

                        raiseError('Order Not Found. Please check your payment id');
                        // setPaymentId('');
                    });
                }
            }
        },
        [paymentId, params.id]
    );


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
    } else if (screen == 1) {
        return (
            <div>
                <Snackbar
                    open={showErrorMsg}
                    autoHideDuration={5000}
                    onClose={hideErrorMsg}
                >
                    <Alert severity="error" onClose={hideErrorMsg}>{errorMsg}</Alert>
                </Snackbar>

            <div className='center-card-div center-card-div-screen1'>

                <div className='heading-screen1'>
                    <div className='heading-screen1-title'>
                        Order Details
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

                    <div>
                        <Button className='btn-consumer' onClick={() => {
                            setScreen(0);
                            setShowAnimation(false)
                        }}>
                            Back
                        </Button>
                        <Button className='btn-consumer' onClick={markorder}>
                            Confirm
                        </Button>
                    </div>

                </Fade>
            </div>
         </div>
                );
    } else if (screen == 2) {
        return (
            <div>


            </div>

        );
    }

}

// export component
export default MarkOrder;
