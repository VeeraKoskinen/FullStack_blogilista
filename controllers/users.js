const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs', { _id: 1, likes: 1, author: 1, title: 1, url: 1 } )
    response.json(users.map(User.format))
})


usersRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        const existingUser = await User.find({ username: body.username })
        if (existingUser.length > 0) {
            return response.status(400).json({ error: 'username must be unique' })
        }

        if (body.password.length < 3 ) {
            return response.status(400).json({error: 'password must be at least 3 letters'})
        }

        let grownup = true

        if (body.adult === undefined) {
            grownup = true
        } else {
            grownup = body.adult
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
            adult: grownup,
            blogs: body.blogs
        })

        const savedUser = await user.save()

        response.json(User.format(savedUser))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

module.exports = usersRouter