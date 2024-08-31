const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please add a title"],
    unique: [true, "E-mail must be unique"],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  },
  role: {
    type: String,
    required: [true, "Please add a role"],
  },
  isVerified: {
    type: Boolean,
    required: [true, "Please add a role"],
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
