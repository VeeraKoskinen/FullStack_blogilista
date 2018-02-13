const listHelper = require('../utils/list_helper')

test('dummy is called', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

/*---  testitaulukot  ---*/

const emptyList = []

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const listWithManyBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676134d17f8',
    title: '2',
    author: 'minä',
    url: 'http://www.nukuisinpaensiyonaparemmin.fi',
    likes: 8,
    __v: 0
  },
  {
    _id: '5a422aa71b55a676134d17f8',
    title: '3',
    author: 'minä',
    url: 'http://www.ehkaensiyona.fi',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676134d87f8',
    title: '4',
    author: 'minä',
    url: 'http://www.ehkaensiyona.fi',
    likes: 231,
    __v: 0
  }
]

const listWithSomeNegativeValueOfLikes = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676134d17f8',
    title: '2',
    author: 'minä',
    url: 'http://www.nukuisinpaensiyonaparemmin.fi',
    likes: -10,
    __v: 0
  },
]



describe('total likes', () => {

  test('when list is empty, there are zero likes', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

  test('when list has only one blog, we return the number of likes right', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has many blogs, the sum of likes is right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(244)
  })
  
  test('when list has some negative values of likes, we ignore them', () => {
    const result = listHelper.totalLikes(listWithSomeNegativeValueOfLikes)
    expect(result).toBe(5)
  })
})




describe('favorite blog', () => {

  test('if list contains only one blog, we choose it as the best', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual({
      "_id": "5a422aa71b54a676234d17f8", 
      "author": "Edsger W. Dijkstra", 
      "likes": 5, 
      "title": "Go To Statement Considered Harmful", 
      "url": "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      __v: 0 })
  })

  test('if the list is empty, we will give the right information of situation ', () => {
    const result = listHelper.favoriteBlog(emptyList)
    expect(result).toEqual("Taulukossa ei ole vielä yhtään blogia.")
  })

  test('if the list contains many objects we schoose the best one', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    expect(result).toEqual( { 
      "_id": '5a422aa71b54a676134d87f8',
      "title": '4',
      "author": 'minä',
      "url": 'http://www.ehkaensiyona.fi',
      "likes": 231,
      __v: 0 })
  })
})