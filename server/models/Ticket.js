import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  attachment: [String],
});

const TicketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["Active", "Pending", "Closed"],
    default: "Active",
  },
  customerName: { type: String, required: true },
  notes: [NoteSchema],
  lastUpdated: { type: Date, default: Date.now },
});

export default mongoose.model("Ticket", TicketSchema);
