const express = require('express')
const userCrtl = require('./controllers/userCtrl')
const projCtrl = require('./controllers/projectsCtrl')
const PORT = 4005

const app = express()
app.use(express.json())
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`))
    //Users endpoint
app.post('/api/users', userCrtl.createUser)
app.get('/api/users', userCrtl.getUser)

//Projects endpoint
app.post('/api/projects', projCtrl.createProject)
app.get('/api/projects/:id', projCtrl.getAllProjects)
app.get('/api/projects/project/:id', projCtrl.getSingleProj)