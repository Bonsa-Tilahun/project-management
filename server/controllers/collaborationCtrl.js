let usersTable = require('../database/data')
let id = 0

module.exports = {
    addCollaborators: (req, res) => {
        const { userId } = req.params
        const { projId, collabUserList } = req.body
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

            res.status(200).send([usersTable[userIndex].colabrationProj[usersTable[userIndex].colabrationProj.length - 1]])
                // console.log('my return val: ', usersTable[userIndex].colabrationProj[usersTable[userIndex].colabrationProj.length - 1].collabUserList)


        } else {
            collabListToUpdated[projectCollabIndex].collabUserList = [...collabListToUpdated[projectCollabIndex].collabUserList, ...collabUserList]

            res.status(200).send([collabListToUpdated[projectCollabIndex]])
                // console.log('my return val: ', collabListToUpdated[projectCollabIndex].collabUserList)

        }

    },
    getCollaborators: (req, res) => {
        const { projId, userId } = req.query
            // console.log(projId, userId)
        const userIndex = usersTable.findIndex(user => user.id === +userId)
        const collabProj = usersTable[userIndex].colabrationProj
        const currentCollabIndex = collabProj.findIndex(collab => collab.projId === +projId)
        res.status(200).send(collabProj[currentCollabIndex])
    },
    deleteCollaborator: (req, res) => {
        const { userId, tobeDeleteUserId, projId } = req.query
        const userIndex = usersTable.findIndex(user => user.id === +userId)
        if (userIndex === -1) {
            return res.status(404).send("Unable to find user")
        }
        const projectIndex = usersTable[userIndex].colabrationProj.findIndex(proj => proj.id === +projId)
        if (projectIndex === -1) {
            return res.status(404).send("Unable to find Project")
        }
        // const workingProj = usersTable[userIndex].colabrationProj[projectIndex]
        console.log("what is going on? ", usersTable[userIndex].colabrationProj[projectIndex].collabUserList)
        const tobeDeleteUserIndex = usersTable[userIndex].colabrationProj[projectIndex].collabUserList.findIndex(user => user.id === +tobeDeleteUserId)
        if (tobeDeleteUserIndex === -1) {
            return res.status(404).send("Unable to find User")
        }
        usersTable[userIndex].colabrationProj[projectIndex].collabUserList.splice(tobeDeleteUserIndex, 1)
        res.status(200).send([usersTable[userIndex].colabrationProj[projectIndex]])
    }
}