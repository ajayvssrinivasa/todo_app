import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export class Home extends Component {
    render() {
        return (
            <div className="ba" style={{marginTop:20}}>
               <ul class="nav justify-content-center" style={{backgroundColor:"black",height:50}}>
  <li class="nav-item">
  <Link to="/"className="nav-link">Home</Link>
  </li>
  <li class="nav-item">
  <Link to="/registration" className="nav-link" >Registration</Link>
  </li>
  <li class="nav-item">
  <Link to="/Login" className="nav-link">Login</Link>
  </li>
 
</ul>
<h2 style={{marginLeft:500,color:"white", marginTop:250,fontSize:50}} >Welcome to Todo App</h2>        
                
            </div>
        )
    }
}

export default Home
