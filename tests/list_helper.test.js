const listHelper = require('../utils/list_helper')

test('dummy is called', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const emptyList = []

  test('when list is empty, there are no likes', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

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

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

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

  test('when list has many blogs, the sum of likes is right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(244)
  })

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
  
  test('when list has some negative values of likes', () => {
    const result = listHelper.totalLikes(listWithSomeNegativeValueOfLikes)
    expect(result).toBe(5)
  })

})