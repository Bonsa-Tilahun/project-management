import React from 'react'

import './userIcon.styles.css'

const UserIcon = (props) => {
    return(
        <div className='userIcon-container'>
            <img src={'https://robohash.org/' + props.userId + '?set=set2&size=60x60'} alt="UserIcon"/>
        </div>
    )
}
export default UserIcon