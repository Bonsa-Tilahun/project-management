import React, { Component } from 'react'
import ProjectPopUp from '../../components/popup/ProjectPopUp.component'
import AddBtn from '../../assets/icons8-add.png'


import './home.css'
import Axios from 'axios'
import ProjectCard from '../../components/ProjectCard/ProjectCard.component'
import ProjectPage from '../project/project'
import DeletedPopUp from '../../components/popup/DeletedPopUp.component'

class HomePage extends Component{
    constructor(props){
        super(props)

        this.state ={
            togglePopUp: false,
            projects: this.props.project,
            colabrationProj: this.props.colabs,
            projSelected: false,
            currentProject:null,
            proj:null,
            deleted:false
        }
        this.handleTogglePopUp = this.handleTogglePopUp.bind(this)
        this.updateProjectsView = this.updateProjectsView.bind(this)
        this.handleOpenProject = this.handleOpenProject.bind(this)
        this.handleBackOp = this.handleBackOp.bind(this)
        this.handleAddCollab = this.handleAddCollab.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.toggleDeletedFlag = this.toggleDeletedFlag.bind(this)
        this.resetDeletedFlag = this.resetDeletedFlag.bind(this)
    
    }
    
    componentDidMount(){
        Axios.get(`/api/projects/${this.props.id}`).then(res => {
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

    toggleDeletedFlag(){
        this.setState({
            deleted: true
        })
        setTimeout(this.resetDeletedFlag, 3000)
    }
    resetDeletedFlag(){
        this.setState({
            deleted: false
        })
        this.componentDidMount()
    }
    handleTogglePopUp(){
            this.setState({
                togglePopUp: !this.state.togglePopUp
            })
    }

    handleAddCollab(userId, projId, collabUserList){
        const projIndex = this.state.colabrationProj.findIndex(collabs => collabs.projId === projId)

        console.log("proj index", projIndex)
        Axios.post(`/api/collaborators/${userId}`, {projId,collabUserList}).then(res =>{
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
        Axios.get(`/api/projects/project/${projId}`).then(res =>{
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
        return(
            <section className='homePage-container'>
                {this.state.projSelected? <ProjectPage 
                                                handleBackOp={this.handleBackOp} 
                                                colabs={this.state.colabrationProj} 
                                                userId={this.props.id} 
                                                proj={this.state.currentProject}
                                                handleAddCollab={this.handleAddCollab}
                                                handleTogglePopUp={this.handleTogglePopUp}
                                                togglePopUp={this.state.togglePopUp}
                                                refreshFn = {this.componentDidMount}
                                                toggleDeletedFlag={this.toggleDeletedFlag}
                                                
                                                />
                                                : 
                                                this.state.deleted?
                                                <DeletedPopUp userId={this.props.id}/> :
                                                
                (
                    <div>
                        <h1>My Projects</h1>
                        <img onClick={this.handleTogglePopUp} className='project-add' src={AddBtn} alt="Add project"/>
                        {this.state.togglePopUp ?
                        <ProjectPopUp proj={this.state.proj}  updateProjectsView={this.updateProjectsView} id={this.props.id} handleTogglePopUp={this.handleTogglePopUp}/>: null}
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