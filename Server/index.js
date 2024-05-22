const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://starkfielld:1234@cluster0.tdcit98.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.post('/add', (req, res) => {
    const tarefa = req.body.tarefa;
    TodoModel.create({ tarefa: tarefa })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { done } = req.body; 
    TodoModel.findByIdAndUpdate(id, { done: done }, { new: true })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.delete('/delete/:id', (req, res) =>{
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err));
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
