import mongoose from "mongoose";

const conservationSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Users",
    },
    recieverID: {
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

const ConservationModal =
  mongoose.models.Conservation ||
  mongoose.model("Conservation", conservationSchema);

export default ConservationModal;
