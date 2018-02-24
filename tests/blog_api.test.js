const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { initialBlogs, nonExistingId, blogsInDb, usersInDb } = require('./test_helper')

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

describe('addition of a new blog', async () => {

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

})

describe('deletion of a blog', async () => {
    let addedBlog

    beforeAll(async () => {
        addedBlog = new Blog({
            title: "Kirkuvan Kurpan tarina",
            author: "Kirkuva Kurppa",
            url: "www.kurppaillaan.fi",
            likes: 4
        })
        await addedBlog.save()
    })

    test('DELETE /api/blogs/:id succeeds with proper statuscode', async () => {
        const blogsAtStart = await blogsInDb()

        await api
            .delete(`/api/blogs/${addedBlog._id}`)
            .expect(204)

        const blogsAfterOperation = await blogsInDb()

        const titles = blogsAfterOperation.map(x => x.title)

        expect(titles).not.toContain(addedBlog.title)
        expect(blogsAfterOperation.length).toBe(blogsAtStart.length - 1)

    })

})

describe('update blog properly', async () => {

    let addedBlog

    beforeAll(async () => {
        sentBlog = new Blog({
            title: "Vanhuudesta kärsivä",
            author: "Kirkuva Kurppa",
            url: "www.vanhuksetBloggaa.fi",
            likes: 9
        })
        addedBlog = await sentBlog.save()
    })

    test('PUT /api/blogs:id manage to update the title', async () => {
        const blogsAtStart = await blogsInDb()

        const updatedBlog = new Blog({
            title: "Uutuudesta nouseva",
            author: "Kirkuva Kurppa",
            url: "www.vanhuksetBloggaa.fi",
            likes: 9
        })

        console.log("addedBlog")
        await api
            .put(`/api/blogs/${addedBlog._id}`)
            .send(updatedBlog)
            .expect(200)

        const blogsAfterOperation = await blogsInDb()
        const titles = blogsAfterOperation.map(x => x.title)
        expect(titles).toContain(updatedBlog.title)
        expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
    })

    test('PUT /api/blogs:id manage to update the author', async () => {
        const blogsAtStart = await blogsInDb()

        const updatedBlog = new Blog({
            title: "Uutuudesta nouseva",
            author: "Kirkuva Karppi",
            url: "www.vanhuksetBloggaa.fi",
            likes: 9
        })

        console.log("addedBlog")
        await api
            .put(`/api/blogs/${addedBlog._id}`)
            .send(updatedBlog)
            .expect(200)

        const blogsAfterOperation = await blogsInDb()
        const authors = blogsAfterOperation.map(x => x.author)
        expect(authors).toContain(updatedBlog.author)
        expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
    })
})

describe('when there is initially one user at db', async () => {
    beforeAll(async () => {
        await User.remove({})
        const user = new User({ username: 'root', password: 'sekret', adult: true })
        await user.save()
    })

    test('POST /api/users succeeds with a fresh username which do not have an adult-value', async () => {
        const usersBeforeOperation = await usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
            adult: true
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
        const usernames = usersAfterOperation.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('POST /api/users fails with proper statuscode and message if username already taken', async () => {
        const usersBeforeOperation = await usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body).toEqual({ error: 'username must be unique' })

        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
    })

    test('POST /api/users fails with proper statuscode and message if password is too sort', async () => {
        const usersBeforeOperation = await usersInDb()

        const newUser = {
            username: 'suppilo',
            name: 'suppilo',
            password: 'sa',
            adult: false
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body).toEqual({ error: 'password must be at least 3 letters' })

        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
    })

    afterAll(() => {
        server.close()
    })
})

