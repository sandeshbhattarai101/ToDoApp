import mongoose from "mongoose"
import { Schema } from "mongoose"

const TaskSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required:true,
    },
    description: {
        type: String,
        required:true,
    },
    status:{
        type: String,
        enum: ["remaining", "completed"],
        default: "remaining"
    }
},{
    timestamps:true,
}
)


export default mongoose.model("Task", TaskSchema) 