const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      title: "Matkalla Pariisissa",
      author: "Tira Pink",
      url: "www.tiramatkustaa.fi",
      likes: 6
    },
    {
      title: "Kohti urani huippua",
      author: "Veera Black",
      url: "www.veerawörkkii.fi",
      likes: 9
    }
  ]  

const nonExistingId = async () => {
    const blog = new Blog()
    await blog.save()
    await blog.remove()
  
    return blog._id.toString()
}
  
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(Blog.format)
}

const usersInDb = async () => {
    const users = await User.find({})
    return users
  }
  
module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}
