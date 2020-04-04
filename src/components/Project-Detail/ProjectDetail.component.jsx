import React, { Component } from 'react'


import './projectDetail.styles.css'

class ProjectDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ...this.props.proj,
            editMode: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        return (
            <section className='project-summary'>
                <h1 className='sec-title'>{this.props.proj.projName}</h1>
                <div className='project-break-down'>
                    <div className='project-detail'>
                        <p className='sec-detail'>{`Start Date: ${this.props.proj.startDate}`}</p>
                        <p className='sec-detail'>{`End Date: ${this.props.proj.endDate}`}</p>
                    </div>
                    <div className='project-action'>
                        <button className='action-btn yellow'>EDIT</button>
                        <button className='action-btn green'>MARK AS COMPLETE</button>
                        <button className='action-btn red'>DELETE</button>
                    </div>
                </div>
            </section>
        )
    }
}

export default ProjectDetails