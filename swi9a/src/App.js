import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./layout/Header"
import Home from "./layout/Home"
import Checkout from "./layout/Checkout"
import Login from "./layout/Login"
import Logout from "./layout/Logout"
import Register from "./layout/Register"
import Dashboard from "./layout/dashboard/Dashboard"
import Addproduct from "./layout/dashboard/Addproduct"
import Addcategory from "./layout/dashboard/Addcategory"
import {Provider} from "react-redux"
import store from "./store/store"
function App() {
  return (
    <Provider store={store}>
        <Router>
          <div className="App">
              <Switch>
                <Route path="/checkout">
                    <Header/>
                    <Checkout/>
                </Route>

                <Route path="/login">
                    <Header/>
                    <Login />
                </Route>

                <Route path="/logout">
                    <Header/>
                    <Logout />
                </Route>

                <Route path="/Register">
                    <Header/>
                    <Register/>
                </Route>

                <Route path="/dashboard">
                    <Header/>
                    <Dashboard/>
                </Route>

                <Route path="/addcategory">
                    <Header/>
                    <Addcategory />
                </Route>

                <Route path="/addproduct">
                    <Header/>
                    <Addproduct />
                </Route>

                <Route exact path="/">
                    <Header/>
                    <Home />          
                </Route>

                <Route path="*" component={()=>"404 not found"}> 
                                            
                </Route>
              </Switch>
          </div>
        </Router>
    </Provider>
  );
}

export default App;
