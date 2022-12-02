
import './App.css';

import React, { Component } from 'react'
import Navbar from "./components/Navbar"
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";

export default class App extends Component {
    pageSize=6
    ApiKey=process.env.REACT_APP_NEWS_API
  render() {    
    return (
      <div>
        
        <Router>
        <Navbar/>     
        <Routes>
          <Route exact path="/" element={<News  ApiKey={this.ApiKey} key="general" pageSize={this.pageSize} country='in' category='general'/>}></Route>
          <Route exact path="/business" element={<News  ApiKey={this.ApiKey} key="business" pageSize={this.pageSize} country='in' category='business'/>}></Route>
          <Route exact path="/entertainment" element={<News  ApiKey={this.ApiKey} key="entertainment" pageSize={this.pageSize} country='in' category='entertainment'/>}></Route>
          <Route exact path="/general" element={<News  ApiKey={this.ApiKey} key="general" pageSize={this.pageSize} country='in' category='general'/>}></Route>
          <Route exact path="/health" element={<News  ApiKey={this.ApiKey} key="health" pageSize={this.pageSize} country='in' category='health'/>}></Route>
          <Route exact path="/science" element={<News  ApiKey={this.ApiKey} key="science" pageSize={this.pageSize} country='in' category='science'/>}></Route>
          <Route exact path="/sports" element={<News  ApiKey={this.ApiKey} key="sports" pageSize={this.pageSize} country='in' category='sports'/>}></Route>
          <Route exact path="/technology" element={<News  ApiKey={this.ApiKey} key="technology" pageSize={this.pageSize} country='in' category='technology'/>}></Route>
        </Routes> 
        </Router>
      </div>
    ) 
  }
}

