const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

app.use(express.json());
app.use(cors());
mongoose.connect("YOUR-MONGOOSE-URL", {
	useUnifiedTopology: true,
	useNewUrlParser: true

}).then(() => console.log("conected to DB")).catch(console.error);

const Todo = require('./models/Todo');

app.get('/todos', async (req, res) => {
	const todos = await Todo.find();

	res.json(todos);
});

app.post('/todo/new', (req, res) => {
	const todo = new Todo({
		text: req.body.text
	})
	todo.save();
	res.json(todo);
});

app.delete('/todo/delete/:id', async (req, res) => {
	const result = await Todo.findByIdAndDelete(req.params.id);
	res.json(result);
});

app.get('/todo/done/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);
	todo.complete = !todo.complete;

	todo.save();
	res.json(todo);
})

app.listen(3001, () => console.log("server listen to port 3001"));