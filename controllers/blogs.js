const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    console.log('-----II-----')
    console.log('Mentiin get:tiin')
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs.map(Blog.format))
      })
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    console.log('-----II-----')
    console.log('Mentiin post:iin')
    blog
      .save()
      .then(savedBlog => {
        response.json(Blog.format(savedBlog))  
        response.status(201).json()
      })
      .catch(error => {
          respons.status(404).json("error lisättäessä")
      })
  })

module.exports = blogsRouter  