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
    default: "Online",
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
  friend: [
    {
      inviter_user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      status: {
        type: Number,
        enum: [0, 1, 2], // 0: noInvite, 1: pending, 2: accept
        default: 0,
      },
    },
  ],
});

const userModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default userModel;
