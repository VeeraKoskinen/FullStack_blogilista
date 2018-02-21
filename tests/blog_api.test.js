const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

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

beforeAll(async () => {
    await Blog.remove({})
  
    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})
  

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
  
    expect(response.body.length).toBe(initialBlogs.length)
})
  
test('a specific blog is within the returned blogs', async () => {
    const response = await api
      .get('/api/blogs')
  
    const titles = response.body.map(x => x.title)
  
    expect(titles).toContain('Matkalla Pariisissa')
})

test('a valid blog can be added ', async () => {
    const newBlog = {
        title: "Uutta putkeen",
        author: "Kruusialainen mikrokirsikka",
        url: "www.hukkaputki.fi",
        likes: 12
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api
      .get('/api/blogs')
  
    const titles = response.body.map(x => x.title)
  
    expect(response.body.length).toBe(initialBlogs.length + 1)
    expect(titles).toContain('Uutta putkeen')
})

test('blog without title is not added ', async () => {
    const newBlog = {
        author: "Kruusialainen mikrokirsikka",
        url: "www.hukkaputki.fi",
        likes: 0
    }
  
    const intialBlogs = await api
      .get('/api/blogs')
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const response = await api
      .get('/api/blogs')
  
    const titles = response.body.map(x => x.title)
  
    expect(response.body.length).toBe(intialBlogs.body.length)
})

test('blog without author is not added ', async () => {
    const newBlog = {
        title: "Matkalla maailman äärissä",
        url: "www.hukkaputki.fi",
        likes: 0
    }
  
    const intialBlogs = await api
      .get('/api/blogs')
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const response = await api
      .get('/api/blogs')
  
    const authors = response.body.map(x => x.author)
  
    expect(response.body.length).toBe(intialBlogs.body.length)
})

test('blog without likes is added with value 0', async () => {
    const newBlog = {
        title: "Elämää Keuruulla",
        author: "Kruusialainen mikrokirsikka",
        url: "www.hukkaputki.fi"
    }
  
    const intialBlogs = await api
      .get('/api/blogs')
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
  
    const response = await api
      .get('/api/blogs')
    console.log('response: ',response.body)
    const titles = response.body.map(x => x.title)
    const result = response.body.find(x => x.title === "Elämää Keuruulla")
    console.log('Result näyttää tältä: ', result)

    expect(response.body.length).toBe(intialBlogs.body.length + 1)
    expect(titles).toContain('Elämää Keuruulla')
    expect(result.likes).toEqual(0)    
})


afterAll(() => {
  server.close()
})