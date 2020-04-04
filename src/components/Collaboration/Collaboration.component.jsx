import React, { Component } from 'react'
import addBtn from '../../assets/icons8-add.png'

import './collaboration.styles.css'
import UserIcon from '../UserIcons/UserIcon.component'
import AddCollabPopUp from '../popup/AddCollabPopUp.component'

class Collaboration extends Component {
    constructor(){
        super()

        this.state={
            togglePopUp:false
        }
        this.handleTogglePopUp = this.handleTogglePopUp.bind(this)
    }

    handleTogglePopUp(){
        this.setState({
            togglePopUp: !this.state.togglePopUp
        })
        console.log()
    }

    render(){
        // const collabList = this.props.collabs.map(userId => <UserIcon userId={userId}/>)
        // console.log(collabList)
        return(
            <section className='collab-container'>
                <div className='collab-list'>
                {this.state.togglePopUp ?<AddCollabPopUp handleTogglePopUp={this.handleTogglePopUp}/>: null}
                    <img onClick={this.handleTogglePopUp} className='addCollabBtn' src={addBtn} alt="Add Button"/>
                    {this.props.collabs.length === 0? (
                        <div className='placeHolder-Info'>
                            NO COLLABORATORS FOUND! CLICK THE ADD BUTTON TO ADD
                        </div>
                    ): null}
                </div>
            </section>
        )
    }
}

export default Collaboration