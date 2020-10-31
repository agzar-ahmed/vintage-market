import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
import "./Login.css";
import {connect} from 'react-redux'
import {login,clearErrors} from '../store/actions/actions'


export class Login extends Component {
    state = {
        email:'',
        password:'',
        msg: null
      };
     
      static propTypes = {
          isAuthenticated: PropTypes.bool,
          error: PropTypes.object.isRequired,
          login: PropTypes.func.isRequired,
          clearErrors: PropTypes.func.isRequired
      }
    

    onChange = e =>{
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const { email, password } = this.state;

        //Create user object
        const user = {
            email,
            password
        };

        this.props.login(user);    
        };

    componentDidUpdate(prevProps){
        const { error, isAuthenticated} = this.props;
        if(error !== prevProps.error) {
            //check for login errors
        if(error.id == 'LOGIN_FAIL') {
          this.setState({ msg: error.msg.msg});
          // console.log(error.msg.msg)
        }else {
            this.setState({ msg: null });
        }
       }
        //if authenticated
        else if(isAuthenticated){
            console.log(this.props,"props from is auth condit")
            this.props.history.push('/')// check for redirect component method
        }            
      }
      
    render() {
        console.log(this.props)
        // setTimeout(()=> {this.props.history.push("/checkout")},2000)
        return (
            <div>
                <div className="login">
            <Link to="/">
                <img className="login__logo"
                 src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" 
                 alt="Amazon_logo"
                 />  
            </Link>
            <div className="login__container">
                <h1>Create account</h1>
                {this.state.msg ? (<div className='login__alert'>{this.state.msg}
                <span className="login__closebtn" onClick={this.props.clearErrors}>&times;</span> </div>) : null}
                <form onSubmit={this.onSubmit}> 
                    <h3>E-mail</h3>
                    <input type="email" name="email" onChange={this.onChange}/>  
                    <h3>Password</h3>
                    <input type="password" name="password" onChange={this.onChange}/>  
                    <button className="login__signinbtn" type="submit">Login</button>
                </form>
                
                
                <p>
                By continuing, you agree to Swi9a's Conditions of Use and Privacy Notice.
                </p>
                <div className="devider"></div>
                <h5 className="tittle">New to Swi9a</h5>
                <Link to="/register">
                <button> Create your Swi9a account</button>
                </Link>
            </div>

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
    {login,clearErrors}
    )(withRouter(Login));

//withRouter is height order component that super charge this component
//whech make it easy to do programatic redirects with : this.props.history.push("/checkout")