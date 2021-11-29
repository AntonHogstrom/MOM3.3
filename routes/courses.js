const express = require('express');

const router = express.Router();
const Course = require('../models/schema_courses.js');

/* GET render courses.pug and load in varibles title and courses. */
router.get('/get', async (req, res) => {
  try {
    const courses = await Course.find({});
    res.set('Content-Type', 'application/json');
    res.status(200).json({courses});

  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.post('/', async (req, res) => {
      const course = new Course({
      courseCode: req.body.courseCode,
      courseName: req.body.courseName,
      coursePeriod: req.body.coursePeriod
    })
    try {
      const newCourse = await course.save();
      res.status(201).json(newCourse);
    } catch (err) {
      res.status(400).json({message: err.message});
    }
});

router.get('/:id', getCourse, (req, res) => {
  res.json(res.course);
});

router.delete('/:id', getCourse, async (req, res) => {
  try {
    await res.course.remove();
    res.json({message: "Deleted course"});
  }
  catch (err) {
    res.status(500).json({message: err.message});
  }
});

        
router.post('/',function(req,res){
  req.header('Content-Type', 'application/json');
  console.log(req.body);
  res.status(201).send("POST: " + req.body);
});

// FIND ONE COURSE MIDDLEWARE FUNCTION
async function getCourse(req, res, next) {
  let course;
  try {
    course = await Course.findById(req.params.id);
    if (course == null) {
      return res.status(404).json({message: 'Cannot find course'});
    }
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
  res.course = course;
  next();
}


module.exports = router;
