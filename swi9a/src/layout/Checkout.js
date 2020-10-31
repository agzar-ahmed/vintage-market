import React from 'react'
import CheckoutProduct from './CheckoutProduct'
import Subtotal from './Subtotal'
import "./Checkout.css"
import {connect} from 'react-redux'

function Checkout(props) {
// const {id, title, price, rating, image } = props.checkoutProduct
// const basket =[{id, title, price, rating, image }]
 console.log(props.checkoutProduct,"Checkout")

    return (
        <div className="checkout">
            <div className="checkout__left">    
            {
            props.checkoutProduct.length ? 
            ( <div className="">
                        <h1>Your checkout basket</h1>
                        { props.checkoutProduct.map(item => (
                            //  console.log(item,'items')
                            <div className="" key={item.product.id}>
                                <CheckoutProduct 
                                // id={item.product.id}
                                // title={item.product.title}
                                // price={item.product.price} 
                                // rating={item.product.rating}
                                // image={item.product.image}
                                item={item}
                                /> 
                            </div>      
                    ))}
                    
            </div> 
            ): (
            <div className="">
                <h1>Your checkout basket is empty</h1>
            </div> 
            )
            }
            </div>
            
            {  props.checkoutProduct.length > 0 &&
               ( <div className="checkout__right">
                <Subtotal/>

                </div>)
            }
            
        </div>
        
         
    )
}

const mapStateToProps = (state) => {
    return{
        checkoutProduct: state.basket.checkoutProduct,
        total : state.basket.checkoutProduct.reduce((total, item) => total + item.quantity * item.product.price, 0)
    };
}

export default connect(mapStateToProps)(Checkout)