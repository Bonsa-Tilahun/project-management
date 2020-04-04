import React, { Component } from 'react'

import './projectPopUp.styles.css'
import Axios from 'axios'

class ProjectPopUp extends Component{
    constructor(){
        super()
        this.state ={
            projName:'',
            description:'',
            startDate: Date.now,
            endDate: Date.now
        }
        this.handleChange = this.handleChange.bind(this)
        this.saveProject = this.saveProject.bind(this)
    } 
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    saveProject(){
        console.log("heck yea: ", this.props.id)
        const id = this.props.id
        const newProj={
            userId: id,
            projName:this.state.projName,
            description:this.state.description ,
            startDate:this.state.startDate ,
            endDate: this.state.endDate
        }
        console.log(newProj)
        Axios.post('/api/projects', newProj).then(res =>{
            this.props.updateProjectsView(res.data)
            this.props.handleTogglePopUp()
        }).catch((err) => alert('Unable to save Project'))
    }
    
    render(){
        return (  
          <div className='popup'>  
              <div className='popup_inner'>  
                  <h1>Create your Project</h1> 
                  <label htmlFor="name">Name of Project
                      <input type="text" name="projName" id="name" onChange={this.handleChange}/>    
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
                  <button className='addbtn' onClick={this.saveProject}>Add Project</button>  
              </div>  
          </div>  
        );  
    }

  
  }  

  export default ProjectPopUp