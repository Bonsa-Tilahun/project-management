import React from 'react'

import './taskCard.styles.css'

const TaskCard = (props) =>{
    return(
        <section onClick={()=>props.handleToggleEditPopUp(props.task)} className='task-display'>
            <div className='task-title'>
                {props.task.taskTitle}
            </div>
            <div className='task-desc'>
                {props.task.taskDesctription}
            </div>
        </section>
    )
}

export default TaskCard