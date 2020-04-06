let users = require('../database/data')
let projects = require('../database/projects')

let id = 0

module.exports = {
    createTasks: (req, res) => {
        const { userId, projId } = req.query
        const { newTask } = req.body
        const newTaskCreated = {...newTask, id }

        id++
        const userIndex = users.findIndex(user => user.id === +userId)
        if (userIndex === -1) {
            return res.status(404).send('Unable to find user')
        }
        const userProjIndex = users[userIndex].projects.findIndex(projectId => projectId === +projId)
        console.log("projedt list: ", users[userIndex].projects)
        if (userProjIndex === -1) {
            return res.status(404).send('Unable to find Project')
        }
        const projIndex = projects.findIndex(proj => proj.id === users[userIndex].projects[userProjIndex])
        projects[projIndex].projectTaskList.push(newTaskCreated)

        res.status(200).send(projects[projIndex].projectTaskList)
    },
    updateTasks: (req, res) => {
        const { userId, projId } = req.query
        const { updatedTask } = req.body
        const newupdatedTask = {...updatedTask }
        console.log("task: ", newupdatedTask)
        const userIndex = users.findIndex(user => user.id === +userId)
        if (userIndex === -1) {
            return res.status(404).send('Unable to find user')
        }
        const userProjIndex = users[userIndex].projects.findIndex(projectId => projectId === +projId)
        console.log("projedt list: ", users[userIndex].projects)
        if (userProjIndex === -1) {
            return res.status(404).send('Unable to find Project')
        }
        const projIndex = projects.findIndex(proj => proj.id === users[userIndex].projects[userProjIndex])
        const taskIndex = projects[projIndex].projectTaskList.findIndex(task => task.id === newupdatedTask.id)
        if (taskIndex === -1) {
            return res.status(404).send('Unable to find Task')
        }
        projects[projIndex].projectTaskList.splice(taskIndex, 1, newupdatedTask)
        res.status(200).send(projects[projIndex].projectTaskList)
    },
    deleteTask: (req, res) => {
        const { userId, projId, taskId } = req.query
        const userIndex = users.findIndex(user => user.id === +userId)
        if (userIndex === -1) {
            return res.status(404).send('Unable to find user')
        }
        const userProjIndex = users[userIndex].projects.findIndex(projectId => projectId === +projId)
        console.log("projedt list: ", users[userIndex].projects)
        if (userProjIndex === -1) {
            return res.status(404).send('Unable to find Project')
        }
        const projIndex = projects.findIndex(proj => proj.id === users[userIndex].projects[userProjIndex])
        const taskIndex = projects[projIndex].projectTaskList.findIndex(task => task.id === +taskId)
        if (taskIndex === -1) {
            return res.status(404).send('Unable to find Task')
        }
        projects[projIndex].projectTaskList.splice(taskIndex, 1)
        res.status(200).send(projects[projIndex].projectTaskList)
    }
}