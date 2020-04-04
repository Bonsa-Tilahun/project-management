import React, { Component } from 'react'
import SignUp from '../../components/SignUp/SignUp.component'

import './sign-in-sign-up.styles.css'
import SignIn from '../../components/SignIn/SignIn.component'

class SignInUpPage extends Component {
    constructor(){
        super()
        
        this.state={
            haveAccount: true
        }
        this.toggleSignUp = this.toggleSignUp.bind(this)
    }

    toggleSignUp(){
        this.setState({
            haveAccount: !this.state.haveAccount
        })
    }


    render(){
        return(
            <section className='auth-container'>
                <div className='signInUp'>
                    {this.state.haveAccount ? (
                        <div className='auth-form'>
                            <SignIn logUserIn={this.props.logUserIn}/>
                            <p>Don't have an account <span onClick={this.toggleSignUp}>SIGN UP</span></p>
                        </div>
                    ) : (
                        <div className='auth-form'>
                            <SignUp logUserIn={this.props.logUserIn}/>
                            <p>Already have an account <span onClick={this.toggleSignUp}>SIGN IN</span></p>
                        </div>
                    )}
                </div>
            </section>
        )
    }
}

export default SignInUpPage