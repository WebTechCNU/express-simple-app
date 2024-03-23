const express = require('express');
const bodyParser = require('body-parser');
const coursesRoute = require('./routes/courses-routes');
const mongodbService = require('./services/mongodb-service');
const apicache = require('apicache');
const cors = require('cors');

let cache = apicache.middleware;


const app = express();

const allowOrigin = {
    origin: 'http://localhost:3000'
};



app.use(bodyParser.json());
app.use(cors(allowOrigin));
app.use(cache("10 minutes"));

app.use('/api/courses', coursesRoute);
// app.get('/v1/api/budgets', mongodbService.getBudgets);
app.get('/api/budgets', mongodbService.getBudgetsFiltered);
app.post('/api/budgets', mongodbService.createBudget);

app.get('/api/posts/:postId/comments/', (req, res, next) => {
    const {postId} = req.params;
    if(postId > 100){
        return res.status(404).json({message : "post not found"});
    }
    return res.json({postId: postId, comments: [{id: "1", text:"hello comment"}]});
});

app.get('/', (req, res, next) => {
    res.json({message: "hello world"});
});

app.use((error, req, res, next) => {
    res.status(error.code);
    if(error.code == "500"){
        error.message = "something went very wrong on our side, very sorry ^_^ "
    }
    res.json(error.message);
})

app.listen(5000);



// rest - representational state transfer  
// rest best practices:
// 1. responses in json
// 2. endpoints names use nouns instead of verbs
// get, post, put(entire entity), patch(fields), delete, options
// 3. use nesting api
// 4. error handling
// http codes 
// 1xx - informational codes; 2xx - ok responses; 3xx - redirectional; 4xx - client side errors; 5xx - server side errors;
// 400 - bad request; 401 - unauthorized;  403 - forbidden; 404 - not found
// 500 - server side error; 502 - other api;
// 5. Always use filters, sorting, paginations
// 6. Use caching 
// 7. Api versioning 
