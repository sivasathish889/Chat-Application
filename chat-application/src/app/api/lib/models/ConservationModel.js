import mongoose from "mongoose";

const conservationSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Users",
    },
    receiverId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    message: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ConservationModel =
  mongoose.models.Conversation ||
  mongoose.model("Conversation", conservationSchema);
export default ConservationModel;
