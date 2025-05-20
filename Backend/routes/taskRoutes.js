const router = require("express").Router();
const Task = require("../models/task");
const User = require("../models/user");
const { authenticateToken } = require("../middleware/auth");

// Create Task
router.post("/createtask", authenticateToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    // Get user id from authentication middleware; fallback to headers if needed
    const userId = req.user?.id || req.headers.id;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required." });
    }
    // Optionally, prevent duplicate tasks for the same user
    const existingTask = await Task.findOne({ title, owner: userId });
    if (existingTask) {
      return res.status(400).json({ message: "Task with this title already exists." });
    }
    // Create a new task; include the owner if your schema supports it
    const newTask = new Task({ title, description, owner: userId });
    const savedTask = await newTask.save();

    // Add the task reference to the user's tasks array
    await User.findByIdAndUpdate(userId, { $push: { tasks: savedTask._id } });

    res.status(200).json({ message: "Task created successfully", task: savedTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
// Get All Tasks
router.get("/getalltasks", authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.id || req.headers.id;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const tasks = await Task.find({ owner: userId }).sort({ createdAt: -1 });

    res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Update Task (title and description)
router.put("/updatetask/:id", authenticateToken, async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required." });
    }
    // Update the task in the Task collection
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found." });
    }
    res.status(200).json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Delete Task
router.delete("/deletetask/:id", authenticateToken, async (req, res) => {
  try {
    const taskId = req.params.id;
    // Get user id from authentication middleware; fallback to headers if needed
    const userId = req.user?.id || req.headers.id;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }
    // Delete the task from the Task collection
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found." });
    }
    // Remove the task reference from the user's tasks array
    await User.findByIdAndUpdate(userId, { $pull: { tasks: taskId } });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Toggle Important Status for a Task
router.put("/updateimptask/:id", authenticateToken, async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskData = await Task.findById(taskId);
    if (!taskData) {
      return res.status(404).json({ message: "Task not found." });
    }
    const newImportant = !taskData.important;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { important: newImportant },
      { new: true }
    );
    res.status(200).json({
      message: "Task important status updated",
      task: updatedTask,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Toggle Complete Status for a Task
router.put("/updatecompletetask/:id", authenticateToken, async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskData = await Task.findById(taskId);
    if (!taskData) {
      return res.status(404).json({ message: "Task not found." });
    }
    const newComplete = !taskData.complete;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { complete: newComplete },
      { new: true }
    );
    res.status(200).json({
      message: "Task complete status updated",
      task: updatedTask,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
