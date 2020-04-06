import React from 'react'

import './userIcon.styles.css'

const UserIcon = (props) => {
    return(
        <div onClick={()=>props.showSelectedUser(props.userId)} className='icon-container'>
            <div className='userIcon-container'>
                <img src={'https://robohash.org/' + props.userId + '?set=set2&size=60x60'} alt="UserIcon"/>
            </div>
            <p className='icon-userName'>{props.userName}</p>
        </div>
    )
}
export default UserIcon