import React from 'react'
import axios from 'axios'
import './signIn.styles.css'
import { Component } from 'react'

class SignIn extends Component{
    constructor(){
        super()

        this.state={
            userName: '',
            password: ''
        }
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleSignIn = this.handleSignIn.bind(this)
    }

    handleSignIn(){
        const newUser ={
            userName: this.state.userName,
            password: this.state.password
        }
        console.log(newUser)
        axios.get(`/api/users?userName=${this.state.userName}&password=${this.state.password}`).then(res =>{
            this.props.logUserIn(res.data)
        }).catch((err) => alert(`There was a problem logging in: ${err}`))
    }

    handleOnChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        return(
            <section className='signIn-container'>
                <div className='signIn-form'>
                    <label htmlFor="userName">User Name</label>
                    <input name='userName' id='userName' type="text" onChange={this.handleOnChange}/>
                    <label htmlFor="password">Password</label>
                    <input name='password' id='password' type="password" onChange={this.handleOnChange}/>
                    <button onClick={this.handleSignIn} className='submitBtn' type='submit'>SIGN IN</button>
                </div>
            </section>
        )
    }
}

export default SignIn