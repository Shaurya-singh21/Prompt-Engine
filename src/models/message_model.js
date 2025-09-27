import mongoose from "mongoose";
import Email from "next-auth/providers/email";

const message_S = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Cemail: {
        type: String,
    },
    message: {
        type: String,
        required: [true, 'This field is required']
    },
    tag: {
        type: [String],
        required: [true, 'This field is required'],
        min:1,
        max:12
    },
    title: {
        type: String,
        min: 1,
        max: 35,
        required: [true, 'This field is required']
    }
})


// const message_model = (mongoose.model("messages", message_S)) || (mongoose.models.messages);
const message_model = mongoose.models.messages || mongoose.model("messages", message_S);
export default message_model;