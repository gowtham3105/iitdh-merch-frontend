import React, {useEffect, useState} from "react";
import './ProductCard.css';
import image from './../../images/H-front.png';
import {Grid} from "@material-ui/core";
import {Container} from "@material-ui/core";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import Container from "react-bootstrap/Container";

const ProductCard = (props) => {
    const [product, setProduct] = useState(props.product);

    return (
        <div className="product-card">

            <div className={"product-card__info " +
                ((product.product.id === "TB21" || product.product.id === "TB20") ?"product-card__info_black ":"")
                + ((product.product.id === 'TW') ?"product-card__info_white ":"")
                + ((product.product.id === 'TR' ) ?"product-card__info_red ":"")
                + ((product.product.id === 'HB') ?"product-card__info_hood ":"")
            }
            >


                        <div  className='consumer-screen1-grid-item'>
                            <div className="product-card__id">
                                <div className='product-card__id__id'>
                                {product.product.id}
                                </div>
                                <div>
                                     {product.product.name}
                                </div>
                            </div>

                        </div>
                        <span   className='consumer-screen1-grid-item-1'>
                            <div className='product-card-col2'>
                                {/*<div className='product-card__X'>Size: </div>*/}
                                <div className='product-card__quantity'>{product.product_size}</div>
                            </div>
                        </span>

            </div>
        </div>
    );
};

export default ProductCard;