import React, { Component } from 'react'
import addBtn from '../../assets/icons8-add.png'
import axios from 'axios'

import './collaboration.styles.css'
import UserIcon from '../UserIcons/UserIcon.component'
import AddCollabPopUp from '../popup/AddCollabPopUp.component'

class Collaboration extends Component {
    constructor(props){
        super(props)

        this.state={
            togglePopUp:false,
            currentProjCollabs: this.props.collabs
        }
        this.handleTogglePopUp = this.handleTogglePopUp.bind(this)
        // this.componentDidMount = this.componentDidMount.bind(this)
        // this.handleAddCollab = this.handleAddCollab.bind(this)
    }

    // componentDidMount(){
    //     axios.get(`api/collaborators?projId=${this.props.projId}&userId=${this.props.userId}`).then(res => {
    //         console.log("#######################collab users: ", res.data)
    //         this.setState({
    //             currentProjCollabs: [res.data]
    //         })
    //     })
    // }
    // handleAddCollab(userId, projId, collabUserList){
    //     // console.log("hanlde add collab bt: ", userId, collabUserList)
    //     axios.post(`/api/collaborators/${userId}`, {projId,collabUserList}).then(res =>{
    //         console.log("hanlde add collab bt: ", res.data)
    //         this.setState({
    //             currentProjCollabs: res.data
    //         })
    //     })
    // }

    handleTogglePopUp(){
        this.setState({
            togglePopUp: !this.state.togglePopUp
        })
        console.log()
    }

    render(){
        const currentProjCollabsIndex = this.state.currentProjCollabs.findIndex(collabProj => collabProj.projId === this.props.projId)

        console.log("i am here : ", this.props.collabs )
        // const collabList = currentProjCollabsIndex === -1 ? []: this.state.currentProjCollabs[currentProjCollabsIndex].collabUserList.map(collab => <UserIcon userName={collab.userName} userId={collab.id}/>)
        const collabList = this.props.collabs.map(collab => <UserIcon userName={collab.userName} userId={collab.id}/>)
        console.log(collabList)
        return(
            <section className='collab-container'>
                <div className='collab-list'>
                {this.state.togglePopUp ?
                    <AddCollabPopUp 
                        handleAddCollab={this.props.handleAddCollab} 
                        handleTogglePopUp={this.handleTogglePopUp}
                        userId={this.props.userId}
                        projId={this.props.projId}
                        refresh={this.componentDidMount}
                    /> : null}
                    <img onClick={this.handleTogglePopUp} className='addCollabBtn' src={addBtn} alt="Add Button"/>
                    {this.props.collabs.length === 0? (
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