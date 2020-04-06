import React from 'react'

import './project.styles.css'

const ProjectCard = (props) => {
    return(
        <div onClick={()=>props.handleOpenProject(props.project.id)} className={`card-component ${props.project.status ? 'completed-box-shadow':''}`}>
            <div className='projName'>
                <h4>Project Name:</h4>
                <h3>{props.project.projName}</h3>
            </div>
            <div className='proj-details'>
                <div className='proj-desc'>
                    <h4>Description:</h4>
                    <p>{props.project.description}</p>
                </div>
                <div className='proj-str-date'>
                    <h4>Start Date:</h4>
                    <p>{props.project.startDate}</p>
                </div>
                <div className='proj-end-date'>
                    <h4>End Date:</h4>
                    <p>{props.project.endDate}</p>
                </div>
                
            </div>
        </div>
    )
}
export default ProjectCard