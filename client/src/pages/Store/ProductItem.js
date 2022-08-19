import React from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../../hooks/useCart';

const ProductItem = ({ product }) => {

    const { addProduct, cartItems, increase } = useCart();

    const isInCart = product => {
        return !!cartItems.find(item => item.id === product.id);
    }

    return (
        <div className="card card-body">
            <img style={{ display: "block", margin: "0 auto 10px", maxHeight: "200px" }} className="img-fluid"
                src={product.photo + '?v=' + product.id} alt="" />
            <p>{product.homeAddress}</p>
            <h3 className="text-left">{product.homeCity}</h3>
            <h4 className="text-left">{product.homeState}</h4>
            <h4 className="text-left">{product.type}</h4>

            <div className="text-right">
                <Link to="/" className="btn btn-link btn-sm mr-2">Details</Link>

                {
                    isInCart(product) &&
                    <button
                        onClick={() => increase(product)}
                        className="btn btn-outline-primary btn-sm">Add more</button>
                }

                {
                    !isInCart(product) &&
                    <button
                        onClick={() => addProduct(product)}
                        className="btn btn-primary btn-sm">Add to cart</button>
                }

            </div>
        </div>
    );
}

export default ProductItem;