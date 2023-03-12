import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        maxlength: 255
    },
    desc: {
        type: String,
        required: true,
        maxlength: 2000
    },
    author: {
        type: String,
        required: true,
        maxlength: 255
    },
    year: {
        type: Number,
        required: true,
        min: 0,
        max: new Date().getFullYear()
    },
    cover: {
        type: String,
        maxlength: 1000
    }
},
    { timestamps: true });

export default mongoose.model("Book", BookSchema);