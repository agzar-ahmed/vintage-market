import React from 'react'
import StarIcon from '@material-ui/icons/Star'
import "./style.css"
import { yellow } from '@material-ui/core/colors'
import {connect} from 'react-redux'
import {addToBasket} from '../../store/actions/actions'

function Product(props) {
    const {id, title, price, rating, image } = props ;
    const product = {id, title, price, rating, image };
    const addToBasket= (product) => {
        props.addToBasket(product,1)
        console.log(product,"selected product")
        console.log(props,"props")
    }
    console.log(props,"Product")
    return (
        <div className="productListe">
            <div className="productList__header">
                <div>Samsung mobile under 10k</div>
                <button>View all</button>
            </div> 

            <div className="productList__container">       
                <div className="productList__info">
                  <div className="productList__imgContainer">
                    <img src='https://www.gizmochina.com/wp-content/uploads/2020/01/Xiaomi-Mi-10-Pro-5G-1-500x500.jpg' alt="productImage"/>
                  </div>
                     {/* <button onClick={() => addToBasket(product)}>Add to basket</button> */}
                        <p className="productList__title"> http://localhost:5000/public/qaqeiSjBq-Xiaomi-Logo-White-Background.png{title} </p>
                        <p className="productList__price"> 
                        <strong>{price}</strong>
                        <small>$</small>
                        </p>
                        <p className="productList__rating"> 
                            {
                                Array(rating)
                                .fill().map(() => ( <StarIcon style={{ color: yellow[500] }}/>))
                            }
                     </p>
                </div>
            </div>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        checkoutItems: state.ckeckoutProduct,
        products: state.product.product,
        // total : state.reduce((total, item) => total + item.quantity * item.product.price, 0)
    };
}
const mapDispachToProps = (dispatch) => {
    return{
        addToBasket:(productInfo, quantity) => dispatch(addToBasket(productInfo, quantity))
    };
}

export default connect(mapStateToProps, mapDispachToProps)(Product)