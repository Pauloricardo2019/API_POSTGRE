const express = require('express');
const app = express();

app.use(express.json());
app.use('/', require('./route/postsRoute'));
app.use(function (error, req, res, nex){
    if(error.message === 'Post already exists'){
        return res.status(409).send(e.message);
    }
    if(error.message === 'Post not found'){
        return res.status(404).end(e.message)
    }
    res.status(500).send(e.message);
});

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log('rodando');
});