const express = require('express');

const router = express.Router();

const courses = [
    {
        id: 1,
        name: 'mathematics',
        description: 'for those who love mathematics'
    },
    {
        id: 2,
        name: 'data structures',
        description: 'for programmers'
    }
]

router.get('/:id', (req, res, next) => {
    const courseId = req.params.id;
    const course = courses.find(c => c.id === parseInt(courseId));
    if(!course){
        const error = new Error('course not found');
        error.code = 404;
        throw error;
    }
    res.json({course: course});
})

module.exports = router; 