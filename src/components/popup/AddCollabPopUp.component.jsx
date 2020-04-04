import React, { Component } from 'react'

import './addCollabPopUp.styles.css'
import Axios from 'axios'
import UserIcon from '../UserIcons/UserIcon.component'

class AddCollabPopUp extends Component{
    constructor(){
        super()

        this.state={
            userName:'',
            results:[],
            selectedUsers:[]
        }
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleCancelBtn = this.handleCancelBtn.bind(this)
    }

    handleOnChange(e){
        Axios.get(`/api/users?userName=${this.state.userName}`).then(res => {
            this.setState({
                results:res.data
            })
        })
    }

    handleSelection(){

    }

    handleCancelBtn(){
        this.props.handleTogglePopUp()
    }

    render(){
        const selectedUsers = this.state.selectedUsers.map(user => <UserIcon userId={user.id}/>)
        return(
            <div className='popup'>  
              <div className='popup_inner'> 
                <div className='selectedUsers'>
                    {selectedUsers}
                </div>
                <div className='search-fied'>
                    <input placeholder='Search for Users' type="text" onChange={this.handleOnChange}/>
                </div>
                <button>ADD</button>
                <button onClick={this.handleCancelBtn}>CANCLE</button>
              </div>
            </div>
        )
    }
}

export default  AddCollabPopUp