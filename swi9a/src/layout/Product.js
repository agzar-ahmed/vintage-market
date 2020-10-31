import React from 'react'
import StarIcon from '@material-ui/icons/Star'
import "./Product.css"
import { yellow } from '@material-ui/core/colors'
import {connect} from 'react-redux'
import {addToBasket} from '../store/actions/actions'

function Product(props) {
    const {id, title, price, rating, image } = props ;
    const product = {id, title, price, rating, image };
    const addToBasket= (product) => {
        props.addToBasket(product,1)
        console.log(product,"selected product")
        console.log(props,"props")
    }
    // console.log(props,"Product")
    return (
        <div className="product">
            <div className="product__info">
                <p className="product__title"> {title} </p>
                <p className="product__price"> 
                <strong>{price}</strong>
                <small> $ </small>
                </p>
                <p className="product__rating"> 
                {
                    Array(rating)
                    .fill().map(() => ( <StarIcon style={{ color: yellow[500] }}/>))
                }
                </p>
            </div>
           
            <img src={image} alt="productImage"/>
            <button onClick={() => addToBasket(product)}>Add to basket</button>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        checkoutItems: state.ckeckoutProduct,
        // total : state.reduce((total, item) => total + item.quantity * item.product.price, 0)
    };
}
const mapDispachToProps = (dispatch) => {
    return{
        addToBasket:(productInfo, quantity) => dispatch(addToBasket(productInfo, quantity))
    };
}

export default connect(mapStateToProps, mapDispachToProps)(Product)