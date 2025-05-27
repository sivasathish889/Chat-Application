import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Online", "Offline"],
    default : "Online"
  },
  friends: {
    type: mongoose.Types.ObjectId,
  },
  about: {
    type: String,
  },
  socketId: {
    type: String,
  },
  password: {
    type: String,
    requied: true,
  },
  phone: {
    type: Number,
    required: true,
  },
});

const userModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default userModel;
