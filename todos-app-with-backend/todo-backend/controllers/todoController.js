const todo = require('../models/todo');
const responseUtil = require("../utils/responseUtils");

async function createTodo(req, res) {
    const {task} = req.body;
    try {
        await todo.create({
            task: task
        });
        await res.json(responseUtil.success({data: {}}));
    } catch (err) {
        await res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getTodo(req, res) {
    const {id} = req.params;
    try {
        // const result = await todo.findById(id);
        const result = await todo.findOne({
            _id: id
        });
        await res.json(responseUtil.success({data: {result}}));
    } catch (err) {
        await res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getTodoList(req, res) {
    try {
        // const results = await todo.find();
        await res.json(responseUtil.success({data: await todo.find()}));
    } catch (err) {
        await res.json(responseUtil.fail({reason: err.message}));
    }
}

async function updateTodo(req, res) {
    const {task, completed} = req.body;
    const {id} = req.params;
    try {
        // const result = await todo.findByIdAndUpdate(id, {
        //         task: task,
        //         completed: completed,
        //     })
        // const result = await todo.findOneAndUpdate({
        //     _id: id
        // }, {
        //     task: task,
        //     completed: completed,
        // });
        await res.json(responseUtil.success({data:
                await todo.findOneAndUpdate({
                    _id: id
                }, {
                    task: task,
                    completed: completed,
                })
            }));
    } catch (err) {
        await res.json(responseUtil.fail({reason: err.message}));
    }
}

async function deleteTodo(req, res) {
    const {id} = req.params;
    try {
        // await todo.findOneAndDelete(id);
        await res.json(responseUtil.success({data: await todo.findOneAndDelete(id)}));
    } catch (err) {
        await res.json(responseUtil.fail({reason: err.message}));
    }
}

module.exports = {
    createTodo,
    getTodo,
    getTodoList,
    updateTodo,
    deleteTodo
};
