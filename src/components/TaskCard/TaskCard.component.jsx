import React from 'react'

import './taskCard.styles.css'

const TaskCard = (props) =>{
    return(
        <section onClick={()=>props.handleToggleEditPopUp(props.task)} className='task-display'>
            <div>
                {props.task.taskTitle}
                hello
            </div>
        </section>
    )
}

export default TaskCard