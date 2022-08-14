const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/test")
    .then(res => console.log("Connected to the MongoDb successfully"))
    .catch(err => console.log("Something went wrong", err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema)

const createCourse = async (name, author, tags, ispublished) => {
    const course = new Course({
        name: name,
        author: author,
        tags: tags,
        isPublished: ispublished
    })
    const result = await course.save()
    console.log(result)
}

const getCourse = async () => {
    const courses = await Course
        .find({ author: "Thalha" })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 })
    console.log(courses)
}

// createCourse("HTML", "Thalha", ['web', 'html'], true)
getCourse()