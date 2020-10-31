import React from 'react'
import StarIcon from '@material-ui/icons/Star'
import {yellow} from '@material-ui/core/colors'
import "./CheckoutProduct.css"
import {connect} from 'react-redux'
import {deleteFromBasket} from '../store/actions/actions'

function CheckoutProduct(props) {
    console.log(props,"checkoutProduct")
    const {item} = props;
    const {product} = item;
    const {id, title, price, rating, image } = product;
    const {quantity} = item;
    const deleteFromBasket= (id) => {
        props.deleteFromBasket(id)
        // console.log(props.item.product ,"product reducer")
    }
    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct__image" src={image} alt="checkout_image"/>
         <div className="checkoutProduct__info">  
           <p className="checkoutProduct__title">{title}</p>
           <p className="checkoutProduct__price">
               <strong>{price}</strong>
               <small> $ </small>
              (<small>{quantity}</small>)
           </p>
           <p className="checkoutProduct__rating"> 
                {
                    Array(rating)
                    .fill().map(() => ( <StarIcon style={{ color: yellow[500] }}/>))
                }
            </p>
            <button className="checkoutProduct__button" onClick={() => deleteFromBasket(id)}>Remove from basket</button>

            
         </div>
        </div> 
    )
}

const mapStateToProps = (state) => {
    return{
        total : state.basket.checkoutProduct.reduce((total, item) => total + item.quantity * item.product.price, 0)
    };
}
// const mapDispachToProps = (dispatch) => {
//     return{
//         addToBasket:(productInfo, quantity) => dispatch(addToBasket(productInfo, quantity))
//     };
// }
const mapDispachToProps = (dispatch) => {
    return{
        deleteFromBasket:(id) => dispatch(deleteFromBasket(id))
    };
}


export default connect(mapStateToProps, mapDispachToProps)(CheckoutProduct)