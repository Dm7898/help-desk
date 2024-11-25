import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    set: (value) => value.toLowerCase(),
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["Customer", "Agent", "Admin"],
    default: "Customer",
  },
});

export default mongoose.model("User", UserSchema);
