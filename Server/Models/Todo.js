const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    tarefa: String,
    done: {
        type: Boolean,
        default: false
    }
})

const TodoModel = mongoose.model("todos", TodoSchema)

module.exports = TodoModel