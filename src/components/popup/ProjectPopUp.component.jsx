import React, { Component } from 'react'

import './projectPopUp.styles.css'
import Axios from 'axios'

class ProjectPopUp extends Component{
    constructor(props){
        super(props)
        console.log("project popup props: ", this.props.proj)
        this.state ={
            projName: ( this.props.proj === null) ?'': this.props.proj.projName,
            description: ( this.props.proj === null) ?'': this.props.proj.description,
            startDate: ( this.props.proj === null) ?'': this.props.proj.startDate,
            endDate: ( this.props.proj === null) ?'': this.props.proj.endDate,
            projectTaskList: ( this.props.proj === null) ?'': this.props.proj.projectTaskList,
            status: this.props.proj === null ? false : this.props.proj.status,
            editMode: ( this.props.proj === null) ? false : true
        }
        this.handleChange = this.handleChange.bind(this)
        this.saveProject = this.saveProject.bind(this)
        this.updateProject = this.updateProject.bind(this)
    } 
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updateProject(){
      console.log("i was triggered?")
      const projId = this.props.proj.id
      const updatedProj={
        id:projId,
        projName:this.state.projName,
        description:this.state.description ,
        startDate:this.state.startDate ,
        endDate: this.state.endDate,
        projectTaskList:this.state.projectTaskList,
        status: this.state.status
      }
      console.log("i got to the update proj")
      this.props.handleUpdatProject(updatedProj)
      this.props.handleTogglePopUp()
    }

    saveProject(){
      console.log("i waz also triggered???")
        const userId = this.props.id
        const newProj={
            userId: userId,
            projName:this.state.projName,
            description:this.state.description ,
            startDate:this.state.startDate ,
            endDate: this.state.endDate,
            projectTaskList:[],
            status: false
        }
        console.log(newProj)
        Axios.post('/api/projects', newProj).then(res =>{
            this.props.updateProjectsView(res.data)
            this.props.handleTogglePopUp()
        }).catch((err) => alert('Unable to save Project'))
    }
    
    render(){
      console.log("Hello, this is the proj: ", this.props.proj)
        return (  
          <div className='popup'>  
          {this.state.editMode ? 
              <div className='popup_inner'>  
                    <h1>Create your Project</h1> 
                    Thiiiiiiisss is the edit mode
                    <label htmlFor="name">Name of Project
                      <input 
                        value={this.state.projName}
                        type="text" name="projName" id="name" onChange={this.handleChange}/>    
                    </label> 
                    <label htmlFor="description"> Project Description
                      <input 
                        value={this.state.description}
                        type="textarea" name="description" id="description" onChange={this.handleChange}/>    
                    </label> 
                    <label htmlFor="startDate">Start Date
                      <input 
                        value={this.state.startDate}
                        type="date" name="startDate" id="startDate" onChange={this.handleChange}/>    
                    </label> 
                    <label htmlFor="endDate">End Date
                      <input 
                        value={this.state.endDate}
                        type="date" name="endDate" id="endDate" onChange={this.handleChange}/>    
                    </label> 
                    
                    <div className='action-button-section'>
                        <button className='action-btn green' onClick={this.updateProject}>UPDATE PROJECT</button>  
                        <button className='action-btn red' onClick={()=>this.props.handleTogglePopUp()}>CANCLE</button>  
                    </div> 
              </div>  
              : 
              <div className='popup_inner'>  
                    <h1>Create your Project</h1> 
                    <label htmlFor="name">Name of Project
                      <input
                         type="text" name="projName" id="name" onChange={this.handleChange}/>    
                    </label> 
                    <label htmlFor="description"> Project Description
                      <input type="textarea" name="description" id="description" onChange={this.handleChange}/>    
                    </label> 
                    <label htmlFor="startDate">Start Date
                      <input type="date" name="startDate" id="startDate" onChange={this.handleChange}/>    
                    </label> 
                    <label htmlFor="endDate">End Date
                      <input type="date" name="endDate" id="endDate" onChange={this.handleChange}/>    
                    </label>
                    <div className='action-button-section'>
                        <button className='action-btn green' onClick={this.saveProject}>ADD PROJECT</button>  
                        <button className='action-btn red' onClick={()=>this.props.handleTogglePopUp()}>CANCLE</button>  
                    </div> 
              </div>  
          }
          </div>  
        );  
    }

  
  }  

  export default ProjectPopUp