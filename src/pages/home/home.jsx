import React, { Component } from 'react'
import ProjectPopUp from '../../components/popup/ProjectPopUp.component'
import AddBtn from '../../assets/icons8-add.png'


import './home.css'
import Axios from 'axios'
import ProjectCard from '../../components/ProjectCard/ProjectCard.component'
import ProjectPage from '../project/project'

class HomePage extends Component{
    constructor(props){
        super(props)

        this.state ={
            togglePopUp: false,
            projects: this.props.project,
            colabrationProj: this.props.colabs,
            projSelected: false,
            currentProject:null
        }
        this.handleTogglePopUp = this.handleTogglePopUp.bind(this)
        this.updateProjectsView = this.updateProjectsView.bind(this)
        this.handleOpenProject = this.handleOpenProject.bind(this)
        this.handleBackOp = this.handleBackOp.bind(this)
        this.handleAddCollab = this.handleAddCollab.bind(this)
    
    }
    
    componentDidMount(){
        Axios.get(`/api/projects/${this.props.id}`).then(res => {
            console.log("oncomponentdidmount: ",res.data)
            this.setState({
                projects: res.data
            })
        })
    }

    updateProjectsView(newProjArr){
        this.setState({
            projects: newProjArr
        })
    }

    handleTogglePopUp(){
        this.setState({
            togglePopUp: !this.state.togglePopUp
        })
    }

    handleAddCollab(userId, projId, collabUserList){
        console.log("hanlde add collab bt: ", userId, collabUserList)
        const projIndex = this.state.colabrationProj.findIndex(collabs => collabs.projId === projId)

        console.log("proj index", projIndex)
        Axios.post(`/api/collaborators/${userId}`, {projId,collabUserList}).then(res =>{
            console.log("hanlde add collab bt: ", res.data)
            this.setState({
                colabrationProj: res.data
            })
        })
    }

    handleBackOp(){
        this.setState({
            projSelected: !this.state.projSelected
        })
    }

    handleOpenProject(projId){
        console.log("projId: ", projId)
        Axios.get(`/api/projects/project/${projId}`).then(res =>{
            console.log(res.data)
            this.setState({
                currentProject: res.data,
                projSelected: !this.state.projSelected
            })
            
        }).catch(()=> alert('Unable to get project'))
    }

    render(){
        let i =0
        const projs = this.state.projects.map(project => (
            <ProjectCard key={i++} handleOpenProject={this.handleOpenProject} project={project}/>
        ))
        console.log("projs: ", projs)
        return(
            <section className='homePage-container'>
                {this.state.projSelected? <ProjectPage 
                                                handleBackOp={this.handleBackOp} 
                                                colabs={this.state.colabrationProj} 
                                                userId={this.props.id} 
                                                proj={this.state.currentProject}
                                                handleAddCollab={this.handleAddCollab}
                                            />:
                (
                    <div>
                        <h1>My Projects</h1>
                        <img onClick={this.handleTogglePopUp} className='project-add' src={AddBtn} alt="Add project"/>
                        {this.state.togglePopUp ?
                        <ProjectPopUp updateProjectsView={this.updateProjectsView} id={this.props.id} handleTogglePopUp={this.handleTogglePopUp}/>: null}
                        <div className='myProjects-list'>
                            {projs}
                        </div>
                    </div>
                )}     
            </section>
        )
    }
}

export default HomePage