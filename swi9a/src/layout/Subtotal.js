import React from 'react'
import './Subtotal.css'
import {connect} from 'react-redux'
import {clearBasket} from '../store/actions/actions'

function Subtotal(props) {

    console.log(props,"Subtotal")
    const clearBasket = () => {
        props.clearBasket()
        }
    return (        
        <div className="subtotal">
         <p>Subtotal({props.totalQuantity} items): <strong>$ {props.total}</strong> </p> 
        
        <small className="subtotal_gift">
            <input type="checkbox"/> This order contains a gift
        </small>
        
        <button onClick={() => clearBasket()}>Proceed to checkout</button>
        </div>
    )
}

const mapStateToProps =(state) => {
      return{
        totalQuantity : state.basket.checkoutProduct.reduce((total, item) => total + item.quantity, 0),
        total : state.basket.checkoutProduct.reduce((total, item) => total + item.quantity * item.product.price, 0)
      };
}
const mapDispachToProps = (dispatch) => {
    return{
        clearBasket:() => dispatch(clearBasket())
    };
}

export default connect(mapStateToProps,mapDispachToProps)(Subtotal)


