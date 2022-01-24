const axios = require('axios');
const crypto = require('crypto');
const postsService = require('../service/postsService')

const generate = function(){
    return crypto.randomBytes(20).toString('hex');
}

const request = function (url,method,data){
    return axios({ url, method, data, validateStatus: false });
}

test('Should get a post', async function () {
    //given - dado que
    const post1 = await postsService.savePost({tittle: generate(), content: generate()})
    const post2 = await postsService.savePost({tittle: generate(), content: generate()})
    const post3 = await postsService.savePost({tittle: generate(), content: generate()})
    // when - quando acontecer alguma coisa
    const response = await request('http://localhost:3000/posts', 'get');
    expect(response.status).toBe(200);
    const posts = response.data;
    //then - entao
    expect(posts).toHaveLength(3);
    await postsService.deletePost(post1.id);
    await postsService.deletePost(post2.id);
    await postsService.deletePost(post3.id);
    
});

test('Should save a post', async function () {
    //given - dado que
    const data = {tittle: generate(), content: generate() }
    // when - quando acontecer alguma coisa
    const response = await request('http://localhost:3000/posts', 'post', data);
    expect(response.status).toBe(201);
    const post = response.data;
    //then - entao
    expect(post.tittle).toBe(data.tittle);
    expect(post.content).toBe(data.content);
    await postsService.deletePost(post.id);
});

test('Should not save a post', async function () {
    //given - dado que
    const data = {tittle: generate(), content: generate() }
    // when - quando acontecer alguma coisa
    const response1 = await request('http://localhost:3000/posts', 'post', data);
    const response2 = await request('http://localhost:3000/posts', 'post', data);
    expect(response2.status).toBe(409);
    const post = response1.data;
   
    await postsService.deletePost(post.id);
});

test('Should update a post', async function () {
    //given - dado que
    const post = await postsService.savePost({tittle: generate(), content: generate()});
    post.tittle = generate();
    post.content = generate();
    // when - quando acontecer alguma coisa
    const response = await request(`http://localhost:3000/posts/${post.id}`, 'put', post);
    expect(response.status).toBe(204);
    const updatePost = await postsService.getPost(post.id);
    //then - entao
    expect(updatePost.tittle).toBe(post.tittle);
    expect(updatePost.content).toBe(post.content);
    await postsService.deletePost(post.id);
});

test('Should not update a post', async function () {
    const post = {
        id: 1
    };
    const response = await request(`http://localhost:3000/posts/${post.id}`, 'put', post);
    expect(response.status).toBe(404);

});

test('Should delete a post', async function () {
    
    const post = await postsService.savePost({tittle: generate(), content: generate()});
   
    const response = await request(`http://localhost:3000/posts/${post.id}`, 'delete');
    expect(response.status).toBe(204);
    const posts = await postsService.getPosts();
    expect(posts).toHaveLength(0);

});