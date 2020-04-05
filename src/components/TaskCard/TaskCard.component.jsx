import React from 'react'

import './taskCard.styles.css'

const TaskCard = (props) =>{
    return(
        <section className='task-display'>
            <div>
                {props.taskTitle}
            </div>
        </section>
    )
}

export default TaskCard