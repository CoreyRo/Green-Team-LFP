import React from "react"
import "./Login-form.css"
import {Container, Col, Row} from "../Grid"

const LoginForm = props => {

    console.log(props);
    return (


    <div id="form-style">

        <form >
            <div className="form-group">
                <div className="form-group">
                    <label htmlFor="username" className="form-control-label">Username:</label>
                    <input type="text" value={props.username} className="form-control" name="email" id="username" onChange={props.handleInputChange} placeholder="Username" required/>
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="form-control-label">Password:</label>
                    <input type="password" value={props.password} className="form-control" name="password" id="password" onChange={props.handleInputChange} placeholder="Password" required/>
                </div>  
            </div>
            

            <button type="submit" className="btn" onClick={props.handleFormSubmit} id="login-submit">Sign-In</button>

            <a type="submit" className="btn"  href="/sign-up" id="register-submit">Register</a>

            <a type="submit" className="btn" href="/recover/user"  id="forgot-submit">Forgot Password?</a>
        </form>

    </div>
    )
}


export default LoginForm