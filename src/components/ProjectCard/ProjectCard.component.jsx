import React from 'react'

import './project.styles.css'

const ProjectCard = (props) => {
    return(
        <div onClick={()=>props.handleOpenProject(props.project.id)} className='card-component'>
            <div className='projName'>
                <h4>Project Name:</h4>
                <h3>{props.project.projName}</h3>
            </div>
            <div className='proj-details'>
                <h4>Description:</h4>
                <p>{props.project.description}</p>
                <h4>Start Date:</h4>
                <p>{props.project.startDate}</p>
                <h4>End Date:</h4>
                <p>{props.project.endDate}</p>
            </div>
        </div>
    )
}
export default ProjectCard