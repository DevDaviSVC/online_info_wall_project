import mongoose from "mongoose";

const ClassroomSchema = mongoose.Schema({
    students: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Student",
        default: []
    },
    serie: {
        type: String,
        required: true,
    },
    assignments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Assignment",
        default: []
    },
    representative: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Student",
        default: []
    }
}, {
    timestamps: true,
});

const Classroom = mongoose.model("Classroom", ClassroomSchema);

export default Classroom;