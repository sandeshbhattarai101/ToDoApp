
import Task from "../Model/taskModel.js"


export const addTask = async (req, res) => {
    try {
        const newTask = new Task({...req.body, userId: req.user.id,});
        await newTask.save();
        res.status(200).json({
            message: "Task added successfully",
            task: newTask // Return the newly created task in the response
        });
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle potential error during task creation
    }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        if (tasks.length === 0) {
            return res.status(299).json({
                message: "No tasks found",
                tasks : []
            });
        }
        return res.status(200).json({
            message: "Tasks found",
            tasks: tasks
        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: error.message });
    }
};
export const getTask = async (req, res) => {
    try {
        const tasks = await Task.findOne(req.params.id );
        if (tasks.length === 0) {
            return res.status(400).json({
                message: "No tasks found"
            });
        }
        return res.status(200).json({
            message: "Tasks found",
            tasks: tasks
        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: error.message });
    }
};

export const updateTask = async(req, res)=>{
    const task = await Task.findById(req.params.id)

    if(!task){
        res.status(400).json({
            message:"Task not found"
        })
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id,{
        $set: req.body,
    },{
        new: true,
    })

    res.status(200).json({
        message : "Task Updated successfully",
        updatedTask
    })
}
export const editStatus = async(req, res)=>{
    const { id } = req.params;
    const { status } = req.body;

    try {
        // Check if the task exists
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Update the status of the task
        task.status = status;
        await task.save();

        return res.status(200).json({ message: "Task status updated successfully", task });
    } catch (error) {
        console.error("Error updating task status:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteTask = async(req, res)=>{
    const {id} = req.params
    const task = await Task.findById(req.params.id)

    
    if(!task){
        res.status(400).json({
            message:"Task not found"
        })
    }

  await Task.findByIdAndDelete(req.params.id)

    res.status(200).json({
        message: "Task deleted successfully"
    })
}