import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
// import PropTypes from 'prop-types';
import "../Login.css";
import "../Register.css";
import {connect} from 'react-redux'
import {addToCategory,clearErrors,loadCategory} from '../../store/actions/categoryAction'

export class Addcategory extends Component {
    state = {
        category:'',
        parentId: undefined,
        categoryImage:null,
        msg: null
      };
     
    //   static propTypes = {
    //       isAuthenticated: PropTypes.bool,
    //       error: PropTypes.object.isRequired,
    //       register: PropTypes.func.isRequired,
    //       clearErrors: PropTypes.func.isRequired
    //   }
    

    onChange = e =>{
        this.setState({ [e.target.name]: e.target.value});
    };

    handelCategoryImage = e =>{
     this.setState(this.state.categoryImage = e.target.files[0]);
    //  console.log(e.target.files)
    }
   
    onSubmit = e => {
        e.preventDefault();
        // const { category } = this.state;

        const data = new FormData()
        data.append('categoryImage', this.state.categoryImage)
        data.append('text', this.state.category)

        // if(this.state.parentId =! undefined){
            data.append('parentId', this.state.parentId)
        // }
             
        //Create user object
        const newCategory = {
            data
        };
        // console.log(data,'new category')
            data.forEach((value,key) => {
                console.log(key+value,'key value pair')
                });
     this.props.addToCategory(newCategory);    
    };

    componentDidMount(){
        const {isAuthenticated} = this.props;
        if(!isAuthenticated){
            // console.log(this.props,"props from is auth condit")
            this.props.history.push('/addcategory')
            this.props.loadCategory() 
        }                
      }

    componentDidUpdate(prevProps){
        const { error } = this.props;
        if(error !== prevProps.error) {
            //check for login errors
        if(error.id == 'CATEGORY_ERROR') {
          this.setState({ msg: error.msg.msg});
          // console.log(error.msg.msg)
        }else {
            this.setState({ msg: null });
            this.props.loadCategory() 
        }
       }          
      }

      renderCategories = (category) => {
        let myCategories
         if(this.props.category){//waite for asynch action to map state to props
         myCategories = category.map(element =>{
           return <li key={element.name} > 
                    {element.name }
                    {(element.childCategory.length >0)?(<ul>{this.renderCategories(element.childCategory)}</ul>):(null)}
                  </li>                           
        });

        //  console.log(myCategories,'myCategory')
         }
         return myCategories
       }

       createCategoriesList = (category,myCategories =[]) =>{
         
            // console.log(category,'category')
            if(this.props.category){
                
                for(let element of category){
                // console.log(element,"element")
                if(element != undefined){
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
       
      

    render() {
        // console.log(this.props.category,"addcategory props") 
        // console.log(this.state.category,"addcategory state") 

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
                <h1>Add Category </h1>
                {this.state.msg ? (<div className='Register__alert'>{this.state.msg}
                <span className="Register__closebtn" onClick={this.props.clearErrors}>&times;</span> </div>) : null}
                <form onSubmit={this.onSubmit}>
                    <h3>name</h3>
                    <input type="text" name="category" placeholder="Category Name" onChange={this.onChange}/> 
                    <h3>parent category</h3> 
                    <select name="parentId" placeholder="Select Category" onChange={this.onChange}>
                    <option value="" hidden>Select something...</option>
                    {this.createCategoriesList(this.props.category)
                    .map(cat => <option key={cat.value} value={cat.value}>{cat.name}</option>)}
                    </select>
                    <h3>image</h3>
                    <input type="file" name="categoryImage" onChange={this.handelCategoryImage}/>
                    <button className="login__signinbtn" type="submit">Add a category</button>
                </form>               
            </div>
           <div>  </div>
            <div className="login__signinbtn">Category list</div>
            <div> {this.renderCategories(this.props.category)} </div> 
        </div>
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
    {addToCategory,clearErrors,loadCategory}
    )(withRouter(Addcategory));

//withRouter is height order component that super charge this component
//whech make it easy to do programatic redirects with : this.props.history.push("/checkout")