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
        this.handleAddCollabsBtn = this.handleAddCollabsBtn.bind(this)
    }

    handleOnChange(e){
        this.setState({
            userName: e.target.value
        })
        Axios.get(`/api/users?userName=${this.state.userName}`).then(res => {
            this.setState({
                results:res.data
            })
        })
    }

    // getSearchResult(){

    // }

    handleSelection(userId){
        const index = this.state.results.findIndex(user => user.id === userId)
        const userInfo={
            id: this.state.results[index].id,
            userName: this.state.results[index].userName
        }
        this.setState({
            selectedUsers: [...this.state.selectedUsers, userInfo]
        })
    }

    handleCancelBtn(){
        this.props.handleTogglePopUp()
    }
    handleAddCollabsBtn(){
        this.props.handleAddCollabbb(this.props.userId, this.props.projId, this.state.selectedUsers)
        this.props.handleTogglePopUp()
    }

    render(){
        const selectedUsers = this.state.selectedUsers.map(user => <UserIcon userId={user.id}/>)
        const searchResult = this.state.results.map(user => {
            return <li className='searchResult-item' onClick={()=>this.handleSelection(user.id)}>
                {user.userName}
            </li>
        })
        return(
            <div className='popup'>  
              <div className='popup_inner'> 
                <div className='selectedUsers'>
                    {selectedUsers}
                </div>
                <div className='search-fied'>
                    <input placeholder='Search for Users' type="text" onChange={this.handleOnChange}/>
                </div>
                <ol className='searchResult-items'>
                    {searchResult}
                </ol>
                <button className='action-btn green' onClick={this.handleAddCollabsBtn}>ADD</button>
                <button className='action-btn red' onClick={this.handleCancelBtn}>CANCLE</button>
              </div>
            </div>
        )
    }
}

export default  AddCollabPopUp