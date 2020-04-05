let projects = require('../database/projects')
let users = require('../database/data')
let id = 0

module.exports = {
    createProject: (req, res) => {
        console.log(req.body)
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
        // const returnProjects = users[index].projects.filter(projId => {
        //     console.log("project[0]: ", projects[0].id === projId)
        //     console.log(projId)
        //     if (projects[0].id === projId) {
        //         console.log("project[0]: ", projects[0])
        //         return projects[0]
        //     }
        // })
        // console.log(returnProjects)
        res.status(200).send(returnArr)
    },
    //all projects for given person
    getAllProjects: (req, res) => {
        //id is userId
        console.log(req.params)
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
        console.log(id)
        const proj = projects.find(project => project.id === +id)
        res.status(200).send(proj)
    }
}