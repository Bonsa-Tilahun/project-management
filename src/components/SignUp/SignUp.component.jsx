import React from 'react'
import axios from 'axios'
import './signup.styles.css'
import { Component } from 'react'

class SignUp extends Component{
    constructor(){
        super()

        this.state={
            userName: '',
            password: '',
            confirmPassword:''
        }
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleSignUp = this.handleSignUp.bind(this)
    }

    handleSignUp(){
        if(this.state.password !== this.state.confirmPassword){
            alert("Password does not match")
            return
        }
        const newUser ={
            userName: this.state.userName,
            password: this.state.password
        }
        axios.post('/api/users',newUser).then(res =>{
            this.props.logUserIn(res.data)
        }).catch((err) => alert(`There was a problem creating user: ${err}`))
    }

    handleOnChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        return(
            <section className='signUp-container'>
                <div className='signUp-form'>
                    <label htmlFor="userName">User Name</label>
                    <input name='userName' id='userName' type="text" onChange={this.handleOnChange}/>
                    <label htmlFor="password">Password</label>
                    <input name='password' id='password' type="password" onChange={this.handleOnChange}/>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input name='confirmPassword' id='confirmPassword' type="password" onChange={this.handleOnChange}/>
                    <button onClick={this.handleSignUp} className='submitBtn' type='submit'>SIGN UP</button>
                </div>
            </section>
        )
    }
}

export default SignUp