import React from 'react'

import './deletedPopUp.styles.css'

const DeletedPopUp = (props) => {
    return(
        <div className='popup'>  
            <div className='popup_inner'>
                {props.toggleUser ? 
                    <div>
                        <img src={'https://robohash.org/' + props.userId + '?set=set2&size=200x200'} alt="UserIcon" alt=""/>
                        <h1>{props.userName}</h1>
                        <div className='actionBtn-section'>
                            <button onClick={()=>props.handleRemoveCollaborator(props.userId)} className='action-btn red'>REMOVE</button>
                            <button onClick={()=>props.handleToggleUser()} className='action-btn yellow'>CANCLE</button>
                        </div>
                    </div>:
                    <div>
                        <img src={'https://robohash.org/' + props.userId + '?set=set2&size=200x200'} alt="UserIcon" alt=""/>
                        <h1>YOU HAVE DELETED YOUR PROJECT</h1>
                    </div>
                }
            </div>
        </div>
    )
}

export default DeletedPopUp