import Modal from 'react-bootstrap/Modal'
import React, {useEffect, useState} from 'react';
import {Button} from '@material-ui/core';
import QRCode from "react-qr-code";
import {Alert} from '@mui/material';
import {Fade} from 'react-reveal';
import {QR_END_POINT} from './../../api/api_endpoint'


import "./QRModal.css";

const QRModal = (props) => {
    return (
        <div>
            <div className='heading-screen1'>
                    <div className='heading-screen1-title'>
                       QR Code
                    </div>
            </div>
            <div className='qr-code-container'>
                
                
                <QRCode value={QR_END_POINT+props.paymentId} size={200} bgColor="#f1f1f0"/>
            </div>

                <div className='qr-code-container-text'>
                    <div className='qr-code-container-text-title'>
                        Payment ID
                    </div>
                    {props.paymentId}
                </div>
            <Button className='btn-consumer' onClick={props.handleClose}>
                        Back
                    </Button>
             <Fade>
                        <Alert severity="info" color="info" style={{fontSize: "0.7rem"}}>
                            Show this QR Code during delivery.
                        </Alert>

                    </Fade>
        </div>

    )
}

export default QRModal;