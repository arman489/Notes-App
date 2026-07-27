import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userAuth",
            required: true
        }
    },
    { timestamps: true }
)

const NoteSchema = mongoose.model('Note', noteSchema)

export default NoteSchema