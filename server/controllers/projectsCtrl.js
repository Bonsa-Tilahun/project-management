let projects = require('../database/projects')
let users = require('../database/data')
let id = 0

module.exports = {
    createProject: (req, res) => {
        const { userId, projName, description, startDate, endDate, projectTaskList } = req.body
        const index = users.findIndex(user => user.id === +userId)
        const newProject = {
            id,
            projName,
            description,
            startDate,
            endDate,
            projectTaskList,
            status: false
        }
        projects.push(newProject)
        users[index].projects.push(id)
        id++
        const returnArr = []
        for (const projId of users[index].projects) {
            let i = projects.findIndex(proj => proj.id === projId)
            returnArr.push(projects[i])
        }
        res.status(200).send(returnArr)
    },
    //all projects for given person
    getAllProjects: (req, res) => {
        //id is userId
        const { id } = req.params
        const index = users.findIndex(user => user.id === +id)
        const returnArr = []
        for (const projId of users[index].projects) {
            let i = projects.findIndex(proj => proj.id === projId)
            returnArr.push(projects[i])
        }
        res.status(200).send(returnArr)

    },
    getSingleProj: (req, res) => {
        const { id } = req.params
        const proj = projects.find(project => project.id === +id)
        res.status(200).send(proj)
    },
    updateProject: (req, res) => {
        const { id } = req.params
        const projIndex = projects.findIndex(project => project.id === +id)
        if (projIndex === -1) {
            return res.status(404).send("Unable to find project to update")
        }
        projects.splice(projIndex, 1, req.body)
        res.status(200).send(projects[projIndex])
    },
    deleteProject: (req, res) => {
        const { userId, projId } = req.query
        const projIndex = projects.findIndex(project => project.id === +projId)
        const userIndex = users.findIndex(user => user.id === +userId)
            // console.log(userIndex, projIndex)
        if (projIndex === -1 || userIndex === -1) {
            return res.status(404).send("Unable to find project to delete")
        }
        const deletedProj = projects[projIndex]

        const userProjectIndex = users[userIndex].projects.findIndex(projId => projId === deletedProj.id)
        users[userIndex].projects.splice(userProjectIndex, 1)
        projects.splice(projIndex, 1)
        res.status(200).send(deletedProj)
    }
}