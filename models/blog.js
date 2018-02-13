const mongoose = require('mongoose')

if ( process.env.NODE_ENV !== 'production' ) {
    require('dotenv').config()
}
  
const url = process.env.MONGO_URL

mongoose.connect(url)

/*
const Blog = mongoose.model('Blog', {
    title: String,
    author: String,
    url: String,
    likes: Number
})
*/

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

blogSchema.statics.format = (blog) => {
    return {
        title: blog.title,
        author: blog.author,        
        url: blog.url,
        likes: blog.votes, 
        id: blog._id
    }
}

const Blog = mongoose.model('Blog', blogSchema);



module.exports = Blog