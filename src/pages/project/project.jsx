import React from 'react'
import BackBtn from '../../assets/icons8-back_to.png'
import ProjectDetails from '../../components/Project-Detail/ProjectDetail.component'
import Collaboration from '../../components/Collaboration/Collaboration.component'
import ProjectProgress from '../../components/ProjectProgress/ProjectProgress.component'
import './project.css'

const ProjectPage =(props)=>{
    return (
        <div className='projectPage-containe'>
            <img className='backBtn' onClick={props.handleBackOp} src={BackBtn} alt="Back Button"/>
            <ProjectDetails proj={props.proj}/>
            <Collaboration 
                collabs={props.colabs} 
                userId={props.userId}
                handleAddCollab={props.handleAddCollab}
                projId = {props.proj.id}
            />
            <ProjectProgress 
                userId={props.userId}
                proj={props.proj}
            />

        </div>
    )
}

export default ProjectPage