import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Modal} from "./Modal";
import "./Modal.css";
import {generatePublicUrl} from "../../urlConfig"



export default class Mod extends Component {
  
  render() {
    return (
      <div>
        <Modal showModal={this.props.showModal} 
        handleClose={this.props.hideModal} 
        //hideModal={this.props.hideModal}
        >
          <h1>Product:</h1>
         <div className="modal_children">
         {/* { let {name, price, category,} = this.props.product } */}
             {(this.props.product == null)?( null):
             <div>
                  <div className="modal_tittle">Name:</div>
                  <div className="modal_value">{this.props.product.name}</div>
                  <div className="modal_tittle">Category:</div>
                  <div className="modal_value">{this.props.product.category.name}</div>
                  <div className="modal_tittle">Price:</div>
                  <div className="modal_value">{this.props.product.price}</div>
                  <div className="modal_tittle">Quantity:</div>
                  <div className="modal_value">{this.props.product.quantity}</div>
                  <div className="modal_tittle">Description:</div>
                  <div className="modal_value">{this.props.product.description}</div>
                  <div className="modal_tittle">Pictures:</div>
                  <div className="modal_pictures">
                    {this.props.product.productPictures
                   .map((picture)=><img src={generatePublicUrl(picture.img)}/>)}
                   </div> 
             </div>
             }

        </div>
        <button className="modal_btn" onClick={this.props.hideModall}> 
              close
        </button>
        </Modal>
        
        {/* <button className="modal_btn" onClick={this.showModal}> 
          open
        </button> */}
      </div>
    );
  }
}

//  const container = document.createElement("div");
// document.body.appendChild(container);
//  ReactDOM.render(<Modal />, container);
