import React from 'react'
import soukImg from './soukImg.jpg'
import "./Home.css"
import Product from './Product'
import prodImg from './prodImg.jpg'

function Home() {
    return (
        <div className="home">
           
           <img 
           className="home__image"
           src={soukImg} 
           alt="banner_image"/>
          
          <div className="home__row">
           <Product 
                   id="123412"
                   title="lorem epsum lorem epsum lorem epsum lorem epsum"
                   price={11.96}
                   rating={5}
                   image={prodImg}
           />
           <Product 
                   id="1234513"
                   title="lorem epsum lorem epsum lorem epsum lorem epsum"
                   price={11.96}
                   rating={5}
                   image={prodImg}
           />
           </div>
           <div className="home__row">
           <Product 
                   id="1234514"
                   title="lorem epsum lorem epsum lorem epsum lorem epsum"
                   price={11.96}
                   rating={5}
                   image={prodImg}
           />
           <Product 
                   id="1234515"
                   title="lorem epsum lorem epsum lorem epsum lorem epsum"
                   price={11.96}
                   rating={5}
                   image={prodImg}
           />
           <Product 
                   id="1234510"
                   title="lorem epsum lorem epsum lorem epsum lorem epsum"
                   price={11.96}
                   rating={5}
                   image={prodImg}
           />
           </div>
           <div className="home__row">
           <Product 
                   id="1234511"
                   title="lorem epsum lorem epsum lorem epsum lorem epsum"
                   price={11.96}
                   rating={5}
                   image={prodImg}
           />
            </div>
        </div>
    )
}
 
export default Home