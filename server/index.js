const express = require('express')
const userCrtl = require('./controllers/userCtrl')
const projCtrl = require('./controllers/projectsCtrl')
const PORT = 4005

const app = express()
app.use(express.json())
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`))
    //Users endpoint
app.post('/api/users', userCrtl.createUser) //used when creating user
app.get('/api/users/user', userCrtl.getUser) //used when loggin in


//Projects endpoint
app.post('/api/projects', projCtrl.createProject)
app.get('/api/projects/:id', projCtrl.getAllProjects)
app.get('/api/projects/project/:id', projCtrl.getSingleProj)