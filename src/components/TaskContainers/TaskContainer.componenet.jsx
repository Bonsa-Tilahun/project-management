import React from 'react'

import './taskContainer.styles.css'
import TaskCard from '../TaskCard/TaskCard.component'

const TaskContainer = (props) =>{
    return(
        <section className='tasks-column'>
            <div className='tasks-column-title'>
                <h3>{props.title}</h3>
            </div>
            <div className='tasks-column-task-list'>
                I am the Tasks list
                <TaskCard taskTitle='I love this'/>
                <TaskCard taskTitle='I love this'/>
                <TaskCard taskTitle='I love this'/>
                <TaskCard taskTitle='I love this'/>
                <TaskCard taskTitle='I love this'/>
                <TaskCard taskTitle='I love this'/>
                <TaskCard taskTitle='I love this'/>
                <TaskCard taskTitle='I love this'/>
            </div>

        </section>
    )
}

export default TaskContainer