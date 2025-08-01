import mongoose from "mongoose";

const AssignmentSchema = mongoose.Schema({
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true
    },
    group: {
        type: String,
        enum: ["a", "b"],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        default: () => {
            const now = new Date();
            now.setDate(now.getDate() + 10);
            return now;
        }
    }
}, {
    timestamps: true
});

const Assignment = mongoose.model("Assignment", AssignmentSchema);

export default Assignment;