import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    from_user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Users",
    },
    to_user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    from_msg: {
      type: String,
    },
    to_msg: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const chatModel = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default chatModel;
