import React from 'react'

import './deletedPopUp.styles.css'

const DeletedPopUp = (props) => {
    return(
        <div className='popup'>  
            <div className='popup_inner'>
                <img src={'https://robohash.org/' + props.userId + '?set=set2&size=200x200'} alt="UserIcon" alt=""/>
                <h1>YOU HAVE DELETED YOUR PROJECT</h1>
            </div>
        </div>
    )
}

export default DeletedPopUp