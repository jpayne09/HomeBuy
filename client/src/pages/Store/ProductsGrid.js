import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Button, Grid, Row, Col } from 'react-bootstrap';
import { InteractionRequiredAuthError, InteractionType } from "@azure/msal-browser";
import { loginRequest, protectedResources } from '../../auth/authConfig';
import { callApiWithToken } from "../../auth/fetch";
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, MsalAuthenticationTemplate, useAccount } from "@azure/msal-react";
import styles from './homeview.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ProductItem from './ProductItem';
import { useProducts } from '../../hooks/useProducts';


const ProductsGrid = () => {

    const { products } = useProducts();

    return (
        <div>
            <div className="row">
                <div className="col-sm-8">
                    <div className="py-3">
                        
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="form-group">
                        <input type="text" name="" placeholder="Search product" className="form-control" id="" />
                    </div>
                </div>
            </div>
            <div>
                {
                    products?.map(product => (
                        <ProductItem key={product.id} product={product} />
                    ))
                }
            </div>
            <div>

            </div>
        </div>
    );
}

export default ProductsGrid;
