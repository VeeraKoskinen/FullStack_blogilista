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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}

