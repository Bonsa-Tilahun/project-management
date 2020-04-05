import React, { Component } from 'react'

import './projectProgress.styles.css'
import TaskContainer from '../TaskContainers/TaskContainer.componenet'

class ProjectProgress extends Component{
    constructor(props){
        super(props)

        this.state = {
            addTask:false,
            editMode: false,
            projectTaskList: this.props.proj.projectTaskList
        }
    }


    render(){
        return(
            <section className='project-progress-section'>
            Project Tasks and progres
                <div className='tasks-status-container'>
                    <TaskContainer title='TO DO'/>
                    <TaskContainer title='IN PROGRESS'/>
                    <TaskContainer title='DONE'/>
                </div>
            </section>
        )
    }
}

export default ProjectProgress