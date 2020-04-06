const express = require('express')
const userCrtl = require('./controllers/userCtrl')
const projCtrl = require('./controllers/projectsCtrl')
const collabCtrl = require('./controllers/collaborationCtrl')

const PORT = 4005

const app = express()
app.use(express.json())
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`))
    //Users endpoint
app.post('/api/users', userCrtl.createUser) //used when creating user
app.get('/api/users/user', userCrtl.getUser) //used when loggin in
app.get('/api/users', userCrtl.getUsers) //used to return user search results


//Projects endpoint
app.post('/api/projects', projCtrl.createProject) //used for creating project
app.get('/api/projects/:id', projCtrl.getAllProjects) //given userId, retrieve all of their projects
app.get('/api/projects/project/:id', projCtrl.getSingleProj) //given projId, retrieve the project
app.put('/api/projects/project/:id', projCtrl.updateProject) //given projId, updates the project
app.delete('/api/projects/project/', projCtrl.deleteProject) //given projId, delete project

//collaboration endpoint
app.post('/api/collaborators/:userId', collabCtrl.addCollaborators) //used to add colloborators to project
app.get('/api/collaborators', collabCtrl.getCollaborators) //used to add colloborators to project