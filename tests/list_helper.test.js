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

const listWithManyBlogs2 = [
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
    author: 'sinä',
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
  },
  {
    _id: '5a422aa71b54a696234d17f8',
    title: '5',
    author: 'sinä',
    url: 'http://www.u.california.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676134d17f0',
    title: '6',
    author: 'minä',
    url: 'http://www.nukuisinpaensiyonaparemmin.fi',
    likes: 8,
    __v: 0
  },
  {
    _id: '5c422aa71b55a676134d17f8',
    title: '7',
    author: 'kanahaukka',
    url: 'http://www.ehkaensiyona.fi',
    likes: 89,
    __v: 0
  },
  {
    _id: '5a456aa71b54a676134d87f8',
    title: '8',
    author: 'minä',
    url: 'http://www.ehkaensiyona.fi',
    likes: 239,
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

const someHaveEquallyManyLikes = [
  {
    _id: '5a422aa71b54a676134d87f8',
    title: '4',
    author: 'minä',
    url: 'http://www.ehkaensiyona.fi',
    likes: 40,
    __v: 0
  },
  {
    _id: '5a422aa71b54a696234d17f8',
    title: '5',
    author: 'sinä',
    url: 'http://www.u.california.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676134d17f0',
    title: '6',
    author: 'minä',
    url: 'http://www.nukuisinpaensiyonaparemmin.fi',
    likes: 10,
    __v: 0
  },
  {
    _id: '5c422aa71b55a676134d17f8',
    title: '7',
    author: 'kanahaukka',
    url: 'http://www.ehkaensiyona.fi',
    likes: 200,
    __v: 0
  },
  {
    _id: '5a456aa71b54a676134d87f8',
    title: '8',
    author: 'minä',
    url: 'http://www.ehkaensiyona.fi',
    likes: 150,
    __v: 0
  }
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

describe('most blogs', () => {
  
  test('if the list is empty, we will give the right information of situation ', () => {
    const result = listHelper.mostBlogs(emptyList)
    expect(result).toEqual("Taulukossa ei ole vielä yhtään bloggaajaa.")
  })

  test('if there is only one blog we return its author', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({
      name: "Edsger W. Dijkstra", 
      blogs: 1
    })
  })
  
  test('if there are many blogs and authors in the list we pick the one who has the most blogs (1)', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs)
    expect(result).toEqual({
      name: "minä",
      blogs: 3
    })
  })

  test('if there are many blogs and authors in the list we pick the one who has the most blogs (2)', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs2)
    expect(result).toEqual({
      name: "minä",
      blogs: 4
    })
  })  


})

describe('most likes', () => {
  test('if the list is empty, we will give the right information of situation ', () => {
    const result = listHelper.mostLikes(emptyList)
    expect(result).toEqual("Taulukossa ei ole vielä yhtään bloggaajaa.")
  })

  test('if there is only one blog we return its author', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({
      name: "Edsger W. Dijkstra", 
      likes: 5
    })
  })

  test('if there are many blogs and authors in the list we pick the one who has the most likes (1)', () => {
    const result = listHelper.mostLikes(listWithManyBlogs)
    expect(result).toEqual({
      name: "minä",
      likes: 239
    })
  })

  test('if there are many blogs and authors in the list we pick the one who has the most blogs (2)', () => {
    const result = listHelper.mostLikes(listWithManyBlogs2)
    expect(result).toEqual({
      name: "minä",
      likes: 486
    })
  })  


  
})