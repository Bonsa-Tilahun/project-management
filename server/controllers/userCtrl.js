let usersTable = require('../database/data')
let id = 0

module.exports = {
    createUser: (req, res) => {
        const { userName, password } = req.body
        const index = usersTable.findIndex(user => user.userName === userName)
        if (index === -1) {
            const newUser = {
                id,
                userName,
                password,
                projects: [],
                colabrationProj: []
            }
            usersTable.push(newUser)
            id++
            return res.status(200).send(newUser)
        }
        res.status(403).send('User already exists')
    },
    getUser: (req, res) => {
        const { userName, password } = req.query
        const index = usersTable.findIndex(user => user.userName === userName)
        if (index === -1) {
            return res.status(404).send('User not found: Please create an account')
        }
        if (usersTable[index].password !== password) {
            return res.status(403).send('Password or userName incorrect')
        }
        res.status(200).send(usersTable[index])
    },

    getUsers: (req, res) => {
        const { userName } = req.query
            // console.log(userName)
        const matchedUsers = []
        for (const user of usersTable) {
            if (user.userName.includes(userName)) {
                matchedUsers.push(user)
            }
        }
        // const matchedUsers = usersTable.filter(user => user.userName.includes(req.query))
        // console.log(matchedUsers)
        res.status(200).send(matchedUsers)

    },
    getSingleUser: (req, res) => {
        const { id } = req.params
        const userFound = usersTable.find(user => user.id === +id)
            // console.log(userFound)
        res.status(200).send(userFound)
    }
}