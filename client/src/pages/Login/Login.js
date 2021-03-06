import React, { Component } from 'react';
import { Row, Container } from "../../components/Grid";
import Navbar from '../../components/Navbar';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from 'axios';
import Alert from "../../components/Alert";
import "./Login.css";


class Login extends Component {

    state = {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        errors: ""
    }

    handleRedirect = (result) => {
        if(localStorage.getItem("id") !== undefined || localStorage.getItem("id") !== 'undefined'){
            return window.location.replace("/myProfile/")
        }
        else{
            localStorage.clear()
            window.location.replace("/sign-in/")
        }
        
                    
    }

    handleFormSubmit = event => {
        event.preventDefault();
        axios.post('/api/user/sign-up', 
        { 
            firstName: this.state.firstName, 
            lastName: this.state.lastName, 
            email: this.state.email, 
            username: this.state.username, 
            password: this.state.password
        })
        .then((res) => {
            localStorage.setItem('id', res.data._id)
            localStorage.setItem('loggedIn', true)
            this.handleRedirect(res)
            
        })
        .catch((err) => {
            console.log(err);
            this.setState({
                errors: "Please fill out all fields"
            })
        })
    }

    

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };


    render() {
        return (
            <div>
            <Navbar />
            <Header />
            <Container fluid>
                <Row>
                <div className="col-md-6 mx-auto" id="registerCard">
                    <div className="card">
                    <div className="card-header">
                        <h3 className="reg-headers">Register</h3>
                        {this.state.errors === "" ? "" :
                        <Row>
                            <Alert state={this.state}/>
                        </Row>
                        }  
                         
                    </div>
                    <div className="card-body">
                        <form id="register-form">
                        <div className="form-group">
                            <div className="form-group">
                                <label htmlFor="firstName" className="form-control-label">First Name:</label>
                                <input type="text" value={this.state.firstName} className="form-control" name="firstName" id="firstName" onChange={this.handleInputChange} placeholder="First Name" required />
                            </div>  

                            <div className="form-group">
                                <label htmlFor="lastName" className="form-control-label">Last Name:</label>
                                <input type="text" className="form-control" name="lastName" id="lastName" onChange={this.handleInputChange} placeholder="Last Name" required />
                            </div>  

                            <div className="form-group">
                                <label htmlFor="email" className="form-control-label">Email:</label>
                                <input type="email" className="form-control" name="email" id="email" placeholder="Email" onChange={this.handleInputChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="username" className="form-control-label">Username:</label>
                                <input type="text" className="form-control" name="username" id="username" placeholder="Username" onChange={this.handleInputChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="form-control-label">Password:</label>
                                <input type="password" className="form-control" name="password" id="password" placeholder="Password" onChange={this.handleInputChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="location" className="form-control-label">Location:</label>
                                <input type="text" className="form-control" name="location" id="location" placeholder="Irvine, CA" onChange={this.handleInputChange} required />
                            </div>    

                        </div>
                        

                        <span type="submit" className="login-btn" id="registerSubmit" value="Sign Up" onClick={this.handleFormSubmit} >Sign up </span>

                        </form>

                    </div>
                    </div>
                </div>
                </Row>
            </Container>
            <Footer />
            </div>
        )
    }


}

export default Login;