import Task from "../models/task.model.js";


export const getTask = async (req, res) => {

    const userID = req.user._id;

    try {
        if (!userID) {
            return res.status(400).json({ message: "Agent not found" });
        }

        const task = await Task.find({ assignedTo: userID })

        if (!task) {
            return res.status(400).json({ message: "task not found" });
        }

        res.status(200).json(task);
    }catch(error){
        console.log("Error in getTasks controller : ", error.message);
        res.status(500).json({ error: "internal server error" });
    }
}