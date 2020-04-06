import React from 'react'
import BackBtn from '../../assets/icons8-back_to.png'
import ProjectDetails from '../../components/Project-Detail/ProjectDetail.component'
import Collaboration from '../../components/Collaboration/Collaboration.component'
import ProjectProgress from '../../components/ProjectProgress/ProjectProgress.component'
import ProjectPopUp from '../../components/popup/ProjectPopUp.component'
import Axios from 'axios'
import './project.css'
import { Component } from 'react'

class ProjectPage extends Component{
    constructor(props){
        super(props)
        this.state={
            currentProject: this.props.proj,
            deleted: false
        }
        this.handleUpdatProject = this.handleUpdatProject.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.refreshAndGoBack = this.refreshAndGoBack.bind(this)
    }

    handleDelete(id){
        Axios.delete(`/api/projects/project?projId=${id}&userId=${this.props.userId}`).then(res => {
            this.setState({
                currentProject: res.data,
                delete:true
            })
            this.props.toggleDeletedFlag()
            this.props.handleBackOp()
        })
        
    }
    handleUpdatProject(proj){
        Axios.put(`/api/projects/project/${proj.id}`, proj).then(res => {
            this.setState({
                currentProject: res.data
            })
        })
        setTimeout(this.props.refreshFn, 1000);
        // this.props.refreshFn()
    }
    render(){
        return (
            <div className='projectPage-containe'>
                {this.props.togglePopUp ?
                            <ProjectPopUp proj={this.state.currentProject} handleUpdatProject={this.handleUpdatProject} handleTogglePopUp={this.props.handleTogglePopUp}/>: null}
                <img className='backBtn' onClick={this.props.handleBackOp} src={BackBtn} alt="Back Button"/>
                <ProjectDetails 
                    handleTogglePopUp={this.props.handleTogglePopUp} 
                    proj={this.state.currentProject}
                    handleDelete={this.handleDelete}
                    handleUpdatProject={this.handleUpdatProject}
                    />
                <Collaboration 
                    collabs={this.props.colabs} 
                    userId={this.props.userId}
                    handleAddCollab={this.props.handleAddCollab}
                    projId = {this.state.currentProject.id}
                />
                <ProjectProgress 
                    userId={this.props.userId}
                    proj={this.state.currentProject}
                    />
            </div>
                    // {/* // <div>
                    // //     <img src={'https://robohash.org/' + this.props.userId + '?set=set2&size=200x200'} alt="UserIcon" alt=""/>
                    // //     <h1>YOU HAVE DELETED YOUR PROJECT</h1>
                    // // </div> */}

        )
    }
}

export default ProjectPage