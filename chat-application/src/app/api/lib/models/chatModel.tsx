import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    from_user: {
      type: String,
      required: true,
    },
    to_user: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    from_msg: {
      type: String,
      required: true,
    },
    to_msg: {
      type: String,
      required: true,
    },
    msgRead: {
      enum: ["yes", "no"],
    },
  },
  { timestamps: true }
);

const chatModel = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default chatModel;
