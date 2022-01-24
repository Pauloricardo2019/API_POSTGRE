const express = require('express');
const app = express();

app.use('/', require('./route/postsRoute'));

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log('rodando')
})