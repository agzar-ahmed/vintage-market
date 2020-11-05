import React,{Component}from 'react';
import "./Header.css";
import {Link, withRouter} from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {register,clearErrors} from '../store/actions/actions'


export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };
 
  render(){
    // 
    const { isAuthenticated, user } = this.props.auth;
    // const authLink = {
    //   <Route path="/login">
    //     <Header/>
    //     <Login />
    //   </Route>
    // }
    console.log(this.props,"state from header")
    return (
        <nav className="header">
            {/* Logo */}
            <Link to="/">
                <img 
                className="header__logo"
                src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" 
                alt="Amazon_logo"
                />
            </Link>
           
            {/* Search Box*/}
            <div className="header__search">
                <input 
                type="text" 
                className="header__searchInput"
                />
                <SearchIcon className="header__searchIcon"/>
            </div>

            <div className="header__nav">
                {/* 3 Links */}
                   {/* 1st Link */}
                   {(isAuthenticated) ? 
                   (
                   <Link to="/logout" className="header__link">
                      <div className="header__option">
                          <span className="header__optionLineOne">hello {user.name}</span>
                          <span className="header__optionLineTwo">Sign out</span>
                      </div>
                    </Link>
                  )
                  :
                    (<Link to="/login" className="header__link">
                      <div className="header__option">
                          <span className="header__optionLineOne">Hello</span>
                          <span className="header__optionLineTwo">Sign in</span>
                      </div>
                    </Link>)
                }

                {(isAuthenticated) ? 
                   (
                  <Link to="/dashboard" className="header__link">
                    <div className="header__option">
                        <span className="header__optionLineTwo">Dashboard</span>
                    </div>
                  </Link>
                  )
                  :
                  null
                }
                {/* <Link to="/login" className="header__link">
                  <div className="header__option">
                      <span className="header__optionLineOne">Hello</span>
                      <span className="header__optionLineTwo">Sign in</span>
                  </div>
                </Link> */}
                {/* 2nd Link */}
                <Link to="/login" className="header__link">
                  <div className="header__option">
                      <span className="header__optionLineOne">Returns</span>
                      <span className="header__optionLineTwo">& Orders</span>
                  </div>
                </Link>
                {/* 3d Link */}
                <Link to="/login" className="header__link">
                  <div className="header__option">
                      <span className="header__optionLineOne">Your</span>
                      <span className="header__optionLineTwo">Prime</span>
                  </div>
                </Link>
                {/* 4th Link */}
                <Link to="/checkout" className="header__link">
                  <div className="header__optionBasket">
                    <ShoppingBasketIcon/>
                    <span className="header__BasketCount">{this.props.totalQuantity}</span>
                  </div>
                </Link>
            </div>
        </nav> 
    )
}
}

const mapStateToProps = (state) => {
  console.log(state.checkoutProduct,"checkout product from stateto props")
  return{
      totalQuantity : state.basket.checkoutProduct.reduce((total, item) => total + item.quantity, 0),
      auth: state.auth,
      error: state.error
  };
}

// export default connect(mapStateToProps)()

export default connect(
  mapStateToProps,
  {register,clearErrors}
  )(withRouter(Header));