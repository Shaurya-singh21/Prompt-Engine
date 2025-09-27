import mongoose from "mongoose";

const user_S = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Username required"],
  },
  email: {
    type: String,
    required: [true, "Email required"],
    trim: true,
    unique: true,
    match: [/.+\@.+\..+/, "Use a valid email"],
  },
  image: String,
  prompts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "messages",
    }
  ],
  
  memberSince: {
    type: String,
    default: new Date().toLocaleDateString(),
    immutable: true,
  },
  totalPrompts: {
    type: Number,
    default: 0,
  }
});

const userM = (mongoose.models.User) || (mongoose.model("User", user_S))

export default userM;
