const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { _id: 1, username: 1, name: 1} )
  response.json(blogs.map(Blog.format))
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.post('/', async (request, response) => {

  try {
    const body = request.body

    if (body.title === undefined || body.author === undefined) {
      return response.status(400).json({ error: 'title or author in missing' })
    }

    let likes = body.likes
    if (likes === undefined) {
      likes = 0
    }

    const users = await User.find({})
    const user = users[0]
    /* const user = await User.findById(body.userId) */

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: likes,
      user: user._id
    })

    console.log('uuden blogin like-arvo:', blog.likes)

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(Blog.format(savedBlog))

  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
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