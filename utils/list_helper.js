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
    console.log("--------- tykkäysten määrä: --------")
    console.log(likes)
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
                console.log('---------- favorite vaihtuu ----------')
                console.log(favorite)
            }
        })
        return favorite
        
    }
}

/* selvitetään kenellä kirjoittajalla on eniten blogeja */

const mostBlogs = (blogs) => {

    if (blogs.length === 0) {
        console.log("---- sisällä if:issä ----")
        return "Taulukossa ei ole vielä yhtään bloggaajaa."

    } else {

        const authorsWithTheirBlogs = blogs.map(blog => blog.author).reduce((acc, author) => {    
            console.log(acc)
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}

