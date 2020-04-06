import React, { Component } from 'react'


import './projectDetail.styles.css'

class ProjectDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ...this.props.proj,
            
        }
        this.handleChange = this.handleChange.bind(this)
        this.markAsComplete = this.markAsComplete.bind(this)
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    markAsComplete(){
        const updatedProj = this.props.proj
        updatedProj.status = !updatedProj.status
        this.props.handleUpdatProject(updatedProj)
    }

    render(){
        return (
            <section className={`project-summary ${this.props.proj.status ? 'bottom-border' : ''}`}>
                <h1 className='sec-title'>{this.props.proj.projName}</h1>
                <div className='project-break-down'>
                    <div className='project-detail'>
                        <p className='sec-detail'>{`Start Date: ${this.props.proj.startDate}`}</p>
                        <p className='sec-detail'>{`End Date: ${this.props.proj.endDate}`}</p>
                    </div>
                    <div className='project-action'>
                        <button onClick={()=>this.props.handleTogglePopUp(this.props.proj)} className='action-btn yellow'>EDIT</button>
                        <button onClick={this.markAsComplete}className='action-btn green'>{this.props.proj.status ? 'MARK AS INCOMPLETE': 'MARK AS COMPLETE'}</button>
                        <button onClick={()=>this.props.handleDelete(this.props.proj.id)} className='action-btn red'>DELETE</button>
                    </div>
                </div>
            </section>
        )
    }
}

export default ProjectDetails