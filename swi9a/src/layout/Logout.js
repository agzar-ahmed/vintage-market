import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
import "./Login.css";
import {connect} from 'react-redux'
import {logout} from '../store/actions/actions'
import "./Login.css";


export class Logout extends Component {
 onClick = ()=>{
    this.props.logout();
 }

    componentDidMount(){
        const { error, isAuthenticated} = this.props;
        console.log(isAuthenticated,'logout component')
        if(!isAuthenticated){
            console.log(this.props,"props from is auth condit")
            this.props.history.push('/login')
        }     
      }

    componentDidUpdate(){
        const { error, isAuthenticated} = this.props;
        console.log(isAuthenticated,'logout component')
        if(!isAuthenticated){
            console.log(this.props,"props from is auth condit")
            this.props.history.push('/login')
        }
        
      }
    render() {
        console.log(this.props,'inside render logout')
        return (
            <div>
                <div className="login">
                <button className="login__signinbtn" onClick={this.onClick}> Logout</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(
    mapStateToProps,
    {logout}
    )(withRouter(Logout));

//withRouter is height order component that super charge this component
//whech make it easy to do programatic redirects with : this.props.history.push("/checkout")