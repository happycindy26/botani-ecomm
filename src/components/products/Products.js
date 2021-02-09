import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ProductsData from './Products.data';
import ProductsDetails from './ProductsDetails';
import './Products.css';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: ProductsData
        }
        
    }
    
    render() {
        
        return (
            <div className="Products my-5">
                <h3 className="text-center my-5">Best Sellers</h3>
                <div className="container">
                    <div className="row">
                        {this.state.products.map(product => (
                            <div className="Product col-md-4 text-center" key={product.name} >
                                <Link to={`./products/${product.name}`} >
                                <img src={product.src} alt={product.name}/>
                                </Link>
                            
                                <Link className="underline" to={`./products/${product.name}`} ><h6>${product.name}</h6></Link>
                                <Link className="underline my-3" to={`./products/${product.name}`} ><h5>${product.price}</h5></Link>
                                <Link to={`./products/${product.name}/addtocart`} className="btn btn-outline-dark mb-5">
                                ADD TO CART    
                                </Link> 
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Products;


