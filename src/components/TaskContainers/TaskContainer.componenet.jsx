import React from 'react'

import './taskContainer.styles.css'
import TaskCard from '../TaskCard/TaskCard.component'
import taskAddBtn from '../../assets/icons8-add_new.png'

const TaskContainer = (props) =>{
    const tasks = props.taskList.map(task => <TaskCard 
                                                task={task}
                                                handleToggleEditPopUp={props.handleToggleEditPopUp}
                                            />)
    return(
        <section className='tasks-column'>
            <div className='tasks-column-title'>
                <img onClick={()=>props.handleToggleAddPopUp()} className='add-task-btn' src={taskAddBtn} alt="Add Task"/>
                <h3>{props.title}</h3>
            </div>
            <div className='tasks-column-task-list'>
                {tasks}
            </div>

        </section>
    )
}

export default TaskContainer