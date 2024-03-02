const express = require('express');

const router = express.Router();

const budgets = [
    {
        id: 1,
        name: 'laptop',
        description: 'laptop hp'
    },
    {
        id: 2,
        name: 'phone',
        description: 'iphone 14'
    },
    {  
        id: 3,
        name: 'paper',
        description: 'paper paper'
    }
]

router.get('/', (req, res, next) => {
    res.json({budgets: budgets});
})

router.post('/', (req, res) => {
    const {name, description} = req.body;
    budgets.push({id: budgets.length + 1, name: name, description: description});
    res.json({budgets: budgets});
})

module.exports = router;  