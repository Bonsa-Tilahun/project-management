let usersTable = require('../database/data')
let projects = require('../database/projects')
let collaboration = require('../database/collaboration')
let id = 0

module.exports = {
    addCollaborators: (req, res) => {
        const { userId } = req.params
        const { projId, collabUserList } = req.body
        console.log(req.params)
        console.log(req.body)
        console.log(+userId)
        console.log(usersTable)
        const userIndex = usersTable.findIndex(user => user.id === parseInt(userId))
        const collabListToUpdated = usersTable[userIndex].colabrationProj
            //if the project already has a collab members, we add to them else we start a new colab list
        const projectCollabIndex = collabListToUpdated.findIndex(collabProj => collabProj.projId === projId)
        if (projectCollabIndex === -1) {
            const newCollabTobeAdded = {
                id,
                userId,
                projId,
                collabUserList
            }
            id++
            collabListToUpdated.push(newCollabTobeAdded)
            usersTable[userIndex].colabrationProj = collabListToUpdated
            console.log(usersTable[userIndex])
            res.status(200).send(usersTable[userIndex].colabrationProj[usersTable[userIndex].colabrationProj.length - 1].collabUserList)
            console.log('my return val: ', usersTable[userIndex].colabrationProj[usersTable[userIndex].colabrationProj.length - 1].collabUserList)


        } else {
            collabListToUpdated[projectCollabIndex].collabUserList = [...collabListToUpdated[projectCollabIndex].collabUserList, ...collabUserList]

            res.status(200).send(collabListToUpdated[projectCollabIndex].collabUserList)
            console.log('my return val: ', collabListToUpdated[projectCollabIndex].collabUserList)

        }

    },
    getCollaborators: (req, res) => {
        const { projId, userId } = req.query
        console.log(projId, userId)
        const userIndex = usersTable.findIndex(user => user.id === +userId)
        const collabProj = usersTable[userIndex].colabrationProj
        const currentCollabIndex = collabProj.findIndex(collab => collab.projId === +projId)
        res.status(200).send(collabProj[currentCollabIndex])
    }
}