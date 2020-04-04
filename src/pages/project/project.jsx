import React from 'react'
import BackBtn from '../../assets/icons8-back_to.png'

import './project.css'
import ProjectDetails from '../../components/Project-Detail/ProjectDetail.component'
import Collaboration from '../../components/Collaboration/Collaboration.component'

const ProjectPage =(props)=>{
    return (
        <div className='projectPage-containe'>
            <img className='backBtn' onClick={props.handleBackOp} src={BackBtn} alt="Back Button"/>
            {/* <h1>Project tracker</h1> */}
            <ProjectDetails proj={props.proj}/>
            <Collaboration 
                    collabs={props.colabs} 
                    userId={props.userId}
                    handleAddCollab={props.handleAddCollab}/>

        </div>
    )
}

export default ProjectPage