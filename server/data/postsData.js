const database = require('../infra/database');

exports.getPosts = function () {
    return database.query('select * from blog.post')
};

exports.getPost = function(id){
    return database.oneOrNone('select * from blog.post where id = $1', [id]);
};

exports.savePost = function(post){
    return database.one('insert into blog.post (tittle,content) values ($1, $2) returning *', [post.tittle, post.content]);
};

exports.updatePost = function(id,post){
    return database.none('update blog.post set tittle = $1, content = $2 where id = $3', [post.tittle,post.content,id])
};

exports.deletePost = function(id){
    return database.none('delete from blog.post where id = $1', [id]);
};

