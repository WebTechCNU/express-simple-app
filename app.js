const express = require('express');
const bodyParser = require('body-parser');
const coursesRoute = require('./routes/courses-routes');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/courses', coursesRoute);

app.post('/', (req, res, next) => {
    return res.send('<h1>hello, ' + req.body.username +'</h1>');
});

app.get('/', (req, res, next) => {
    res.send('<form method="POST"><input type="text" name="username"><button type="submit">click me</button></form>');
});

app.use((error, req, res, next) => {
    res.status(error.code);
    res.json(error.message);
})

app.listen(5000);