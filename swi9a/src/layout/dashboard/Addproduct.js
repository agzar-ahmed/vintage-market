import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
import "../Login.css";
import "../Register.css";
import {connect} from 'react-redux'
import {register,clearErrors} from '../../store/actions/actions'


export class Addproduct extends Component {
    state = {
        name:'',
        email:'',
        password:'',
        msg: null
      };
     
      static propTypes = {
          isAuthenticated: PropTypes.bool,
          error: PropTypes.object.isRequired,
          register: PropTypes.func.isRequired,
          clearErrors: PropTypes.func.isRequired
      }
    

    onChange = e =>{
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const { name, email, password } = this.state;

        //Create user object
        const newUser = {
            name,
            email,
            password
        };

    this.props.register(newUser);    
    };

    componentDidMount(){
        const { isAuthenticated} = this.props;
        if(!isAuthenticated){
            console.log(this.props,"props from is auth condit")
            this.props.history.push('/addproduct')
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
                <h1>Add product</h1>
                {this.state.msg ? (<div className='Register__alert'>{this.state.msg}
                <span className="Register__closebtn" onClick={this.props.clearErrors}>&times;</span> </div>) : null}
                <form onSubmit={this.onSubmit}>
                    <h3>categories</h3>
                    <select  name="category" onChange={this.onChange}>
                        <option >1</option>
                        <option >2</option>
                        <option >3</option>
                    </select>
                    <h3>name</h3>
                    <input type="email" name="email" onChange={this.onChange}/>  
                    <h3>price</h3>
                    <input type="password" name="password" onChange={this.onChange}/>  
                    <button className="login__signinbtn" type="submit">Add a product</button>
                </form>
                
                
               
                <div className="devider"></div>
                {/* <h5 className="tittle">New to Swi9a</h5>
                <button> Create your Swi9a account</button> */}
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
    {register,clearErrors}
    )(withRouter(Addproduct));

//withRouter is height order component that super charge this component
//whech make it easy to do programatic redirects with : this.props.history.push("/checkout")