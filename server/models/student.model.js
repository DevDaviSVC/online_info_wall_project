import mongoose from "mongoose";

const StudentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rm: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Student = mongoose.model("Student", StudentSchema);

export default Student;