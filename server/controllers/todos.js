import Todo from "../models/Todo.js";
import User from "../models/User.js";

async function getTodoData(req, res) {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "No userId present",
      });
    }
    const user = await User.findById(userId).populate("todos");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No user present with such id",
      });
    }
    const todos = user.todos;
    return res.status(200).json({
      success: true,
      message: "Todos fetched successfully",
      data: todos,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while getting todos",
    });
  }
}

async function addTodo(req, res) {
  try {
    const userId = req.user.id;
    const { data } = req.body;
    console.log(data, userId);
    const newTodo = await Todo.create({
      name: data.name,
      description: data.description,
      progress: data.progress > 10 ? 10 : data.progress,
      category: data.category,
    });
    console.log("newTodo is ", newTodo);
    const updatedUser = await User.findByIdAndUpdate(userId, {
      $push: { todos: newTodo._id },
    }).populate("todos");
    console.log("newUser is ", updatedUser);
    return res.status(200).json({
      success: true,
      message: "Todo Added Successfuly",
      data: {
        user: updatedUser,
        newTodo,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some backend error in adding todo",
    });
  }
}

async function deleteTodo(req, res) {
  try {
    const userId = req.user.id;
    const todoId = req.query.id;
    console.log(userId, todoId);

    if (!todoId) {
      return res.status(400).json({
        success: false,
        message: "Todo ID is required",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { todos: todoId },
      },
      { new: true }
    );
    await Todo.findByIdAndDelete(todoId);

    return res.status(200).json({
      success: true,
      message: "Todo deleted Successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Some backend error in deleting todo",
    });
  }
}
async function updateTodo(req, res) {
  try {
    const todoId = req.body.id;
    const userId = req.user.id;
    const data = req.body.data;
    // console.log(todoId, userId, data);
    const updatedTodo = await Todo.findByIdAndUpdate(todoId, data, {
      new: true,
    }).populate("comments");
    return res.status(200).json({
      success: true,
      message: "Updated Successfully",
      data: updatedTodo,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Some backend error in updating todo",
    });
  }
}
export { getTodoData, addTodo, deleteTodo, updateTodo };
