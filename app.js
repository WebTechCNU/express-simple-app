const express = require('express');
const bodyParser = require('body-parser');
const coursesRoute = require('./routes/courses-routes');
const budgetsRoutes = require('./routes/budgets-routes');
const cors = require('cors');

const app = express();

const allowOrigin = {
    origin: 'http://localhost:3000'
};



app.use(bodyParser.json());

app.use('/api/courses', coursesRoute);
app.use('/api/budgets', cors(allowOrigin), budgetsRoutes);

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