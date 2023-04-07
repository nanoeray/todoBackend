import {Router} from "express";
import auth from "../middlewares/auth";

import {
    listTodos,
    createTodo,
    deleteTodo,
    markTodoCompleted,
    markTodoUncompleted
} from "../controllers/todoController";

const router = Router();

router.route('/listTodos').get(auth, listTodos);
router.route('/createTodo').post(auth, createTodo);
router.route('/deleteTodo').delete(auth, deleteTodo);
router.route('/markTodoCompleted').put(auth, markTodoCompleted);
router.route('/markTodoUncompleted').put(auth, markTodoUncompleted);
export default router;