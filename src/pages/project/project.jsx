import React from 'react'
import BackBtn from '../../assets/icons8-back_to.png'

import './project.css'
import ProjectDetails from '../../components/Project-Detail/ProjectDetail.component'

const ProjectPage =(props)=>{
    // const {proj} = props.proj
    // console.log(props)
    // console.log(props.proj)
    return (
        <div className='projectPage-containe'>
            <img className='backBtn' onClick={props.handleBackOp} src={BackBtn} alt="Back Button"/>
            <ProjectDetails proj={props.proj}/>

        </div>
    )
}

export default ProjectPage