import mongoose from "mongoose";

const conservationSchema = new mongoose.Schema(
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

const ConservationModal = mongoose.models.Conservation || mongoose.model("Conservation", conservationSchema);

export default ConservationModal;
