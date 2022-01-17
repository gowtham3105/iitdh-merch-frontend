import React, {useState} from "react";
import './ProductCard.css';

const ProductCard = (props) => {
    const [product] = useState(props.product);

    return (
        <div className={"product-card " +
            (props.address !== null? "product-card-address " : "33")
        }>

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
                                <div className='product-card__quantity'>{product.product_size}</div>
                            </div>
                        </span>

            </div>
        </div>
    );
};

export default ProductCard;