import React, { Component } from 'react';
import "./MenuHeader.css";
import {connect} from 'react-redux'
import {getProductByName} from '../store/actions/productAction'
import {Link, withRouter} from 'react-router-dom'

 class MenuHeader extends Component {
    
    renderCategories = (category) => {
        // const category = Array.from(categories)
        console.log(category,'category')
        let myCategories
         if(this.props.initialData){//waite for asynch action to map state to props
         myCategories = category.map(element =>{
           return <li key={element.name} > 
                    {
                     element.parentId ?  <Link to={element.name} onClick={() => this.props.getProductByName(element.name)}>{element.name}</Link> : <span>{element.name}</span>
                    }
                    {(element.childCategory.length >0)?
                    (<ul>{this.renderCategories(element.childCategory)}</ul>)
                    :(null)}
                  </li>                           
        });

        //  console.log(myCategories,'myCategory')
         }
         return myCategories
        // console.log(category,'from render')
    }
    // componentDidMount(){
    //    this.renderCategories(this.props.initialData)
    // }

    render() {
        console.log(this.props.initialData,'props initial datas')
        return (
            <div className="menuHeader">
                <ul>
                {(this.props.initialData)?(this.renderCategories(this.props.initialData)):null}
                </ul>   
            </div>
        )
    }
}

const mapStateToProps = state =>({
    initialData: state.initialData.initialData.categories,
    error: state.error
});

export default connect(mapStateToProps,{getProductByName}) (MenuHeader)