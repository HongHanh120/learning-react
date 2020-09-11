const express = require('express');
const router = express.Router()

const todoController = require('../controllers/todoController');

router.post('/', todoController.createTodo);

router.get('/:id', todoController.getTodo);

router.get('/', todoController.getTodoList);

router.put('/:id', todoController.updateTodo);

router.delete('/:id', todoController.deleteTodo);

module.exports = router;