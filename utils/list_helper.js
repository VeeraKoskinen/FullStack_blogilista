const dummy = (blogs) => {
    return 1
}
 
const totalLikes = (blogs) => {
    let likes = 0
    blogs.map(blog => {
        if (blog.likes > 0) {
            likes += blog.likes
        }    
    })
    return likes
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return "Taulukossa ei ole vielä yhtään blogia."
    } else {
        let favorite = blogs[0]
        blogs.map(blog => {
            if (favorite.likes < blog.likes) {
                favorite = blog
            }
        })
        return favorite
        
    }
}

/* selvitetään kenellä kirjoittajalla on eniten blogeja */

const mostBlogs = (blogs) => {

    if (blogs.length === 0) {
        return "Taulukossa ei ole vielä yhtään bloggaajaa."

    } else {

        const authorsWithTheirBlogs = blogs.map(blog => blog.author).reduce((acc, author) => {    
            if (!acc[author]) {
                acc[author] = 1;
            } else {
                acc[author] += 1
            }   
            return acc;
        }, {});

        let authorObjects = []
        Object.keys(authorsWithTheirBlogs).map(author => {
            const object = {name: author, blogs: authorsWithTheirBlogs[author]}
            authorObjects.push(object)
        }) 

        let superBlogger = {name: "X", blogs:0}
        authorObjects.map(author => {
            if (author.blogs > superBlogger.blogs) {
                superBlogger = author
            }
        })

        return superBlogger
        
    }    
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return "Taulukossa ei ole vielä yhtään bloggaajaa."
    } else {
        const authorsWithTheirLikes = blogs.reduce((acc, blog) => {      
            if (!acc[blog.author]) {
                acc[blog.author] = blog.likes
            } else {
                acc[blog.author] += blog.likes
            }   
            return acc;
        }, {});
        console.log(authorsWithTheirLikes)
    

        let authorObjects = []
        Object.keys(authorsWithTheirLikes).map(author => {
            const object = {name: author, likes: authorsWithTheirLikes[author]}
            authorObjects.push(object)
        }) 

        let superBlogger = {name: "X", likes:0}
        authorObjects.map(author => {
            if (author.likes > superBlogger.likes) {
                superBlogger = author
            }
        })

        return superBlogger
    }    
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

