const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, nonExistingId, blogsInDb } = require('./test_helper')

describe('when there is initially some blogs saved', async () => {
    beforeAll(async () => {
        await Blog.remove({})

        const blogObjects = initialBlogs.map(b => new Blog(b))
        await Promise.all(blogObjects.map(b => b.save()))
    })


    test('All blogs are returned as json GET /api/blogs', async () => {

        const blogsInDatabase = await blogsInDb()  

        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.length).toBe(blogsInDatabase.length)

        const returnedTitles = response.body.map(b => b.title)
        blogsInDatabase.forEach(blog => {
            expect(returnedTitles).toContain(blog.title)
        })
    })

})

describe('addition of a new note', async () => {

    test('POST /api/blogs succeeds with valid data', async () => {
        const blogsAtStart = await blogsInDb()

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

        const blogsAfterOperation = await blogsInDb()    
        expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)
        const titles = blogsAfterOperation.map(x => x.title)
        expect(titles).toContain('Uutta putkeen')

    })

    test('POST /api/blogs fails with proper statuscode if title is missing', async () => {
        const newBlog = {
            author: "Kruusialainen mikrokirsikka",
            url: "www.hukkaputki.fi",
            likes: 0
        }

        const blogsAtStart = await blogsInDb()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAfterOperation = await blogsInDb()
        const titles = blogsAfterOperation.map(x => x.title)
        expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
    })

    test('POST /api/blogs fails with proper statuscode if author is missing', async () => {
        const newBlog = {
            title: "Matkalla maailman äärissä",
            url: "www.hukkaputki.fi",
            likes: 0
        }

        const blogsAtStart = await blogsInDb() 

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAfterOperation = await blogsInDb()
        const authors = blogsAfterOperation.map(x => x.author)
        expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
    })

    test('POST /api/blogs without likes in posted object is added with like-value 0', async () => {
        const newBlog = {
            title: "Elämää Keuruulla",
            author: "Kruusialainen mikrokirsikka",
            url: "www.hukkaputki.fi"
        }

        const blogsAtStart = await blogsInDb()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)

        const blogsAfterOperation = await blogsInDb()

        const titles = blogsAfterOperation.map(x => x.title)
        const result = blogsAfterOperation.find(x => x.title === "Elämää Keuruulla")

        expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)
        expect(titles).toContain('Elämää Keuruulla')
        expect(result.likes).toEqual(0)
    })

    afterAll(() => {
        server.close()
    })

})

