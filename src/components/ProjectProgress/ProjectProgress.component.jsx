import React, { Component } from 'react'

import './projectProgress.styles.css'
import TaskContainer from '../TaskContainers/TaskContainer.componenet'
import TaskCardPopUp from '../popup/TaskCardPopUp.component'


class ProjectProgress extends Component{
    constructor(props){
        super(props)

        this.state = {
            addTask:false,
            editMode: false,
            addMode: false,
            projectTaskList: this.props.proj.projectTaskList,
            selectedTask: null
        }
        this.handleAddTask = this.handleAddTask.bind(this)
        this.handleEditTask = this.handleEditTask.bind(this)
        this.handleToggleAddPopUp= this.handleToggleAddPopUp.bind(this)
        this.handleToggleEditPopUp=this.handleToggleEditPopUp.bind(this)
    }
    
    handleAddTask(taskList){
        this.setState({
            projectTaskList: taskList,
            addMode: !this.state.addMode
        })
        
    }
    handleEditTask(editedTaskList){
        this.setState({
            projectTaskList: editedTaskList,
            editMode: !this.state.editMode,
            selectedTask:null
        })
        
    }
    handleToggleAddPopUp(){
        this.setState({
            addMode: !this.state.addMode
        })
    }
    handleToggleEditPopUp(selectedTask){
        console.log("slected task val: ", selectedTask)
        this.setState({
            selectedTask: typeof selectedTask === 'undefined'? null: selectedTask,
            editMode: !this.state.editMode
        })
    }

    render(){
        const toDoTasks = this.state.projectTaskList.filter(task => task.taskStatus === 'TODO')
        const inProgressTask = this.state.projectTaskList.filter(task => task.taskStatus === 'IN-PROGRESS')
        const doneTask = this.state.projectTaskList.filter(task => task.taskStatus === 'DONE')
        return(
            <section className='project-progress-section'>
                {this.state.addMode || this.state.editMode ? 
                    <TaskCardPopUp 
                        selectedTask={this.state.selectedTask}
                        userId={this.props.userId}
                        projId={this.props.proj.id}
                        editMode={this.state.editMode} 
                        handleToggleAddPopUp={this.handleToggleAddPopUp} 
                        handleToggleEditPopUp={this.handleToggleEditPopUp}
                        handleEditTask={this.handleEditTask}
                        handleAddTask={this.handleAddTask}/> :
                <div className='tasks-status-container'>
                    {/* Project Tasks and progres */}
                    <TaskContainer 
                        handleToggleAddPopUp={this.handleToggleAddPopUp} 
                        handleToggleEditPopUp={this.handleToggleEditPopUp}
                        handleEditTask={this.handleEditTask}
                        handleAddTask={this.handleAddTask}
                        taskList={toDoTasks} title='TO DO'/>
                    <TaskContainer 
                        handleToggleAddPopUp={this.handleToggleAddPopUp}
                        handleToggleEditPopUp={this.handleToggleEditPopUp}
                        handleEditTask={this.handleEditTask}
                        handleAddTask={this.handleAddTask}
                        taskList={inProgressTask} title='IN PROGRESS'/>
                    <TaskContainer 
                        handleToggleAddPopUp={this.handleToggleAddPopUp} 
                        handleToggleEditPopUp={this.handleToggleEditPopUp}
                        handleEditTask={this.handleEditTask}
                        handleAddTask={this.handleAddTask}
                        taskList={doneTask} title='DONE'/>
                </div>
                }
            </section>
        )
    }
}

export default ProjectProgress