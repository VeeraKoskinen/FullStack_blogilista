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

module.exports = {
  dummy,
  totalLikes
}

