import React from 'react'
import {ReactComponent as Logo} from '../../assets/crown.svg'

import './header.css'

const Header = (props)=>{
    return (
        <section className='header-container'>
            <Logo/>
            {props.loggedIn ? (
                <div className='header-loginInfo'>
                    <div className="loginInfo-sub">
                        {props.userName}
                    </div>
                    <div onClick={props.logUserIn} className='loginInfo-sub'>
                        SIGN OUT
                    </div>
                </div>
            ): (
                <div>
                    SIGN IN
                </div>
            )}
        </section>
    )
}

export default Header