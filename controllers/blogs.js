const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { _id: 1, username: 1, name: 1} )
  response.json(blogs.map(Blog.format))
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    const blog = await Blog.findById(request.params.id)
    const user = await User.findById(decodedToken.id)

    if ( blog.user.toString() !== user._id.toString() ){
      return response.status(401).json({ error: 'You are not the one who added this blog! You dont have right to remove it.' })
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    console.log("HUIIII",exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.post('/', async (request, response) => {

  try {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (body.title === undefined || body.author === undefined) {
      return response.status(400).json({ error: 'title or author in missing' })
    }

    let likes = body.likes
    if (likes === undefined) {
      likes = 0
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: likes,
      user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(Blog.format(savedBlog))

  } catch (exception) {
    if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }

  }

})

blogsRouter.put('/:id', async (request, response) => {

  try {
    const body = request.body

    if (body.title === undefined || body.author === undefined) {
      return response.status(400).json({ error: 'title or author in missing' })
    }

    const newBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: body.user
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    response.status(200).json(Blog.format(updatedBlog))

  } catch (exception) {
    console.log(exception)
    response.status(400).json({ error: 'mallformated id' })
  }
})

module.exports = blogsRouter  