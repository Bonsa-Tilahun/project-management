import React, { Component } from 'react'

import './projectPopUp.styles.css'
import axios from 'axios'


class TaskCardPopUp extends Component{
    constructor(props){
        super(props)
        console.log("selected User value everytime: ", this.props.selectedTask)
        this.state ={
            taskTitle: ( this.props.selectedTask === null || typeof this.props.selectedTask === 'undefined') ?'': this.props.selectedTask.taskTitle,
            taskDesctription: ( this.props.selectedTask === null || typeof this.props.selectedTask === 'undefined') ?'': this.props.selectedTask.taskDesctription,
            taskStatus: ( this.props.selectedTask === null || typeof this.props.selectedTask === 'undefined') ?'': this.props.selectedTask.startDate,
            editMode: ( this.props.selectedTask === null) ? false : true
        }
        this.handleChange = this.handleChange.bind(this)
        this.saveProject = this.saveProject.bind(this)
        this.updateTask = this.updateTask.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
    } 

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value

        })
    }
   
    saveProject(){
        console.log("I am hating this: ", this.state.taskStatus)
        const newTask={
            taskTitle: this.state.taskTitle,
            taskDesctription:this.state.taskDesctription,
            taskStatus:this.state.taskStatus ||'TODO' 
        }
        // Axios.delete(`/api/projects/pr`)
        axios.post(`/api/tasks?userId=${this.props.userId}&projId=${this.props.projId}`, {newTask}).then(res =>{
            console.log("my new task list: ", res.data)
            if(this.state.editMode){
                this.props.handleEditTask(res.data)
            }else{
                console.log("i am in editmode check")
                this.props.handleAddTask(res.data)
            }
            
        })

    }

    updateTask(){

        const updatedTask={
            id: this.props.selectedTask.id,
            taskTitle: this.state.taskTitle,
            taskDesctription:this.state.taskDesctription,
            taskStatus:this.state.taskStatus
        }
        console.log("-------------------", this.state.taskStatus)
        axios.put(`/api/tasks?userId=${this.props.userId}&projId=${this.props.projId}`, {updatedTask}).then(res =>{
            console.log("my new task list: ", res.data)
            if(this.state.editMode){
                this.props.handleEditTask(res.data)
            }else{
                console.log("i am in editmode check")
                this.props.handleAddTask(res.data)
            }
            
        })
    }

    deleteTask(){
        axios.delete(`/api/tasks?userId=${this.props.userId}&projId=${this.props.projId}&taskId=${this.props.selectedTask.id}`).then(res =>{
            console.log("my new task list: ", res.data)
            if(this.state.editMode){
                this.props.handleEditTask(res.data)
            }else{
                console.log("i am in editmode check")
                this.props.handleAddTask(res.data)
            }
            
        })
    }
    
    render(){
        return (  
          <div className='popup'>  
          {this.state.editMode ? 
              <div className='popup_inner'>  
                    <h1>Create your Task</h1> 
                    <label htmlFor="taskTitle">Task Title
                      <input 
                        value={this.state.taskTitle}
                        type="text" name="taskTitle" id="taskTitle" onChange={this.handleChange}/>    
                    </label> 
                    <label htmlFor="taskDesctription"> Task Description
                      <input 
                        value={this.state.taskDesctription}
                        type="textarea" name="taskDesctription" id="taskDesctription" onChange={this.handleChange}/>    
                    </label> 
                    <label htmlFor="taskStatus">State
                        <select name="taskStatus" id="taskStatus" value={this.state.taskStatus} onChange={this.handleChange}>
                            <option value='TODO'>TODO</option>
                            <option value='IN-PROGRESS'>IN-PROGRESS</option>
                            <option value='DONE'>DONE</option>
                        </select>
                    </label>
                    
                    <div className='action-button-section'>
                        <button className='action-btn green' onClick={this.updateTask}>UPDATE TASK</button>  
                        <button className='action-btn yellow' onClick={()=>this.props.handleToggleEditPopUp()}>CANCLE</button>  
                        <button className='action-btn red' onClick={this.deleteTask}>DELETE</button>  
                    </div> 
              </div>  
              : 
              <div className='popup_inner'>  
                    <h1>Create your Task</h1> 
                    <label htmlFor="taskTitle">Task Title
                      <input 
                        value={this.state.taskTitle}
                        type="text" name="taskTitle" id="taskTitle" onChange={this.handleChange}/>    
                    </label> 
                    <label htmlFor="taskDesctription"> Task Description
                      <input 
                        value={this.state.taskDesctription}
                        type="textarea" name="taskDesctription" id="taskDesctription" onChange={this.handleChange}/>    
                    </label> 
                    <label htmlFor="taskStatus">State
                        <select name="taskStatus" id="taskStatus" value={this.state.taskStatus} onChange={this.handleChange}>
                            <option value='TODO'>TODO</option>
                            <option value='IN-PROGRESS'>IN-PROGRESS</option>
                            <option value='DONE'>DONE</option>
                        </select>
                    </label>
                    
                    <div className='action-button-section'>
                        <button className='action-btn green' onClick={this.saveProject}>CREATE TASK</button>  
                        <button className='action-btn red' onClick={()=>this.props.handleToggleAddPopUp()}>CANCLE</button>  
                    </div> 
              </div> 
          }
          </div>  
        );  
    }

  
  }  

  export default TaskCardPopUp