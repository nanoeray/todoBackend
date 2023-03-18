import {RequestHandler} from "express";
import Helper from "../utils/helpers";
import Todo from "../models/todo";

export const createTodo: RequestHandler = async (req, res, next) => {
    try {
        const {title} = req.body;
        if (title.length < 2) {
            throw "Please fill all fields.";
        }
        const userId = req.body.loggedUser.id;
        const todo = await Todo.create({title, userId, status: 0});
        return Helper.response(res, 200, "success", "ToDo successfully!", todo);

    } catch (e: any) {
        return Helper.response(res, 200, "error", "An error occured!", e);
    }
};

export const listTodos: RequestHandler = async (req, res, next) => {

    const user = req.body.loggedUser;
    const todos = await Todo.findAll({where: {userId: user.id}});
    return Helper.response(res, 200, "success", "ToDo list fetched successfully.", todos);
};

export const deleteTodo: RequestHandler = async (req, res, next) => {

    const user = req.body.loggedUser;
    const {id} = req.body
    const deleteTodo = await Todo.destroy({where: {id: id, userId: user.id}});
    return Helper.response(res, 200, "success", "ToDo deleted successfully.");
};
export const markTodoCompleted: RequestHandler = async (req, res, next) => {

    const user = req.body.loggedUser;
    const {id} = req.body
    const todo = await Todo.findOne({where: {id: id, userId: user.id}});
    await (todo as Todo).update({status: 1});
    return Helper.response(res, 200, "success", "ToDo completed successfully.");

};

export const markTodoUncompleted: RequestHandler = async (req, res, next) => {

    const user = req.body.loggedUser;
    const {id} = req.body
    const todo = await Todo.findOne({where: {id: id, userId: user.id}});
    await (todo as Todo).update({status: 0});
    return Helper.response(res, 200, "success", "ToDo status changed to uncompleted successfully.");
};
