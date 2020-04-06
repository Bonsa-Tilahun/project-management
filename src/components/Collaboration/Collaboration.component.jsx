import React, { Component } from 'react'
import addBtn from '../../assets/icons8-add.png'
import axios from 'axios'

import './collaboration.styles.css'
import UserIcon from '../UserIcons/UserIcon.component'
import AddCollabPopUp from '../popup/AddCollabPopUp.component'
import DeletedPopUp from '../popup/DeletedPopUp.component'

class Collaboration extends Component {
    constructor(props){
        super(props)

        this.state={
            togglePopUp:false,
            currentProjCollabs: this.props.collabs,
            toggleUser: false,
            seletedUser:null
        }
        this.handleTogglePopUp = this.handleTogglePopUp.bind(this)
        this.showSelectedUser = this.showSelectedUser.bind(this)
        this.handleToggleUser = this.handleToggleUser.bind(this)
        this.handleRemoveCollaborator = this.handleRemoveCollaborator.bind(this)
        this.handleAddCollabbb = this.handleAddCollabbb.bind(this)
    }
    showSelectedUser(id){
        axios.get(`/api/users/user/${id}`).then(res => {
            this.setState({
                seletedUser: res.data,
                toggleUser:true
            })
        })
    }
    handleToggleUser(){
        this.setState({
            toggleUser: !this.state.toggleUser
        })
    }
    handleTogglePopUp(){
        this.setState({
            togglePopUp: !this.state.togglePopUp
        })
    }
    handleRemoveCollaborator(tobeDeleteUserId){
        axios.delete(`/api/collaborators?userId=${this.props.userId}&tobeDeleteUserId=${tobeDeleteUserId}&projId=${this.props.projId}`).then(res =>{
            this.setState({
                currentProjCollabs: res.data
            })
        })
        this.handleToggleUser()
        this.props.refreshFn()
    }
    handleAddCollabbb(userId, projId, collabUserList){
        
        axios.post(`/api/collaborators/${userId}`, {projId,collabUserList}).then(res =>{
            console.log("HHHHHHHHHHH: ", res.data)
            this.setState({
                currentProjCollabs: res.data
            })
        })
        this.props.refreshFn()
    }

    render(){

        const currentProjCollabsIndex = this.state.currentProjCollabs.findIndex(collabProj => collabProj.projId === this.props.projId)


        const collabList = currentProjCollabsIndex == -1 ? []: 
        this.state.currentProjCollabs[currentProjCollabsIndex].collabUserList.map(collab => <UserIcon showSelectedUser={this.showSelectedUser} userName={collab.userName} userId={collab.id}/>)
        // const collabList = this.props.collabs.collabUserList.map(collab => <UserIcon userName={collab.userName} userId={collab.id}/>)

        return(
            <section className='collab-container'>
                <div className='collab-list'>
                {this.state.toggleUser ? 
                    <DeletedPopUp 
                        handleRemoveCollaborator={this.handleRemoveCollaborator} 
                        handleToggleUser={this.handleToggleUser} 
                        toggleUser={this.state.toggleUser} 
                        userName={this.state.seletedUser.userName} 
                        userId={this.state.seletedUser.id}
                        
                    />:
                    null}
                {this.state.togglePopUp ?
                    <AddCollabPopUp 
                    handleAddCollabbb={this.handleAddCollabbb} 
                        handleTogglePopUp={this.handleTogglePopUp}
                        userId={this.props.userId}
                        projId={this.props.projId}
                        refresh={this.props.refreshFn}
                    /> : null}
                    <img onClick={this.handleTogglePopUp} className='addCollabBtn' src={addBtn} alt="Add Button"/>
                    {currentProjCollabsIndex === -1 || this.state.currentProjCollabs[currentProjCollabsIndex].collabUserList.length === 0 ? (
                        <div className='placeHolder-Info'>
                            NO COLLABORATORS FOUND! CLICK THE ADD BUTTON TO ADD
                        </div>
                    ): (
                        <div className='callab-users'>
                            {collabList}
                        </div>
                    )}
                </div>
            </section>
        )
    }
}

export default Collaboration