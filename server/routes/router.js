import { Router } from "express";
import { login, signup } from "../controllers/auth.js";
import { getTodoData, addTodo ,deleteTodo,updateTodo} from "../controllers/todos.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/gettododata", auth, getTodoData);
router.post("/addtodo", auth, addTodo);
router.delete("/deletetodo", auth, deleteTodo);
router.put('/updatetodo',auth,updateTodo)

export default router;
