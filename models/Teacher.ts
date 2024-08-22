const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Please add a name & surname"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: [true, "E-mail must be unique"],
  },
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
});

const Teacher =
  mongoose.models.Teacher || mongoose.model("Teacher", TeacherSchema);

export default Teacher;
