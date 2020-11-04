import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
import "../Login.css";
import "../Register.css";
import "./Addproduct.css";
import {connect} from 'react-redux';
import {register,clearErrors} from '../../store/actions/actions';
import {loadCategory} from '../../store/actions/categoryAction';
import {addProduct} from '../../store/actions/productAction';


export class Addproduct extends Component {
    state = {
        msg:'',
        name:'',
        price:'',
        quantity:'',
        description:'',
        category:'',
        productPictures:[]
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

    createCategoriesList = (category,myCategories =[]) =>{
         
        // console.log(category,'category')
        if(this.props.category){
            
            for(let element of category){
            // console.log(element,"element")
            if(element!= undefined){
                myCategories.push({value:element.catId, name: element.name});
            }
           
                if(element!= undefined && element.childCategory.length >0){
                    this.createCategoriesList(element.childCategory,myCategories)
                    // console.log(element,"element category")
                
                }
            }                        
        }
        // console.log(myCategories,'createcategoryliste')
        return myCategories
     
   }

   handelProductPictures = (e) =>{
      this.setState({
          productPictures:[
                               ...this.state.productPictures,
                               e.target.files[0]
                          ]
        })
   }
   
   renderTable =()=>{
    return(
    <table>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Category</th>
            </tr>
            <tr>
                <td>Sample text</td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
            </tr>
            <tr>
                <td>Sample text</td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
            </tr>
    </table>
    )
   }

    onSubmit = e => {
        e.preventDefault();

        const data = new FormData()
        data.append('name', this.state.name)
        data.append('price', this.state.price)
        data.append('quantity', this.state.quantity)  
        data.append('description', this.state.description)
        data.append('category', this.state.category)
        for(let pic of this.state.productPictures){
            data.append('productPictures', pic)
        }     
        //Create product object
        const newProduct = {
            data
        };
        console.log(newProduct,'new category')
        // console.log(data,'new category')
            data.forEach((value,key) => {
                console.log(key+value)
                });
     this.props.addProduct(newProduct); 
    };

    componentDidMount(){
        // const { isAuthenticated} = this.props;
        const { error, isAuthenticated} = this.props;
        if(!isAuthenticated){
            // console.log(this.props,"props from is auth condit")
            this.props.history.push('/addproduct')
            this.props.loadCategory()
        }         
      }

    componentDidUpdate(prevProps){
        const { error } = this.props;
      if(error !== prevProps.error) {
            //check for login errors
            if(error.id == 'PRODUCT_ERROR') {
            this.setState({ msg: error.msg.msg});
            // console.log(error.msg.msg)
            }else{
                this.setState({ msg: null });
            }
       }   
       console.log(this.state) 
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
                
                <h1>Add Product </h1>
                {this.state.msg ? (<div className='Register__alert'>{this.state.msg}
                <span className="Register__closebtn" onClick={this.props.clearErrors}>&times;</span> </div>) : null}
                <form onSubmit={this.onSubmit}>
                    <h3>Name</h3>
                    <input type="text" name="name" onChange={this.onChange}/> 
                    <h3>Price</h3>
                    <input type="number" name="price" min="0.00" max="10000.00" step="0.01" onChange={this.onChange}/> 
                    <h3>Quantity</h3>
                    <input type="number" name="quantity" onChange={this.onChange}/>
                    <h3>Category</h3> 
                    <select name="category" onChange={this.onChange}>
                    {this.createCategoriesList(this.props.category)
                    .map(cat => <option key={cat.value} value={cat.value}>{cat.name}</option>)}
                    </select>
                     {(this.state.productPictures.length > 0)?(this.state.productPictures.map(pic=><div>{pic.name}</div>)):(null)}
                    <h3>image</h3>
                    <input type="file" name="categoryPicture" onChange={this.handelProductPictures}/>
                    <h3>Description</h3>
                    <input type="text" name="description" onChange={this.onChange}/>
                    <button className="login__signinbtn" type="submit">Add a Product</button>
                </form>               
            </div>
        </div>
             <h1>Product List</h1>
             {this.renderTable()}
            </div>
        )
    }
}

const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    category: state.categories.category
});

export default connect(
    mapStateToProps,
    {register,clearErrors,loadCategory,addProduct}
    )(withRouter(Addproduct));

//withRouter is height order component that super charge this component
//whech make it easy to do programatic redirects with : this.props.history.push("/checkout")